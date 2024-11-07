const express = require("express");
const app = express();
const port = 1804;

app.use(express.json());

let studentInfo = [
    { id: 1, name: "Vinh", class: "CN22D", dob: "18/04/2004" },
    { id: 2, name: "Vinh2", class: "CN22D", dob: "18/04/2004" },
    { id: 3, name: "Vinh3", class: "CN22D", dob: "18/04/2004" }
];


app.get("/student", (req, res) => {
    res.send(studentInfo);
});


app.post("/student", (req, res) => {
    const { name, class: studentClass, dob } = req.body;
    const randomId = Math.floor(Math.random() * 9999);

    const newStudent = {
        id: randomId,
        name: name || "HOC SINH MOI",
        class: studentClass || "CN22D",
        dob: dob || "18/04/2004"
    };

    
    studentInfo = [...studentInfo, newStudent];
    res.send(studentInfo);
});


app.put("/student/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, class: studentClass, dob } = req.body;

    let student = studentInfo.find(student => student.id === studentId);

    if (student) {
        student.name = name || student.name;
        student.class = studentClass || student.class;
        student.dob = dob || student.dob;

        res.send(studentInfo);
    } else {
        res.status(404).send({ message: "Không tìm thấy học sinh." });
    }
});


app.delete("/student/:id", (req, res) => {
    const studentId = parseInt(req.params.id);

    const initialLength = studentInfo.length;
    studentInfo = studentInfo.filter(student => student.id !== studentId);

    if (studentInfo.length < initialLength) {
        res.send(studentInfo);
    } else {
        res.status(404).send({ message: "Không tìm thấy học sinh để xoá." });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
