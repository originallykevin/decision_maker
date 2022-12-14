DROP TABLE IF EXISTS options CASCADE;

CREATE TABLE options (
  id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  name VARCHAR(255),
  points SMALLINT NOT NULL DEFAULT 0
);
