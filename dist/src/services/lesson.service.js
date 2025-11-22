"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLesson = addLesson;
exports.reassignClassroom = reassignClassroom;
exports.cancelLesson = cancelLesson;
const storage_1 = require("../data/storage");
const schedule_validator_1 = require("../validators/schedule.validator");
function addLesson(lesson) {
    const conflict = (0, schedule_validator_1.validateLesson)(lesson);
    if (conflict !== null) {
        console.error(`Конфлікт: ${conflict.type}`);
        return false;
    }
    storage_1.storage.addLesson(lesson);
    return true;
}
function reassignClassroom(lessonIndex, newClassroomNumber) {
    const schedule = storage_1.storage.getSchedule();
    if (lessonIndex < 0 || lessonIndex >= schedule.length) {
        console.error("Заняття не знайдено");
        return false;
    }
    const lesson = schedule[lessonIndex];
    const testLesson = {
        ...lesson,
        classroomNumber: newClassroomNumber
    };
    storage_1.storage.removeLesson(lessonIndex);
    const conflict = (0, schedule_validator_1.validateLesson)(testLesson);
    if (conflict !== null) {
        storage_1.storage.addLesson(lesson);
        console.error("Неможливо змінити аудиторію: конфлікт");
        return false;
    }
    storage_1.storage.addLesson(testLesson);
    return true;
}
function cancelLesson(lessonIndex) {
    const schedule = storage_1.storage.getSchedule();
    if (lessonIndex >= 0 && lessonIndex < schedule.length) {
        storage_1.storage.removeLesson(lessonIndex);
        console.log(`Заняття ${lessonIndex} скасовано`);
    }
    else {
        console.error("Заняття не знайдено");
    }
}
//# sourceMappingURL=lesson.service.js.map