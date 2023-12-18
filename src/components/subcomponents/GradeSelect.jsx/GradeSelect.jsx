import { useState } from 'react';
import './GradeSelect.css';

export default function GradeSelect({
  index,
  courses,
  setCourse,
}) {
  const grade_points = {
    'O': 91,
    'A+': 81,
    'A': 71,
    'B+': 61,
    'B': 56,
    'C': 50,
  };
  const [requiredMarks, setMarks] = useState(0);

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
                  if (event.target.value > 60)
                    event.target.value = 60;
                }}
                onChange={(ev) => {
                  let a = [...courses];
                  a[index] = {
                    internalMarks: Number(ev.target.value),
                    grade: a[index].grade,
                    requiredMarks: (((grade_points[a[index].grade] - Number(ev.target.value)) / 40) * 75)
                  };
                  setCourse(a);
                  setMarks(parseFloat((((grade_points[a[index].grade] - Number(ev.target.value)) / 40) * 75).toPrecision(3)))
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
                  requiredMarks: (((grade_points[ev.target.value] - a[index].internalMarks) / 40) * 75)
                };
                setCourse(a);
                setMarks(parseFloat((((grade_points[ev.target.value] - a[index].internalMarks) / 40) * 75).toPrecision(3)))
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
          <td>
            <div className="required-marks row d-flex">
              <div className="col-6">{requiredMarks}</div>
              <div className="col-6">/75</div>
            </div>

          </td>
        </div>
      </div>
    </tr>
  );
}
