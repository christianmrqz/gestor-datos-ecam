const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let data = require('./public/assets/jsonEjemplo.json').json;

// Ruta para obtener todos los datos
app.get('/api/data', (req, res) => {
  res.json(data);
});

// Ruta para crear nuevo contenido
app.post('/api/data', (req, res) => {
  try {
    const newContent = req.body;
    if (!newContent.title || !newContent.desc || !newContent.url || !newContent.type) {
      throw new Error('Invalid data format');
    }

    newContent.info = { id: data.length };  // Asignar un ID simple
    res.status(201).json(newContent);
  } catch (error) {
    console.error('Error in POST /api/data:', error.message);
    res.status(500).json({ message: 'Failed to save content', error: error.message });
  }
});

// Ruta para eliminar contenido
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  data = data.filter(item => item.info.id !== id);
  res.json({ message: 'Content deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
