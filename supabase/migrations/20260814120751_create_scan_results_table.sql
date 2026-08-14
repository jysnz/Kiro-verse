CREATE TABLE scan_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  diagnosis TEXT NOT NULL,
  confidence NUMERIC(5,2) NOT NULL,
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE scan_results ENABLE ROW LEVEL SECURITY;

-- Users can only see their own results
CREATE POLICY "Users can view own scan results"
  ON scan_results FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert own scan results"
  ON scan_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);;
