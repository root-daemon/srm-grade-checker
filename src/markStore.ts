import { string } from 'astro/zod';
import { map } from 'nanostores';
type TestMark = {
  test: string;
  mark: { 
    scored: string;
    total: string;
  },
};
type Course = {
  courseName: string;
  courseCode: string;
  courseType: string;
  overall:{
    scored: string;
    total: string;
  };
  testPerformance: TestMark[];
};


export const coursesStore = map<Record<string, Course[]>>({ });
export function addCourse(course: Course) {
  const currentData = coursesStore.get().marks;
  const existingCourseIndex = currentData.findIndex(c => c.courseCode === course.courseCode);
  if (existingCourseIndex === -1) {
    coursesStore.set({ marks: [...currentData, course] });
  } else {
    console.log('Course with this code already exists.');
  }
}



