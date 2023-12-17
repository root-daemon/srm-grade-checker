import CourseSelect from "../components/subcomponents/CourseSelect.jsx";
import { useEffect, useState } from "react";

const grade_points = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    C: 5.5,
    W: 0,
    F: 0,
    Ab: 0,
    I: 0,
    "*": 0,
};

export default function CGPA() {
    const [cgpa, setCgpa] = useState(0)
    const [courses, setCourse] = useState([
        { cred: 0, grade: "O" },
        { cred: 0, grade: "O" },
        { cred: 0, grade: "O" },
        { cred: 0, grade: "O" },
        { cred: 0, grade: "O" },
        { cred: 0, grade: "O" },
    ]);

    useEffect(() => {
        cgpaCalculator()
    }, [courses])
    
    function cgpaCalculator() {
        var points = 0;
        var sum_credit = 0;
        courses.forEach((course) => {
            if (course.cred === "") course.cred = 0;
            sum_credit += Number(course.cred) || 0;
            var gp = grade_points[course.grade];
            points += Number(course.cred) * gp
        });
        var gpa = (points / sum_credit);

        setCgpa(isNaN(gpa) ? 0 : parseFloat(gpa.toPrecision(3)))
    }

    return (
        <div id="cgpa" className="sub-card">
            <div className="cgpa">
                <h1>{cgpa}</h1>
                <p className="text">CGPA</p>
            </div>
            {
                courses.map((_el, index) => (
                    <CourseSelect
                        key={index}
                        cno={index + 1}
                        courses={courses}
                        setCourse={setCourse}
                        cgpaCalculator={cgpaCalculator}
                    />
                ))
            }
        </div>
    )
}