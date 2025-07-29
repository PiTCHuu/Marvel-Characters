import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

const dataPath = path.resolve('./user.json');
let characters = JSON.parse(fs.readFileSync(dataPath, 'utf8')).characters;

app.get('/characters', (req, res) => {
  res.json(characters);
});

app.post('/characters', (req, res) => {
  const newChar = { id: Date.now(), ...req.body };
  characters.push(newChar);
  fs.writeFileSync(dataPath, JSON.stringify({ characters }, null, 2));
  res.status(201).json(newChar);
});

app.get('/characters/:id', (req, res) => {
  const found = characters.find(c => c.id == req.params.id);
  found ? res.json(found) : res.status(404).send('Not found');
});

app.put('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    characters[index] = { ...characters[index], ...req.body };
    fs.writeFileSync(dataPath, JSON.stringify({ characters }, null, 2));
    res.json(characters[index]);
  } else {
    res.status(404).send('Not found');
  }
});

app.delete('/characters/:id', (req, res) => {
  const index = characters.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    const deleted = characters.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify({ characters }, null, 2));
    res.json(deleted[0]);
  } else {
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
