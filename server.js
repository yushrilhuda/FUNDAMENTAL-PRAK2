const express = require('express');
const app = express();
const PORT = 3100;

app.use(express.json());

let filmDirectors = [
  { id: 1, name: 'Yushril huda ramadhany s.', birthYear: 2005 },
  { id: 2, name: 'Zidni ilmi kafa bih', birthYear: 2004 },
  { id: 3, name: 'Faik waladi', birthYear: 2006 },
  { id: 4, name: 'Faiz mahbub', birthYear: 2005 }
];

// Ambil semua data
app.get('/directors', (req, res) => {
  res.status(200).json(filmDirectors);
});

// Ambil data berdasarkan ID
app.get('/directors/:id', (req, res) => {
  const targetId = parseInt(req.params.id);
  const result = filmDirectors.find(item => item.id === targetId);

  if (!result) {
    return res.status(404).json({ message: 'Data sutradara tidak ditemukan' });
  }

  res.json(result);
});

// Tambah data baru
app.post('/directors', (req, res) => {
  const { name, birthYear } = req.body;

  if (!name || !birthYear) {
    return res.status(400).json({ message: 'Field name dan birthYear wajib diisi' });
  }

  const newEntry = {
    id: filmDirectors.length ? filmDirectors[filmDirectors.length - 1].id + 1 : 1,
    name,
    birthYear
  };

  filmDirectors.push(newEntry);
  res.status(201).json(newEntry);
});

// Update data berdasarkan ID
app.put('/directors/:id', (req, res) => {
  const targetId = parseInt(req.params.id);
  const index = filmDirectors.findIndex(item => item.id === targetId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan untuk diupdate' });
  }

  const { name, birthYear } = req.body;

  if (!name || !birthYear) {
    return res.status(400).json({ message: 'Field name dan birthYear wajib diisi' });
  }

  filmDirectors[index] = { id: targetId, name, birthYear };
  res.json(filmDirectors[index]);
});

// Hapus data berdasarkan ID
app.delete('/directors/:id', (req, res) => {
  const targetId = parseInt(req.params.id);
  const index = filmDirectors.findIndex(item => item.id === targetId);

  if (index === -1) {
    return res.status(404).json({ message: 'Data tidak ditemukan untuk dihapus' });
  }

  filmDirectors.splice(index, 1);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server aktif di http://localhost:${PORT}`);
});