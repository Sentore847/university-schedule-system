import { Professor, Classroom, Course, Lesson } from '../types/entities.types';
declare class ScheduleStorage {
    private professors;
    private classrooms;
    private courses;
    private schedule;
    getProfessors(): Professor[];
    getClassrooms(): Classroom[];
    getCourses(): Course[];
    getSchedule(): Lesson[];
    addProfessor(professor: Professor): void;
    addClassroom(classroom: Classroom): void;
    addCourse(course: Course): void;
    addLesson(lesson: Lesson): void;
    removeLesson(index: number): void;
    updateLesson(index: number, lesson: Lesson): void;
    findCourse(courseId: number): Course | undefined;
    findProfessor(professorId: number): Professor | undefined;
    findClassroom(classroomNumber: string): Classroom | undefined;
    clear(): void;
}
export declare const storage: ScheduleStorage;
export {};
//# sourceMappingURL=storage.d.ts.map