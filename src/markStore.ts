import { map } from 'nanostores';

type TestMark = {
  test: string;
  mark: { 
    scored: string;
    total: string;
  };
};

type Course = {
  courseName: string;
  courseCode: string;
  courseType: string;
  overall: {
    scored: string;
    total: string;
  };
  testPerformance: TestMark[];
};

export const coursesStore = map<Record<string, Course[]>>({});

export function addCourse(course: Course) {
  const currentData = coursesStore.get(); 
  //console.log(currentData);
  if (!currentData[course.courseCode]) {
    currentData[course.courseCode] = [];
  }
  const existingCourseIndex = currentData[course.courseCode].findIndex(c => (c.courseCode === course.courseCode && c.courseType === course.courseType));
  if (existingCourseIndex === -1) {
    currentData[course.courseCode].push(course); 
    coursesStore.set(currentData); 
  } else {
    console.log('Course with this code already exists.'); 
  }
}