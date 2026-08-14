/**
 * Client for the KIROVERSE Skin Disease Detection Server.
 * Deployed on Render: https://github.com/jysnz/Kiroverse_server
 *
 * Override the target with NEXT_PUBLIC_KIROVERSE_API_URL (e.g. for local
 * development against `uvicorn main:app --reload`).
 */
export const KIROVERSE_API_URL =
  process.env.NEXT_PUBLIC_KIROVERSE_API_URL ?? 'https://kiroverse-skin-disease-server.onrender.com';

/** One of the 11 classes the model was trained on. */
export type SkinDiseaseLabel =
  | 'Acne'
  | "Athlete's Foot"
  | 'Cellulitis'
  | 'Chickenpox'
  | 'Cutaneous Larva Migrans'
  | 'Impetigo'
  | 'Nail-Fungus'
  | 'Normal'
  | 'Ringworm'
  | 'Shingles'
  | 'Unknown';

export interface SkinDiseasePrediction {
  success: true;
  /** Predicted label. */
  disease: SkinDiseaseLabel | string;
  /** Confidence of the top prediction, 0-100. */
  confidence: number;
  /** Every label mapped to its softmax percentage, 0-100. */
  probabilities: Record<string, number>;
}

export class PredictionError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'PredictionError';
    this.status = status;
  }
}

/**
 * Uploads a photo to POST /predict-skin-disease and returns the classifier's
 * result. Mirrors the server's own validation: image files only, non-empty,
 * 10 MB max.
 */
export async function predictSkinDisease(image: File): Promise<SkinDiseasePrediction> {
  if (!image.type.startsWith('image/')) {
    throw new PredictionError('Please choose an image file (JPG, PNG, or WebP).');
  }
  if (image.size === 0) {
    throw new PredictionError('That file is empty. Please choose a valid photo.');
  }
  if (image.size > 10 * 1024 * 1024) {
    throw new PredictionError('That photo is larger than 10 MB. Please choose a smaller file.');
  }

  const formData = new FormData();
  formData.append('image', image);

  let response: Response;
  try {
    response = await fetch(`${KIROVERSE_API_URL}/predict-skin-disease`, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new PredictionError(
      'Could not reach the KIROVERSE server. It may be waking up from sleep (free tier) — please try again in a moment.'
    );
  }

  if (!response.ok) {
    let message = `Prediction request failed (${response.status}).`;
    try {
      const body = await response.json();
      if (body?.detail) message = body.detail;
    } catch {
      // Non-JSON error body — fall back to the generic message above.
    }
    throw new PredictionError(message, response.status);
  }

  return response.json();
}

/**
 * Fire-and-forget ping to GET /health. Render's free plan spins services
 * down after inactivity, so calling this when the scan page loads gives the
 * instance a head start waking up before the user hits "Analyze".
 */
export function warmUpKiroverseServer(): void {
  fetch(`${KIROVERSE_API_URL}/health`).catch(() => {
    // Best-effort only — the real request will surface any failure.
  });
}
