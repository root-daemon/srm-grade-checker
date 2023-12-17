import './GradeSelect.css';

export default function GradeSelect({ cno, courses }) {
  return (
    <div className="content">
      <div id="content">
        <div id="sno">
          <label>{cno}.</label>
          <input
            type="number"
            max={60}
            maxLength="3"
            placeholder="0"
            value={
              courses[cno - 1].internals != 0 ? courses[cno - 1].internals : ''
            }
            onInput={(event) => {
              if (event.target.value > 100)
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
        </div>
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
      </div>
    </div>
  );
}
