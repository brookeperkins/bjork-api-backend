const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Outfit = require('../lib/models/outfits');

describe('bjork-api-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new bjork outfit entry', async() => {
    return request(app)
      .post('/api/outfits')
      .send({
        img: 'bjork.jpg',
        year: 1995,
        quote: 'some delightfully weird bjork quote'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          img: 'bjork.jpg',
          year: 1995,
          quote: 'some delightfully weird bjork quote'
        });
      });
  });

  it ('gets all the bjork outfit entries', async() => {
    const outfits = await Promise.all([{
      img: 'bjork.jpg',
      year: 2000,
      quote: 'something something something -bjork'
    },
    {
      img: 'bjork1.jpg',
      year: 1994,
      quote: 'here is another quote by me, bjork!'
    },
    {
      img: 'swandress.jpg',
      year: 2012,
      quote: 'something in icelandic, perhaps?'
    }].map(outfit => Outfit.insert(outfit)));

    return request(app)
      .get('/api/outfits')
      .then(res => {
        outfits.forEach(outfit => {
          expect(res.body).toContainEqual(outfit);
        });
      });
  });
});
