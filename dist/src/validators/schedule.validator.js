"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLesson = validateLesson;
const storage_1 = require("../data/storage");
function validateLesson(lesson) {
    const schedule = storage_1.storage.getSchedule();
    const professorConflict = schedule.find(existing => existing.professorId === lesson.professorId &&
        existing.dayOfWeek === lesson.dayOfWeek &&
        existing.timeSlot === lesson.timeSlot);
    if (professorConflict) {
        return {
            type: "ProfessorConflict",
            lessonDetails: professorConflict
        };
    }
    const classroomConflict = schedule.find(existing => existing.classroomNumber === lesson.classroomNumber &&
        existing.dayOfWeek === lesson.dayOfWeek &&
        existing.timeSlot === lesson.timeSlot);
    if (classroomConflict) {
        return {
            type: "ClassroomConflict",
            lessonDetails: classroomConflict
        };
    }
    return null;
}
//# sourceMappingURL=schedule.validator.js.map