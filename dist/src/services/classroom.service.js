"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAvailableClassrooms = findAvailableClassrooms;
exports.getClassroomUtilization = getClassroomUtilization;
const storage_1 = require("../data/storage");
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    const schedule = storage_1.storage.getSchedule();
    const classrooms = storage_1.storage.getClassrooms();
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);
    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}
function getClassroomUtilization(classroomNumber) {
    const schedule = storage_1.storage.getSchedule();
    const totalSlots = 5 * 5;
    const usedSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (usedSlots / totalSlots) * 100;
}
//# sourceMappingURL=classroom.service.js.map