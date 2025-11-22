"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
class ScheduleStorage {
    constructor() {
        this.professors = [];
        this.classrooms = [];
        this.courses = [];
        this.schedule = [];
    }
    getProfessors() {
        return [...this.professors];
    }
    getClassrooms() {
        return [...this.classrooms];
    }
    getCourses() {
        return [...this.courses];
    }
    getSchedule() {
        return [...this.schedule];
    }
    addProfessor(professor) {
        this.professors.push(professor);
    }
    addClassroom(classroom) {
        this.classrooms.push(classroom);
    }
    addCourse(course) {
        this.courses.push(course);
    }
    addLesson(lesson) {
        this.schedule.push(lesson);
    }
    removeLesson(index) {
        if (index >= 0 && index < this.schedule.length) {
            this.schedule.splice(index, 1);
        }
    }
    updateLesson(index, lesson) {
        if (index >= 0 && index < this.schedule.length) {
            this.schedule[index] = lesson;
        }
    }
    findCourse(courseId) {
        return this.courses.find(c => c.id === courseId);
    }
    findProfessor(professorId) {
        return this.professors.find(p => p.id === professorId);
    }
    findClassroom(classroomNumber) {
        return this.classrooms.find(c => c.number === classroomNumber);
    }
    clear() {
        this.professors = [];
        this.classrooms = [];
        this.courses = [];
        this.schedule = [];
    }
}
exports.storage = new ScheduleStorage();
//# sourceMappingURL=storage.js.map