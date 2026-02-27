-- Example seed (password hashes are placeholders)
-- In this project, real creation is via /api/auth/register which hashes passwords with bcrypt.

-- Example admin/user (adjust ids if needed)
INSERT INTO users (id, name, email, password, role, "createdAt", "updatedAt")
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Admin', 'admin@test.com', 'bcrypt_hash_here', 'admin', NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'User', 'user@test.com', 'bcrypt_hash_here', 'user', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;