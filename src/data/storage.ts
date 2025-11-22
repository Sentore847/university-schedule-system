import { Professor, Classroom, Course, Lesson } from '../types/entities.types';

class ScheduleStorage {
  private professors: Professor[] = [];
  private classrooms: Classroom[] = [];
  private courses: Course[] = [];
  private schedule: Lesson[] = [];

  getProfessors(): Professor[] {
    return [...this.professors];
  }

  getClassrooms(): Classroom[] {
    return [...this.classrooms];
  }

  getCourses(): Course[] {
    return [...this.courses];
  }

  getSchedule(): Lesson[] {
    return [...this.schedule];
  }

  addProfessor(professor: Professor): void {
    this.professors.push(professor);
  }

  addClassroom(classroom: Classroom): void {
    this.classrooms.push(classroom);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }

  addLesson(lesson: Lesson): void {
    this.schedule.push(lesson);
  }

  removeLesson(index: number): void {
    if (index >= 0 && index < this.schedule.length) {
      this.schedule.splice(index, 1);
    }
  }

  updateLesson(index: number, lesson: Lesson): void {
    if (index >= 0 && index < this.schedule.length) {
      this.schedule[index] = lesson;
    }
  }

  findCourse(courseId: number): Course | undefined {
    return this.courses.find(c => c.id === courseId);
  }

  findProfessor(professorId: number): Professor | undefined {
    return this.professors.find(p => p.id === professorId);
  }

  findClassroom(classroomNumber: string): Classroom | undefined {
    return this.classrooms.find(c => c.number === classroomNumber);
  }

  clear(): void {
    this.professors = [];
    this.classrooms = [];
    this.courses = [];
    this.schedule = [];
  }
}

export const storage = new ScheduleStorage();