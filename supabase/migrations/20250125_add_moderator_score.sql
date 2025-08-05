-- Add moderator_score column to brands table
ALTER TABLE brands ADD COLUMN IF NOT EXISTS moderator_score INTEGER DEFAULT 5 CHECK (moderator_score >= 1 AND moderator_score <= 10);

-- Add comment to document the field
COMMENT ON COLUMN brands.moderator_score IS 'Manual moderator score from 1-10, where 10 is super cool and 1 is not cool at all'; 