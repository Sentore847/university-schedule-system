import { Lesson } from '../types/entities.types';
export type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};
//# sourceMappingURL=conflict.types.d.ts.map