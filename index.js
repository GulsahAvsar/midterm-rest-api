// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory array to store student data
let students = [];

// GET /students - Retrieve a list of all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET /students/{id} - Retrieve a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.ID === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found.');
    res.json(student);
});

// POST /students - Add a new student
app.post('/students', (req, res) => {
    const { ID, Name, Grade, Email } = req.body;
    const newStudent = { ID, Name, Grade, Email };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT /students/{id} - Update an existing student
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.ID === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found.');

    const { Name, Grade, Email } = req.body;
    student.Name = Name;
    student.Grade = Grade;
    student.Email = Email;

    res.json(student);
});

// DELETE /students/{id} - Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.ID === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send('Student not found.');

    students.splice(studentIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
