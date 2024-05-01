import { addCourse, coursesStore } from '@/markStore';
import { useStore } from '@nanostores/react';
import { useEffect, useMemo, useState } from 'react';
//import { setCookie } from 'utils/cookies.js';
import GradeSelect from './subcomponents/GradeSelect/GradeSelect.jsx';

export default function GradeCalculator() {
  const [courses, setCourse] = useState([]);
  const [avg, setAvg] = useState('O');
  const $courses = useStore(coursesStore);
  function handleOnClick() {
    if (courses.length < 7) {
      setCourse([
        ...courses,
        { grade: 'O', internalMarks: 0, requiredMarks: 0 },
      ]);
    }
  }
  function handleGetInternals(){
    const login = prompt('Username');
    const pass = prompt('Password');
    fetch('https://proscrape.vercel.app/api/login', {
      method: 'POST',
      headers: {
        Origin: 'https://proscrape.vercel.app',
        Referer: 'https://proscrape.vercel.app',
        Host: 'proscrape.vercel.app',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account: login,
        password: pass,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.cookies) {
          setCookie('token', res.cookies);
          fetch('https://proscrape.vercel.app/api/marks', {
            method: 'GET',
            headers: {
              'X-CSRF-Token': res.cookies,
              'Set-Cookie': res.cookies,
              Cookie: res.cookies,
              'Content-Type': 'application/json',
            },
          }).then((d) =>
            d.json().then((res) => {
              res.marks.map((subjectMark) => {
                addCourse({
                  courseName: subjectMark.courseName,
                  courseCode: subjectMark.courseCode,
                  courseType: subjectMark.courseType,
                  overall: {
                    scored: subjectMark.overall['marks'],
                    total: subjectMark.overall['total'],
                  },
                  testPerformance: [],
                });
              });
            })
          );
        } else {
          console.log(res); 
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  useEffect(()=>{
    console.log('hello');
    console.log($courses);
    Object.keys(courses).forEach(key=> 
      $courses[key].forEach(course=>{
        console.log(course);
      }) 
    );
  }, [$courses])
  
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
    //console.log(useStore(coursesStore));
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
      {courses[0] && <table className="grade-calc">
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
      </table>}
      <div className="row add-course">
        <div
          onClick={handleOnClick}
          className="btn btn-success add-course-button"
        >
          <i className="bi bi-plus"></i> Add a Course
        </div>
        <div
          onClick={handleGetInternals}
          className="btn btn-success add-course-button"
        >
          <i className="bi bi-plus"></i> Get Internals 
        </div>
      </div>
    </div>
  );
}