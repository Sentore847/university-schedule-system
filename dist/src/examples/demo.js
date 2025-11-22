"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
function runDemo() {
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║   СИСТЕМА УПРАВЛІННЯ РОЗКЛАДОМ УНІВЕРСИТЕТУ               ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");
    console.log("📚 ДОДАВАННЯ ПРОФЕСОРІВ");
    console.log("─────────────────────────────────────────────────────────────");
    (0, src_1.addProfessor)({ id: 1, name: "Іванов Іван Іванович", department: "Інформатика" });
    (0, src_1.addProfessor)({ id: 2, name: "Петренко Петро Петрович", department: "Математика" });
    (0, src_1.addProfessor)({ id: 3, name: "Сидоренко Сидір Сидорович", department: "Фізика" });
    console.log("✓ Додано 3 професорів");
    console.log(`  Всього професорів: ${src_1.storage.getProfessors().length}\n`);
    console.log("🏫 ДОДАВАННЯ АУДИТОРІЙ");
    console.log("─────────────────────────────────────────────────────────────");
    src_1.storage.addClassroom({ number: "101", capacity: 30, hasProjector: true });
    src_1.storage.addClassroom({ number: "102", capacity: 50, hasProjector: true });
    src_1.storage.addClassroom({ number: "201", capacity: 25, hasProjector: false });
    src_1.storage.addClassroom({ number: "301", capacity: 40, hasProjector: true });
    console.log("✓ Додано 4 аудиторії");
    console.log(`  Всього аудиторій: ${src_1.storage.getClassrooms().length}\n`);
    console.log("📖 ДОДАВАННЯ КУРСІВ");
    console.log("─────────────────────────────────────────────────────────────");
    src_1.storage.addCourse({ id: 1, name: "Програмування на TypeScript", type: "Lecture" });
    src_1.storage.addCourse({ id: 2, name: "Алгоритми та структури даних", type: "Lab" });
    src_1.storage.addCourse({ id: 3, name: "Бази даних", type: "Practice" });
    src_1.storage.addCourse({ id: 4, name: "Веб-розробка", type: "Lecture" });
    src_1.storage.addCourse({ id: 5, name: "Тестування ПЗ", type: "Seminar" });
    console.log("✓ Додано 5 курсів");
    console.log(`  Всього курсів: ${src_1.storage.getCourses().length}\n`);
    console.log("📅 ДОДАВАННЯ ЗАНЯТЬ ДО РОЗКЛАДУ");
    console.log("─────────────────────────────────────────────────────────────");
    const lessons = [
        {
            courseId: 1,
            professorId: 1,
            classroomNumber: "101",
            dayOfWeek: "Monday",
            timeSlot: "8:30-10:00"
        },
        {
            courseId: 2,
            professorId: 1,
            classroomNumber: "102",
            dayOfWeek: "Monday",
            timeSlot: "10:15-11:45"
        },
        {
            courseId: 3,
            professorId: 2,
            classroomNumber: "201",
            dayOfWeek: "Monday",
            timeSlot: "8:30-10:00"
        },
        {
            courseId: 4,
            professorId: 2,
            classroomNumber: "301",
            dayOfWeek: "Tuesday",
            timeSlot: "8:30-10:00"
        },
        {
            courseId: 5,
            professorId: 3,
            classroomNumber: "101",
            dayOfWeek: "Wednesday",
            timeSlot: "10:15-11:45"
        }
    ];
    lessons.forEach((lesson, index) => {
        const success = (0, src_1.addLesson)(lesson);
        console.log(`  ${success ? '✓' : '✗'} Заняття ${index + 1}: ${success ? 'Додано' : 'Помилка'}`);
    });
    console.log(`\n  Всього занять у розкладі: ${src_1.storage.getSchedule().length}\n`);
    console.log("⚠️  ПЕРЕВІРКА КОНФЛІКТІВ");
    console.log("─────────────────────────────────────────────────────────────");
    const conflictLesson = {
        courseId: 4,
        professorId: 1,
        classroomNumber: "301",
        dayOfWeek: "Monday",
        timeSlot: "8:30-10:00"
    };
    console.log("  Спроба додати заняття з конфліктом професора...");
    const conflictResult = (0, src_1.addLesson)(conflictLesson);
    console.log(`  ${conflictResult ? '✓' : '✗'} Результат: ${conflictResult ? 'Додано' : 'Відхилено (конфлікт)'}\n`);
    console.log("🔍 ПОШУК ВІЛЬНИХ АУДИТОРІЙ");
    console.log("─────────────────────────────────────────────────────────────");
    const available = (0, src_1.findAvailableClassrooms)("8:30-10:00", "Monday");
    console.log(`  Понеділок, 8:30-10:00`);
    console.log(`  Вільні аудиторії: ${available.length > 0 ? available.join(", ") : "немає"}\n`);
    console.log("👨‍🏫 РОЗКЛАД ПРОФЕСОРА");
    console.log("─────────────────────────────────────────────────────────────");
    const profSchedule = (0, src_1.getProfessorSchedule)(1);
    console.log(`  Професор #1 (Іванов І.І.)`);
    console.log(`  Кількість занять: ${profSchedule.length}`);
    profSchedule.forEach((lesson, index) => {
        console.log(`    ${index + 1}. ${lesson.dayOfWeek}, ${lesson.timeSlot}, ауд. ${lesson.classroomNumber}`);
    });
    console.log("📊 АНАЛІТИКА");
    console.log("─────────────────────────────────────────────────────────────");
    const utilization101 = (0, src_1.getClassroomUtilization)("101");
    const utilization102 = (0, src_1.getClassroomUtilization)("102");
    console.log(`  Використання аудиторії 101: ${utilization101.toFixed(1)}%`);
    console.log(`  Використання аудиторії 102: ${utilization102.toFixed(1)}%`);
    const popularType = (0, src_1.getMostPopularCourseType)();
    console.log(`  Найпопулярніший тип занять: ${popularType}\n`);
    console.log("✏️  МОДИФІКАЦІЯ РОЗКЛАДУ");
    console.log("─────────────────────────────────────────────────────────────");
    console.log("  Зміна аудиторії для заняття #0...");
    const reassignResult = (0, src_1.reassignClassroom)(0, "301");
    console.log(`  ${reassignResult ? '✓' : '✗'} Результат: ${reassignResult ? 'Успішно змінено' : 'Помилка'}\n`);
    console.log("  Скасування заняття #2...");
    const scheduleBeforeCancel = src_1.storage.getSchedule().length;
    (0, src_1.cancelLesson)(2);
    const scheduleAfterCancel = src_1.storage.getSchedule().length;
    console.log(`  Занять до скасування: ${scheduleBeforeCancel}`);
    console.log(`  Занять після скасування: ${scheduleAfterCancel}\n`);
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║   ДЕМОНСТРАЦІЯ ЗАВЕРШЕНА                                   ║");
    console.log("╚════════════════════════════════════════════════════════════╝");
    console.log(`\n📈 Фінальна статистика:`);
    console.log(`   • Професорів: ${src_1.storage.getProfessors().length}`);
    console.log(`   • Аудиторій: ${src_1.storage.getClassrooms().length}`);
    console.log(`   • Курсів: ${src_1.storage.getCourses().length}`);
    console.log(`   • Занять у розкладі: ${src_1.storage.getSchedule().length}`);
    console.log();
}
runDemo();
//# sourceMappingURL=demo.js.map