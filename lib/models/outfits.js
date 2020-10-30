const pool = require('../utils/pool');

module.exports = class Outfit {
  id;
  img;
  year;
  quote;

  constructor(row) {
    this.id = row.id;
    this.img = row.outfit_img;
    this.year = row.outfit_year;
    this.quote = row.bjork_quote;
  }

  static async insert(outfit) {
    const { rows } = await pool.query(
      `INSERT INTO outfits (outfit_img, outfit_year, bjork_quote) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [outfit.img, outfit.year, outfit.quote]
    );

    return new Outfit(rows[0]);
  }
};
