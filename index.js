import express from 'express';
import { PORT } from './var.js';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/img', express.static('DB/img'));

const loadData = async () => {
  const data = await readFile(path.join(__dirname, 'DB/goodsDB.json'), 'utf-8');
  return JSON.parse(data);
};

const sendData = async () => {
  const data = await loadData();
  return data;
};

app.get('/goods', async (req, res) => {
  try {
    const updatedGoods = await sendData();
    res.header('Access-Control-Allow-Origin', '*');
    res.json(updatedGoods);
  } catch {
    res.send('Error');
  }
});

app.listen(PORT, () => {
  console.log('Server start om 3000 port');
});
