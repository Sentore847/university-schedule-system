"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProfessor = addProfessor;
exports.getProfessorSchedule = getProfessorSchedule;
const storage_1 = require("../data/storage");
function addProfessor(professor) {
    storage_1.storage.addProfessor(professor);
}
function getProfessorSchedule(professorId) {
    return storage_1.storage.getSchedule().filter(lesson => lesson.professorId === professorId);
}
//# sourceMappingURL=professor.service.js.map