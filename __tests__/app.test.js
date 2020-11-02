const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Outfit = require('../lib/models/outfits');

describe('bjork-api-be routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('creates a new bjork outfit entry', () => {
    return request(app)
      .post('/outfits')
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
      .get('/outfits')
      .then(res => {
        outfits.forEach(outfit => {
          expect(res.body).toContainEqual(outfit);
        });
      });
  });

  it('gets an entry by id', async() => {
    const outfit = await Outfit.insert({
      img: 'Bjork1.jpg',
      year: 1994,
      quote: 'bjork quote',
    });

    return request(app)
      .get(`/outfits/${outfit.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          img: 'Bjork1.jpg',
          year: 1994,
          quote: 'bjork quote'
        });
      });
  });

  it('updates an entry by id', async() => {
    const outfit = await Outfit.insert({
      img: 'BjorkPic.jpg',
      year: '2016',
      quote: 'Quote quote quote.',
    });

    return request(app)
      .put(`/outfits/${outfit.id}`)
      .send({
        img: 'NewPic.jpg',
        year: 2011,
        quote: 'Here is a quote!',
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          img: 'NewPic.jpg',
          year: 2011,
          quote: 'Here is a quote!'
        });
      });
  });

  it('deletes an entry by id', async() => {
    const outfit = await Outfit.insert({
      img: 'Bjork.png',
      year: 1999,
      quote: 'Hi, my name is Bjork.'
    });

    return request(app)
      .delete(`/sailors/${outfit.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          img: 'Bjork.png',
          year: 1999,
          quote: 'Hi, my name is Bjork.'
        });
      }); 
  });
});
