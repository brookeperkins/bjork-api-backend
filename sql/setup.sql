DROP TABLE IF EXISTS outfits;

CREATE TABLE outfits (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  outfit_img TEXT NOT NULL,
  outfit_year INT CHECK (outfit_year > 1965),
  bjork_quote TEXT
);
