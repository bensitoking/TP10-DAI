import * as service from '../services/alumnoService.js';

export const getAll = async (req, res) => {
  try {
    const alumnos = await service.getAll();
    res.json(alumnos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const alumno = await service.getById(parseInt(req.params.id));
    if (!alumno) return res.status(404).send('Alumno no encontrado');
    res.json(alumno);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    await service.create(req.body);
    res.status(201).send('Alumno creado');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    await service.update(req.body);
    res.status(200).send('Alumno actualizado');
  } catch (err) {
    const status = err.message === 'Alumno no encontrado' ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await service.remove(parseInt(req.params.id));
    res.status(200).send('Alumno eliminado');
  } catch (err) {
    const status = err.message === 'Alumno no encontrado' ? 404 : 400;
    res.status(status).json({ error: err.message });
  }
};
