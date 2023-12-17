import { useEffect, useState } from 'react';
import GradeSelect from './subcomponents/GradeSelect.jsx/GradeSelect';
const grade_points = {
  O: 91,
  'A+': 81,
  A: 71,
  'B+': 61,
  B: 56,
  C: 50,
};

export default function GradeCalculator() {
  const [courses, setCourse] = useState([
    { grade: 'O', internalMarks: 0, requiredMarks: 0 },
    { grade: 'O', internalMarks: 0, requiredMarks: 0 },
    { grade: 'O', internalMarks: 0, requiredMarks: 0 },
    { grade: 'O', internalMarks: 0, requiredMarks: 0 },
    { grade: 'O', internalMarks: 0, requiredMarks: 0 },
  ]);

  useEffect(() => {
    requiredMarksCalculator();
    console.log(courses);
  }, [courses]);

  function requiredMarksCalculator() {
    console.log('calcualted');
    courses.forEach((course) => {
      var marks_required = grade_points[course.grade] - course.internalMarks;
      console.log('marks_required', marks_required);
      course.requiredMarks = (marks_required / 40) * 75;
    });
  }
  return (
    <div id="grade" className="sub-card">
      <div className="cpga">
        <p className="text">Grade</p>
      </div>
      <table>
        <tr>
          <th>S.no</th>
          <th>Internals</th>
          <th>Grade</th>
          <th>Required Marks</th>
        </tr>
        {courses.map((_el, index) => (
          <GradeSelect
            key={index}
            index={index}
            courses={courses}
            setCourse={setCourse}
            requiredMarksCalculator={requiredMarksCalculator}
          />
        ))}
      </table>
    </div>
  );
}
