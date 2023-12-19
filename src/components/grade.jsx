import { useEffect, useMemo, useState } from 'react';
import GradeSelect from './subcomponents/GradeSelect/GradeSelect.jsx';

export default function GradeCalculator() {
  const [courses, setCourse] = useState([]);
  const [avg, setAvg] = useState('O');

  function handleOnClick() {
    if (courses.length < 7) {
      setCourse([
        ...courses,
        { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      ]);
    }
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() == 'f') {
        setAvg('F');
        setTimeout(() => {
          calculateAvgGrade();
        }, 5000);
      }
    };

    setCourse([
      { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      { grade: 'O', internalMarks: 0, requiredMarks: 0 },
    ])

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function calculateAvgGrade() {
    let o = 0,
      a = 0,
      ap = 0,
      b = 0,
      bp = 0,
      c = 0;
    courses.forEach((e) => {
      switch (e.grade) {
        case 'O':
          o++;
          break;
        case 'A':
          a++;
          break;

        case 'A+':
          ap++;
          break;

        case 'B':
          b++;
          break;

        case 'B+':
          bp++;
          break;

        case 'C':
          c++;
          break;

        default:
          break;
      }

      var tempObj = {
        O: o,
        A: a,
        'A+': ap,
        B: b,
        'B+': bp,
        C: c,
      };

      var max = Object.entries(tempObj).reduce((prev, current) =>
        prev[1] > current[1] ? prev : current
      )[0];
      setAvg(max);
    });
  }
  useMemo(() => {
    calculateAvgGrade();
  }, [courses]);

  return (
    <div id="grade" className="sub-card">
      <div className="grd">
        <h1 className={avg == 'F' ? 'red-grade' : 'brand-grade'}>{avg}</h1>
        <p className="text">Grade</p>
      </div>
      <table className="grade-calc">
        <thead>
          <tr style={{ display: 'flex', gap: 18 }}>
            <th>S.no</th>
            <th>Internals</th>
            <th>Grade</th>
            <th>Required Marks</th>
          </tr>
        </thead>
        <tbody>
          {courses &&
            courses.map((_el, index) => (
              <GradeSelect
                key={index}
                index={index}
                courses={courses}
                setCourse={setCourse}
              />
            ))}
        </tbody>
      </table>
      <div className="row add-course">
        <div
          onClick={handleOnClick}
          className="btn btn-success add-course-button"
        >
          <i className="bi bi-plus"></i> Add a Course
        </div>
      </div>
    </div>
  );
}
