import { CourseType } from '../types/basic.types';
import { storage } from '../data/storage';

export function getMostPopularCourseType(): CourseType {
  const schedule = storage.getSchedule();
  const courses = storage.getCourses();

  const typeCounts: Record<CourseType, number> = {
    "Lecture": 0,
    "Seminar": 0,
    "Lab": 0,
    "Practice": 0
  };
  
  schedule.forEach(lesson => {
    const course = courses.find(c => c.id === lesson.courseId);
    if (course) {
      typeCounts[course.type as CourseType]++;
    }
  });

  let maxType: CourseType = "Lecture";
  let maxCount = 0;
  
  for (const type in typeCounts) {
    if (typeCounts[type as CourseType] > maxCount) {
      maxCount = typeCounts[type as CourseType];
      maxType = type as CourseType;
    }
  }
  
  return maxType;
}