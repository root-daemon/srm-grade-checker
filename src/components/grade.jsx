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

  const [avg, setAvg] = useState('O')

  useEffect(() => {
    let o = 0, a = 0, ap = 0, b = 0, bp = 0, c = 0;
    courses.forEach((e) => {
      switch(e.grade) {
        case 'O':
          o++
          break;
        case 'A':
          a++
          break;

        case 'A+':
          ap++
          break;

        case 'B':
          b++
          break;

        case 'B+':
          bp++
          break;

        case 'C':
          c++
          break;

        default:
          break;

      }
      
      var tempObj = {
        "O" : o,
        "A" : a,
        "A+" : ap,
        "B" : b,
        "B+" : bp,
        "C": c
       }

       console.log(tempObj)
       
       var max  = Object.entries(tempObj).reduce((prev, current) => (prev[1] > current[1]) ? prev : current)[0];
       setAvg(max)
    })
  }, [courses])


  return (
    <div id="grade" className="sub-card">
      <div className="cpga">
        <h1>{avg}</h1>
        <p className="text">Grade</p>
      </div>
      <table className='grade-calc'>
        <tr style={{ display: 'flex', gap: 18 }}>
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
