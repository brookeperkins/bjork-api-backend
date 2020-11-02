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

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM outfits'
    );

    return rows.map(row => new Outfit(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM outfits WHERE id=$1',
      [id]
    );

    if(!rows[0]) return null;
    else return new Outfit(rows[0]);
  }

  static async update(id, outfit) {
    const { rows } = await pool.query(
      `UPDATE outfits
      SET img=$1,
          year=$2,
          quote=$3
      WHERE id=$4
      RETURNING *
       `,
      [outfit.img, outfit.year, outfit.quote, id]
    );

    return new Outfit(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM outfits WHERE id=$1 RETURNING *',
      [id]
    );

    return new Outfit(rows[0]);
  }
};
