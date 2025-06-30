import * as repo from '../repositories/alumnoRepository.js';

export const getAll = () => repo.getAll();

export const getById = (id) => repo.getById(id);

export const create = (data) => {
  if (!data.nombre || data.nombre.length < 3)
    throw new Error('Nombre inválido');
  if (!data.apellido || data.apellido.length < 3)
    throw new Error('Apellido inválido');
  return repo.create(data);
};

export const update = async (data) => {
  if (!data.id || isNaN(data.id))
    throw new Error('ID inválido');
  if (!(await repo.exists(data.id)))
    throw new Error('Alumno no encontrado');
  return repo.update(data);
};

export const remove = async (id) => {
  if (!(await repo.exists(id)))
    throw new Error('Alumno no encontrado');
  return repo.remove(id);
};
