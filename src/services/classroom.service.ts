import { TimeSlot, DayOfWeek } from '../types/basic.types';
import { storage } from '../data/storage';

export function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  const schedule = storage.getSchedule();
  const classrooms = storage.getClassrooms();

  const occupiedClassrooms = schedule
    .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
    .map(lesson => lesson.classroomNumber);
  
  return classrooms
    .filter(classroom => !occupiedClassrooms.includes(classroom.number))
    .map(classroom => classroom.number);
}

export function getClassroomUtilization(classroomNumber: string): number {
  const schedule = storage.getSchedule();
  const totalSlots = 5 * 5;
  
  const usedSlots = schedule.filter(
    lesson => lesson.classroomNumber === classroomNumber
  ).length;
  
  return (usedSlots / totalSlots) * 100;
}