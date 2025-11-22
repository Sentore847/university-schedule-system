import { Lesson } from '../types/entities.types';
import { storage } from '../data/storage';
import { validateLesson } from '../validators/schedule.validator';


export function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson);
  
  if (conflict !== null) {
    console.error(`Конфлікт: ${conflict.type}`);
    return false;
  }
  
  storage.addLesson(lesson);
  return true;
}

export function reassignClassroom(lessonIndex: number, newClassroomNumber: string): boolean {
  const schedule = storage.getSchedule();
  
  if (lessonIndex < 0 || lessonIndex >= schedule.length) {
    console.error("Заняття не знайдено");
    return false;
  }
  
  const lesson = schedule[lessonIndex];
  const testLesson: Lesson = {
    ...lesson,
    classroomNumber: newClassroomNumber
  };
  
  storage.removeLesson(lessonIndex);
  const conflict = validateLesson(testLesson);
  
  if (conflict !== null) {
    storage.addLesson(lesson);
    console.error("Неможливо змінити аудиторію: конфлікт");
    return false;
  }
  
  storage.addLesson(testLesson);
  return true;
}

export function cancelLesson(lessonIndex: number): void {
  const schedule = storage.getSchedule();
  
  if (lessonIndex >= 0 && lessonIndex < schedule.length) {
    storage.removeLesson(lessonIndex);
    console.log(`Заняття ${lessonIndex} скасовано`);
  } else {
    console.error("Заняття не знайдено");
  }
}