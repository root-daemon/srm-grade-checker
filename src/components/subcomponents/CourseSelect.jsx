import "./CourseSelect.css";

export default function CourseSelect({ cno, courses, setCourse }) {
  return (
    <div id="content">
      <div id="sno">
        <label>{cno}.</label>
        <input
          type="number"
          max={9}
          maxLength="2"
          placeholder="0"
          value={courses[cno - 1].cred != 0 ? courses[cno - 1].cred : ""}
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
            setCourse(a)

          }}
        />
      </div>
      <select
        onChange={(ev) => {
          let a = [...courses];
          a[cno - 1] = { cred: a[cno - 1].cred, grade: ev.target.value };
          setCourse(a)
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
  );
}
