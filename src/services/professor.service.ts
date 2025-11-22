import { Professor, Lesson } from '../types/entities.types';
import { storage } from '../data/storage';

export function addProfessor(professor: Professor): void {
  storage.addProfessor(professor);
}

export function getProfessorSchedule(professorId: number): Lesson[] {
  return storage.getSchedule().filter(lesson => lesson.professorId === professorId);
}