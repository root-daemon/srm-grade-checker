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


  return (
    <div id="grade" className="sub-card">
      <div className="cpga">
        <p className="text">Grade</p>
      </div>
      <table className='grade-calc'>
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
          />
        ))}
      </table>
    </div>
  );
}
