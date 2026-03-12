const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { init: initDb, save: saveDb, get: getDb } = require('./db');

const app = express();
const JWT_SECRET = 'treasure-game-secret-key';
const BCRYPT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid token' });
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function queryOne(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const row = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return row;
}

function queryAll(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function run(sql, params = []) {
  const db = getDb();
  db.run(sql, params);
  const results = db.exec('SELECT last_insert_rowid()');
  saveDb();
  const id = results.length > 0 ? Number(results[0].values[0][0]) : null;
  return { lastInsertRowid: id };
}

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  try {
    const existing = queryOne('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const { lastInsertRowid } = run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashed]);
    const token = jwt.sign({ id: lastInsertRowid, email }, JWT_SECRET);
    res.json({ token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = queryOne('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
  res.json({ token, email: user.email });
});

app.post('/api/scores', authMiddleware, (req, res) => {
  const { score, result } = req.body;
  if (score === undefined || !result) {
    return res.status(400).json({ error: 'Score and result are required' });
  }
  run('INSERT INTO scores (user_id, score, result) VALUES (?, ?, ?)', [req.user.id, score, result]);
  res.json({ ok: true });
});

app.get('/api/scores', authMiddleware, (req, res) => {
  const scores = queryAll(
    'SELECT score, result, played_at FROM scores WHERE user_id = ? ORDER BY played_at DESC',
    [req.user.id]
  );
  res.json(scores);
});

const PORT = 3001;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
