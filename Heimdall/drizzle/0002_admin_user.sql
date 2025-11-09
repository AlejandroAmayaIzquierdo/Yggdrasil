-- Create admin user
INSERT INTO user (id, username, password_hash, age) 
VALUES ('zzibrdlqzezvzlvi', 'admin', '$argon2id$v=19$m=19456,t=2,p=1$Ghdh2ZUSIV1DlEEKReD7tA$1qMMddtk8FvTu2rCyXfFblyhzh3YfqJBc8qKZdAczYE', NULL)
ON CONFLICT(username) DO NOTHING;
