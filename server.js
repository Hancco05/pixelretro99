const express = require('express');
const multer  = require('multer');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = 8000;

// Carpetas
const BIOS_DIR = path.join(__dirname, 'bios');
const ROMS_DIR = path.join(__dirname, 'roms');
const GAMES_DB = path.join(__dirname, 'games.json');

// Crear carpetas si no existen
[BIOS_DIR, ROMS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Inicializar games.json
if (!fs.existsSync(GAMES_DB)) fs.writeFileSync(GAMES_DB, '[]');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'bios') cb(null, BIOS_DIR);
    else if (file.fieldname === 'rom') cb(null, ROMS_DIR);
    else cb(new Error('Campo desconocido'), null);
  },
  filename: (req, file, cb) => {
    // Sanear nombre (sin espacios)
    const safe = file.originalname.replace(/\s+/g, '_');
    cb(null, safe);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 } // 1 GB
});

// Estáticos
app.use(express.static(__dirname));
app.use(express.json());

// Listar juegos
app.get('/api/games', (req, res) => {
  const games = JSON.parse(fs.readFileSync(GAMES_DB, 'utf8'));
  res.json(games);
});

// Listar BIOS disponibles
app.get('/api/bios', (req, res) => {
  const files = fs.readdirSync(BIOS_DIR);
  res.json(files);
});

// Subir BIOS
app.post('/api/upload/bios', upload.single('bios'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se recibió BIOS' });
  res.json({ ok: true, file: req.file.filename });
});

// Subir ROM + registrar juego
app.post('/api/upload/rom',
  upload.fields([{ name: 'rom', maxCount: 1 }]),
  (req, res) => {
    if (!req.files || !req.files.rom) {
      return res.status(400).json({ error: 'No se recibió ROM' });
    }
    const file = req.files.rom[0];
    const { name, desc } = req.body;

    const games = JSON.parse(fs.readFileSync(GAMES_DB, 'utf8'));
    const newGame = {
      name: name || file.originalname,
      file: 'roms/' + file.filename,
      desc: desc || '',
      added: new Date().toISOString()
    };
    games.push(newGame);
    fs.writeFileSync(GAMES_DB, JSON.stringify(games, null, 2));

    res.json({ ok: true, game: newGame });
  }
);

// Eliminar juego
app.delete('/api/games/:index', (req, res) => {
  const idx = parseInt(req.params.index, 10);
  const games = JSON.parse(fs.readFileSync(GAMES_DB, 'utf8'));
  if (isNaN(idx) || idx < 0 || idx >= games.length) {
    return res.status(400).json({ error: 'Índice inválido' });
  }
  const [removed] = games.splice(idx, 1);
  fs.writeFileSync(GAMES_DB, JSON.stringify(games, null, 2));
  res.json({ ok: true, removed });
});

// Arrancar
app.listen(PORT, () => {
  console.log(`\n  🎮 localhost 99 retro games`);
  console.log(`  ➜  http://localhost:${PORT}\n`);
});