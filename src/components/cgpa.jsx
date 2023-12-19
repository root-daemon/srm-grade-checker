import { useEffect, useState } from 'react';
import CourseSelect from './subcomponents/CourseSelect/CourseSelect.jsx';

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

export default function CGPA() {
  const [cgpa, setCgpa] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [courses, setCourse] = useState([
    { cred: 0, grade: 'O' },
    { cred: 0, grade: 'O' },
    { cred: 0, grade: 'O' },
    { cred: 0, grade: 'O' },
    { cred: 0, grade: 'O' },
  ]);

  useEffect(() => {
    cgpaCalculator();
  }, [courses]);

  function cgpaCalculator() {
    var points = 0;
    var sum_credit = 0;
    courses.forEach((course) => {
      if (course.cred === '') course.cred = 0;
      sum_credit += Number(course.cred) || 0;
      var gp = grade_points[course.grade];
      points += Number(course.cred) * gp;
    });
    var gpa = points / sum_credit;

    setCgpa(isNaN(gpa) ? 0 : parseFloat(gpa.toPrecision(3)));
  }
  function handleOnClick() {
    if (courses.length < 7) {
      setCourse([...courses, { cred: 0, grade: 'O' }]);
    }
  }
  function handleEasterOnClick() {
    if (clicks >= 7) {
      setClicks(clicks + 1);
      setTimeout(() => {
        setClicks(0);
      }, 5000);
    } else {
      setClicks(clicks + 1);
    }
  }
  return (
    <div id="cgpa" className="sub-card">
      <div className="cgpa" onClick={handleEasterOnClick}>
        <h1>{clicks > 7 ? 6.9 : cgpa}</h1>
        <p className="text">CGPA</p>
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ width: '10%' }}>S.no</th>
            <th>Cred</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <div className="input-table">
            {courses.map((_el, index) => (
              <CourseSelect
                key={index}
                cno={index + 1}
                courses={courses}
                setCourse={setCourse}
                cgpaCalculator={cgpaCalculator}
              />
            ))}
          </div>
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
