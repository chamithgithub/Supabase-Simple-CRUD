// CREATE SEQUENCE IF NOT EXISTS item_seq START 1;

// CREATE TABLE IF NOT EXISTS items (
//   id text PRIMARY KEY DEFAULT ('ITM-' || lpad(nextval('item_seq')::text, 4, '0')),
//   name text NOT NULL,
//   category text NOT NULL,
//   quantity integer NOT NULL CHECK (quantity >= 0),
//   location text NOT NULL,
//   image_url text,
//   created_at timestamptz DEFAULT now(),
//   updated_at timestamptz DEFAULT now()
// );

// ALTER SEQUENCE item_seq RESTART WITH 1;

