import { useEffect, useState } from 'react';
import GradeSelect from './subcomponents/GradeSelect.jsx/GradeSelect';
const grade_points = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  C: 5.5,
  W: 0,
  F: 0,
  Ab: 0,
  I: 0,
  '*': 0,
};

export default function GradeCalculator() {
  const [courses, setCorures] = useState([
    { grade: 'O', marks: 0, requireMarks: 0 },
    { grade: 'O', marks: 0, requireMarks: 0 },
    { grade: 'O', marks: 0, requireMarks: 0 },
    { grade: 'O', marks: 0, requireMarks: 0 },
    { grade: 'O', marks: 0, requireMarks: 0 },
  ]);

  useEffect(() => {
    
  }, [courses]);

  return (
    <div id="grade" className="sub-card">
      <div className="cpga">
        <p className="text">Grade</p>
      </div>
      {courses.forEach((course) => {
        if (courses.marks === '') course.cred = 0;
        courses.map((_el, index) => <GradeSelect />);
      })}
    </div>
  );
}
