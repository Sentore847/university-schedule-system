import {
  addProfessor,
  addLesson,
  findAvailableClassrooms,
  getProfessorSchedule,
  getClassroomUtilization,
  getMostPopularCourseType,
  reassignClassroom,
  cancelLesson,
  storage,
  Lesson
} from '../../src';


function runDemo(): void {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║   СИСТЕМА УПРАВЛІННЯ РОЗКЛАДОМ УНІВЕРСИТЕТУ               ║");
  console.log("╚════════════════════════════════════════════════════════════╝\n");

  console.log("📚 ДОДАВАННЯ ПРОФЕСОРІВ");
  console.log("─────────────────────────────────────────────────────────────");
  
  addProfessor({ id: 1, name: "Іванов Іван Іванович", department: "Інформатика" });
  addProfessor({ id: 2, name: "Петренко Петро Петрович", department: "Математика" });
  addProfessor({ id: 3, name: "Сидоренко Сидір Сидорович", department: "Фізика" });
  
  console.log("✓ Додано 3 професорів");
  console.log(`  Всього професорів: ${storage.getProfessors().length}\n`);

  console.log("🏫 ДОДАВАННЯ АУДИТОРІЙ");
  console.log("─────────────────────────────────────────────────────────────");
  
  storage.addClassroom({ number: "101", capacity: 30, hasProjector: true });
  storage.addClassroom({ number: "102", capacity: 50, hasProjector: true });
  storage.addClassroom({ number: "201", capacity: 25, hasProjector: false });
  storage.addClassroom({ number: "301", capacity: 40, hasProjector: true });
  
  console.log("✓ Додано 4 аудиторії");
  console.log(`  Всього аудиторій: ${storage.getClassrooms().length}\n`);

  console.log("📖 ДОДАВАННЯ КУРСІВ");
  console.log("─────────────────────────────────────────────────────────────");
  
  storage.addCourse({ id: 1, name: "Програмування на TypeScript", type: "Lecture" });
  storage.addCourse({ id: 2, name: "Алгоритми та структури даних", type: "Lab" });
  storage.addCourse({ id: 3, name: "Бази даних", type: "Practice" });
  storage.addCourse({ id: 4, name: "Веб-розробка", type: "Lecture" });
  storage.addCourse({ id: 5, name: "Тестування ПЗ", type: "Seminar" });
  
  console.log("✓ Додано 5 курсів");
  console.log(`  Всього курсів: ${storage.getCourses().length}\n`);

  console.log("📅 ДОДАВАННЯ ЗАНЯТЬ ДО РОЗКЛАДУ");
  console.log("─────────────────────────────────────────────────────────────");
  
  const lessons: Lesson[] = [
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
    const success = addLesson(lesson);
    console.log(`  ${success ? '✓' : '✗'} Заняття ${index + 1}: ${success ? 'Додано' : 'Помилка'}`);
  });

  console.log(`\n  Всього занять у розкладі: ${storage.getSchedule().length}\n`);

  console.log("⚠️  ПЕРЕВІРКА КОНФЛІКТІВ");
  console.log("─────────────────────────────────────────────────────────────");
  
  const conflictLesson: Lesson = {
    courseId: 4,
    professorId: 1,
    classroomNumber: "301",
    dayOfWeek: "Monday",
    timeSlot: "8:30-10:00"
  };
  
  console.log("  Спроба додати заняття з конфліктом професора...");
  const conflictResult = addLesson(conflictLesson);
  console.log(`  ${conflictResult ? '✓' : '✗'} Результат: ${conflictResult ? 'Додано' : 'Відхилено (конфлікт)'}\n`);

  console.log("🔍 ПОШУК ВІЛЬНИХ АУДИТОРІЙ");
  console.log("─────────────────────────────────────────────────────────────");
  
  const available = findAvailableClassrooms("8:30-10:00", "Monday");
  console.log(`  Понеділок, 8:30-10:00`);
  console.log(`  Вільні аудиторії: ${available.length > 0 ? available.join(", ") : "немає"}\n`);

  console.log("👨‍🏫 РОЗКЛАД ПРОФЕСОРА");
  console.log("─────────────────────────────────────────────────────────────");
  
  const profSchedule = getProfessorSchedule(1);
  console.log(`  Професор #1 (Іванов І.І.)`);
  console.log(`  Кількість занять: ${profSchedule.length}`);
  
  profSchedule.forEach((lesson: Lesson, index: number) => {
  console.log(`    ${index + 1}. ${lesson.dayOfWeek}, ${lesson.timeSlot}, ауд. ${lesson.classroomNumber}`);
  });
    
  console.log("📊 АНАЛІТИКА");
  console.log("─────────────────────────────────────────────────────────────");
  
  const utilization101 = getClassroomUtilization("101");
  const utilization102 = getClassroomUtilization("102");
  console.log(`  Використання аудиторії 101: ${utilization101.toFixed(1)}%`);
  console.log(`  Використання аудиторії 102: ${utilization102.toFixed(1)}%`);
  
  const popularType = getMostPopularCourseType();
  console.log(`  Найпопулярніший тип занять: ${popularType}\n`);

  console.log("✏️  МОДИФІКАЦІЯ РОЗКЛАДУ");
  console.log("─────────────────────────────────────────────────────────────");
  
  console.log("  Зміна аудиторії для заняття #0...");
  const reassignResult = reassignClassroom(0, "301");
  console.log(`  ${reassignResult ? '✓' : '✗'} Результат: ${reassignResult ? 'Успішно змінено' : 'Помилка'}\n`);
  
  console.log("  Скасування заняття #2...");
  const scheduleBeforeCancel = storage.getSchedule().length;
  cancelLesson(2);
  const scheduleAfterCancel = storage.getSchedule().length;
  console.log(`  Занять до скасування: ${scheduleBeforeCancel}`);
  console.log(`  Занять після скасування: ${scheduleAfterCancel}\n`);

  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║   ДЕМОНСТРАЦІЯ ЗАВЕРШЕНА                                   ║");
  console.log("╚════════════════════════════════════════════════════════════╝");
  console.log(`\n📈 Фінальна статистика:`);
  console.log(`   • Професорів: ${storage.getProfessors().length}`);
  console.log(`   • Аудиторій: ${storage.getClassrooms().length}`);
  console.log(`   • Курсів: ${storage.getCourses().length}`);
  console.log(`   • Занять у розкладі: ${storage.getSchedule().length}`);
  console.log();
}

runDemo();