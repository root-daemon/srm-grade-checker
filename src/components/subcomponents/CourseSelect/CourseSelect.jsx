import './CourseSelect.css';

export default function CourseSelect({ cno, courses, setCourse }) {

  function del(i) {
    if ((i + 1 == courses.length) && courses.length != 1) {
      let a = [...courses]
      a.pop()
      setCourse(a)
    }
  }

  return (
    <tr>
      <div id="content">
        <div className="cred-input">
          <td>
            <div id="sno" className={((cno == courses.length) && courses.length != 1) ? "del" : ""}>
              <label title={((cno == courses.length) && courses.length != 1) ? "Delete" : ""} onClick={() => del(cno-1)} htmlFor='course-input'>{cno}.</label>
            </div>

          </td>
          <td>
            <input
              type="number"
              max={9}
              id="course-input"
              maxLength="2"
              placeholder="0"
              value={courses[cno - 1].cred != 0 ? courses[cno - 1].cred : ''}
              onInput={(event) => {
                if (event.target.value > 10)
                  event.target.value = event.target.value.slice(0, 1);
              }}
              onChange={(ev) => {
                let a = [...courses];
                a[cno - 1] = {
                  cred: Number(ev.target.value),
                  grade: a[cno - 1].grade,
                };
                setCourse(a);
              }}
            />
          </td>
        </div>
        <td>
          <select
            onChange={(ev) => {
              let a = [...courses];
              a[cno - 1] = { cred: a[cno - 1].cred, grade: ev.target.value };
              setCourse(a);
            }}
            id="grade"
            value={courses[cno - 1].grade}
          >
            <option>O</option>
            <option>A+</option>
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C</option>
            <option>W</option>
            <option>Abs/Det</option>
          </select>
        </td>
      </div>
    </tr>
  );
}
