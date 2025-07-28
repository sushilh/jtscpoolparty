const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { Parser } = require('json2csv');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get('/attendees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendees ORDER BY swimmer_name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/checkin/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('UPDATE attendees SET checked_in = true WHERE id = $1', [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/export', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attendees');
    const csv = new Parser().parse(result.rows);
    fs.writeFileSync('attendees_export.csv', csv);
    res.download('attendees_export.csv');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
