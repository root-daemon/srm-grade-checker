import { useEffect, useState } from 'react';
import './GradeSelect.css';

export default function GradeSelect({
  index,
  requiredMarksCalculator,
  courses,
  setCourse,
}) {
  const grade_points = {
    O: 91,
    'A+': 81,
    A: 71,
    'B+': 61,
    B: 56,
    C: 50,
  };
  const requiredMarks = courses[index].requiredMarks;
  return (
    <tr>
      <div className="content">
        <div id="content">
          <div className="internal-input">
            <td>
              <div id="sno">
                <label>{index + 1}.</label>
              </div>
            </td>

            <td>
              <input
                type="number"
                max={60}
                maxLength="3"
                placeholder="0"
                value={
                  courses[index].internalsMarks != 0
                    ? courses[index].internalsMarks
                    : ''
                }
                onInput={(event) => {
                  if (event.target.value > 100)
                    event.target.value = event.target.value.slice(0, 2);
                }}
                onChange={(ev) => {
                  let a = [...courses];
                  a[index] = {
                    internalMarks: Number(ev.target.value),
                    grade: a[index].grade,
                  };
                  setCourse(a);
                  requiredMarks = ((a[index].grade - internalsMarks) / 40) * 75;
                }}
              />
            </td>
          </div>
          <td>
            <select
              onChange={(ev) => {
                let a = [...courses];
                a[index] = {
                  internalMarks: a[index].internalMarks,
                  grade: ev.target.value,
                };
                setCourse(a);
              }}
              id="grade"
              value={courses[index].grade}
            >
              <option>O</option>
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>C</option>
            </select>
          </td>
          <td> {courses[index].requiredMarks > 75 ? (
              <div>N/a</div>
            ) : (
              <div className="required-marks row d-flex">
                <div className="col-6">{requiredMarks}</div>
                <div className="col-6">/75</div>
              </div>
            )}
          </td>
        </div>
      </div>
    </tr>
  );
}
