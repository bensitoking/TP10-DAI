import express from "express";
import cors from "cors";
import config from './configs/db-config.js';
import pkg from 'pg';

const { Client } = pkg;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/alumnos/', async (req, res) => {
    const client = new Client(config);
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM alumnos');
        await client.end();
        res.status(200).json(result.rows);
    } catch (error) {
        await client.end();
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/alumnos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send('ID inválido');

    const client = new Client(config);
    try {
        await client.connect();
        const result = await client.query('SELECT * FROM alumnos WHERE id = $1', [id]);
        await client.end();

        if (result.rows.length === 0) return res.status(404).send('Alumno no encontrado');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        await client.end();
        res.status(500).json({ error: error.message });
    }
});


app.post('/api/alumnos/', async (req, res) => {
    const { nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = req.body;

    if (!nombre || nombre.length < 3) return res.status(400).send('Nombre inválido');
    if (!apellido || apellido.length < 3) return res.status(400).send('Apellido inválido');

    const client = new Client(config);
    try {
        await client.connect();
        await client.query(
            'INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes) VALUES ($1, $2, $3, $4, $5)',
            [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
        );
        await client.end();
        res.status(201).send('Alumno creado');
    } catch (error) {
        await client.end();
        res.status(500).json({ error: error.message });
    }
});


app.put('/api/alumnos/', async (req, res) => {
    const { id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes } = req.body;

    if (!id || isNaN(id)) return res.status(400).send('ID inválido');
    if (!nombre || nombre.length < 3) return res.status(400).send('Nombre inválido');
    if (!apellido || apellido.length < 3) return res.status(400).send('Apellido inválido');

    const client = new Client(config);
    try {
        await client.connect();
        const check = await client.query('SELECT * FROM alumnos WHERE id = $1', [id]);
        if (check.rows.length === 0) {
            await client.end();
            return res.status(404).send('Alumno no encontrado');
        }

        await client.query(
            'UPDATE alumnos SET nombre = $1, apellido = $2, id_curso = $3, fecha_nacimiento = $4, hace_deportes = $5 WHERE id = $6',
            [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes, id]
        );
        await client.end();
        res.status(201).send('Alumno actualizado');
    } catch (error) {
        await client.end();
        res.status(500).json({ error: error.message });
    }
});


app.delete('/api/alumnos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send('ID inválido');

    const client = new Client(config);
    try {
        await client.connect();
        const result = await client.query('DELETE FROM alumnos WHERE id = $1 RETURNING *', [id]);
        await client.end();

        if (result.rows.length === 0) return res.status(404).send('Alumno no encontrado');
        res.status(200).send('Alumno eliminado');
    } catch (error) {
        await client.end();
        res.status(500).json({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
