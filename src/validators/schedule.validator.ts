import { Lesson } from '../types/entities.types';
import { ScheduleConflict } from '../types/conflict.types';
import { storage } from '../data/storage';

export function validateLesson(lesson: Lesson): ScheduleConflict | null {
  const schedule = storage.getSchedule();

  const professorConflict = schedule.find(
    existing => 
      existing.professorId === lesson.professorId &&
      existing.dayOfWeek === lesson.dayOfWeek &&
      existing.timeSlot === lesson.timeSlot
  );
  
  if (professorConflict) {
    return {
      type: "ProfessorConflict",
      lessonDetails: professorConflict
    };
  }
  
  const classroomConflict = schedule.find(
    existing =>
      existing.classroomNumber === lesson.classroomNumber &&
      existing.dayOfWeek === lesson.dayOfWeek &&
      existing.timeSlot === lesson.timeSlot
  );
  
  if (classroomConflict) {
    return {
      type: "ClassroomConflict",
      lessonDetails: classroomConflict
    };
  }
  
  return null;
}