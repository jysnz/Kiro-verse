/**
 * Static reference copy for each class the KIROVERSE model can predict.
 * Keyed by the exact label strings returned by the /predict-skin-disease
 * endpoint (see lib/kiroverse.ts).
 *
 * `remedies` are intentionally non-medical (no prescriptions, no "see a
 * doctor" directives) — general self-care/home-remedy suggestions only.
 * Medical guidance is left to the page-level disclaimer.
 */
export interface SkinDiseaseInfo {
  description: string;
  symptoms: string[];
  remedies: string[];
}

export const SKIN_DISEASE_INFO: Record<string, SkinDiseaseInfo> = {
  Acne: {
    description:
      'A common condition where hair follicles become clogged with oil and dead skin cells, producing whiteheads, blackheads, and pimples.',
    symptoms: ['Whiteheads / Blackheads', 'Papules or Pustules', 'Oily Skin', 'Occasional Scarring'],
    remedies: [
      'Wash the area twice daily with a gentle cleanser',
      'Apply a diluted tea tree oil spot treatment',
      'Try a honey or oatmeal mask to soothe skin',
      'Avoid touching or picking at breakouts',
      'Change pillowcases and towels frequently',
    ],
  },
  "Athlete's Foot": {
    description:
      'A fungal infection (tinea pedis) that usually begins between the toes, thriving in warm, moist environments like shoes and locker rooms.',
    symptoms: ['Itching Between Toes', 'Cracked/Peeling Skin', 'Redness', 'Burning Sensation'],
    remedies: [
      'Soak feet in a diluted vinegar solution',
      'Dry thoroughly between toes after washing',
      'Apply tea tree oil to the affected area',
      'Wear breathable cotton socks',
      'Sprinkle baking soda in shoes to reduce moisture',
    ],
  },
  Cellulitis: {
    description:
      'A bacterial skin infection affecting deeper layers of skin, causing spreading redness and swelling. Can become serious if untreated.',
    symptoms: ['Spreading Redness', 'Warmth and Swelling', 'Tenderness', 'Possible Fever'],
    remedies: [
      'Keep the area clean and gently covered',
      'Apply a cool, damp compress to ease swelling',
      'Elevate the affected limb while resting',
      'Avoid tight clothing over the area',
      'Monitor closely and note any spreading or worsening',
    ],
  },
  Chickenpox: {
    description:
      'A highly contagious viral infection causing an itchy, blister-like rash that spreads across the body.',
    symptoms: ['Itchy Fluid-Filled Blisters', 'Fever', 'Fatigue', 'Rash in Crops'],
    remedies: [
      'Take a lukewarm oatmeal bath to ease itching',
      'Apply calamine lotion to blisters',
      'Keep fingernails trimmed to avoid scratching',
      'Wear loose, breathable cotton clothing',
      'Stay hydrated and rest',
    ],
  },
  'Cutaneous Larva Migrans': {
    description:
      'A skin infection caused by hookworm larvae penetrating the skin, producing a characteristic winding, itchy track.',
    symptoms: ['Winding Red Track', 'Intense Itching', 'Raised Serpiginous Lesion', 'Local Swelling'],
    remedies: [
      'Keep the area clean and dry',
      'Apply a cool compress to reduce itching',
      'Avoid scratching to prevent skin breaks',
      'Avoid walking barefoot on soil or sand going forward',
      'Wear protective footwear outdoors',
    ],
  },
  Impetigo: {
    description:
      'A highly contagious bacterial skin infection common in children, producing honey-colored crusted sores, usually around the nose and mouth.',
    symptoms: ['Honey-Colored Crusts', 'Red Sores', 'Itching', 'Rapid Spread by Contact'],
    remedies: [
      'Gently wash the area with mild soap and water',
      'Keep sores loosely covered with a clean bandage',
      'Avoid sharing towels, razors, or bedding',
      'Wash hands frequently to limit spread',
      'Keep fingernails short and clean',
    ],
  },
  'Nail-Fungus': {
    description:
      'A fungal infection (onychomycosis) affecting the nail bed, causing discoloration, thickening, and brittleness.',
    symptoms: ['Yellow/White Discoloration', 'Thickened Nail', 'Brittle or Crumbly Edges', 'Distorted Shape'],
    remedies: [
      'Keep nails trimmed short and dry',
      'Soak nails in a diluted vinegar solution',
      'Apply tea tree oil to the nail bed',
      'Wear moisture-wicking socks and rotate footwear',
      'Disinfect nail clippers and files after use',
    ],
  },
  Normal: {
    description: 'No signs of the skin conditions this model screens for were detected in the photo.',
    symptoms: ['No Visible Lesions', 'Even Skin Tone', 'No Abnormal Texture'],
    remedies: [
      'Maintain a gentle daily skincare routine',
      'Moisturize regularly to support the skin barrier',
      'Use sunscreen when outdoors',
      'Stay hydrated',
      'Re-scan periodically to track any changes',
    ],
  },
  Ringworm: {
    description:
      'A fungal infection (tinea corporis) named for its ring-shaped, itchy, scaly rash rather than an actual worm.',
    symptoms: ['Ring-Shaped Rash', 'Scaly, Raised Border', 'Itching', 'Clearer Center'],
    remedies: [
      'Keep the area clean and dry',
      'Apply diluted tea tree oil or coconut oil',
      'Avoid sharing clothing, towels, or bedding',
      'Wash bedding and clothing in hot water',
      'Wear loose, breathable fabrics',
    ],
  },
  Shingles: {
    description:
      'A painful rash caused by reactivation of the varicella-zoster virus, typically appearing as a band of blisters on one side of the body.',
    symptoms: ['Painful Blistering Rash', 'Burning/Tingling', 'One-Sided Band Pattern', 'Sensitivity to Touch'],
    remedies: [
      'Apply a cool, damp compress to soothe pain',
      'Take a lukewarm oatmeal bath',
      'Wear loose, soft clothing over the rash',
      'Avoid stress and prioritize rest',
      'Avoid contact with others until blisters crust over',
    ],
  },
  Unknown: {
    description:
      'The model could not confidently match this photo to a known class. Consider retaking the photo or consulting a professional.',
    symptoms: ['Unclear from Image'],
    remedies: [
      'Keep the area clean and dry',
      'Avoid scratching or irritating the skin',
      'Retake the photo in good lighting for a clearer scan',
      'Monitor for any changes over the next few days',
    ],
  },
};

export function getSkinDiseaseInfo(label: string): SkinDiseaseInfo {
  return (
    SKIN_DISEASE_INFO[label] ?? {
      description: 'No additional reference information is available for this result.',
      symptoms: [],
      remedies: [],
    }
  );
}
