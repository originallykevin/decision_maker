DROP TABLE IF EXISTS polls CASCADE;

CREATE TABLE polls (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES poll_owners(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  url_admin VARCHAR(255),
  url_voter VARCHAR(255)
);

