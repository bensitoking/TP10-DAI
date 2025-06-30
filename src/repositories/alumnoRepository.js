import { Client } from 'pg';
import DBConfigBest from '../configs/db-config.js';

const queryDB = async (text, params) => {
  const client = new Client(DBConfigBest);
  await client.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    await client.end();
  }
};

export const getAll = () => queryDB('SELECT * FROM alumnos');

export const getById = (id) => queryDB('SELECT * FROM alumnos WHERE id = $1', [id]);

export const create = ({ nombre, apellido, id_curso, fecha_nacimiento, hace_deportes }) =>
  queryDB(
    'INSERT INTO alumnos (nombre, apellido, id_curso, fecha_nacimiento, hace_deportes) VALUES ($1, $2, $3, $4, $5)',
    [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes]
  );

export const update = ({ id, nombre, apellido, id_curso, fecha_nacimiento, hace_deportes }) =>
  queryDB(
    'UPDATE alumnos SET nombre = $1, apellido = $2, id_curso = $3, fecha_nacimiento = $4, hace_deportes = $5 WHERE id = $6',
    [nombre, apellido, id_curso, fecha_nacimiento, hace_deportes, id]
  );

export const remove = (id) =>
  queryDB('DELETE FROM alumnos WHERE id = $1 RETURNING *', [id]);

export const exists = async (id) => {
  const result = await queryDB('SELECT 1 FROM alumnos WHERE id = $1', [id]);
  return result.length > 0;
};
