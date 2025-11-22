"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPopularCourseType = getMostPopularCourseType;
const storage_1 = require("../data/storage");
function getMostPopularCourseType() {
    const schedule = storage_1.storage.getSchedule();
    const courses = storage_1.storage.getCourses();
    const typeCounts = {
        "Lecture": 0,
        "Seminar": 0,
        "Lab": 0,
        "Practice": 0
    };
    schedule.forEach(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            typeCounts[course.type]++;
        }
    });
    let maxType = "Lecture";
    let maxCount = 0;
    for (const type in typeCounts) {
        if (typeCounts[type] > maxCount) {
            maxCount = typeCounts[type];
            maxType = type;
        }
    }
    return maxType;
}
//# sourceMappingURL=analytics.service.js.map