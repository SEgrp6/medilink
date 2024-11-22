// server.js
const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        process.exit(1); // Exit if database connection fails
    }
    console.log("Connected to the MySQL database.");
});

// Endpoint to register a doctor
app.post("/registerDoctor", (req, res) => {
    const { name, specialization, password, hospitalName, hospitalCode } = req.body;
    const sql = `
        INSERT INTO Doctors (name, specialization, password_hash, hospital_id)
        SELECT ?, ?, ?, hospital_id
        FROM Hospitals
        WHERE hospital_name = ? AND hospital_code = ?;
    `;

    db.query(sql, [name, specialization, password, hospitalName, hospitalCode], (err, result) => {
        if (err) {
            console.error("Error in /registerDoctor:", err);
            return res.status(500).json({ error: "Database error during doctor registration." });
        }
        res.status(200).json({ message: "Doctor registered successfully." });
    });
});

// Endpoint to create a new ward
app.post("/api/wards", (req, res) => {
    const { ward_name, ward_code, hospital_id, doctor_id } = req.body;
    console.log("Received data:", { ward_name, ward_code, hospital_id, doctor_id });
    if (!ward_name || !ward_code || !hospital_id || !doctor_id) {
        console.warn("Missing required fields in /api/wards request");
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    const sql = "INSERT INTO Wards (ward_name, ward_code, hospital_id, doctor_id) VALUES (?, ?, ?, ?)";
    const values = [ward_name, ward_code, hospital_id, doctor_id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database error in /api/wards:", err);
            return res.status(500).json({ success: false, message: "Database error." });
        }

        res.json({ success: true, message: "Ward created successfully.", ward_id: result.insertId });
    });
});

//get all wards
app.get("/api/wards", (req, res) => {
    const sql = "SELECT * FROM Wards";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error in /api/wards:", err);
            return res.status(500).json({ error: "Database error." });
        }
        res.json(result);
    });
});

// endpoint to get all patients in a ward
app.get('/patients/:ward', (req, res) => {
  const ward = req.params.ward;

  const sql = 'SELECT * FROM patients WHERE ward = ?';
  db.query(sql, [ward], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching patients' });
    } else {
      res.json({ success: true, patients: results });
    }
  });
});
//endpoint scheduling apppointments
app.post('/appointments', (req, res) => {
  const { doctor_id, patient_id, appointment_date, notes } = req.body;

  const sql = 'INSERT INTO appointments (doctor_id, patient_id, appointment_date, notes) VALUES (?, ?, ?, ?)';
  db.query(sql, [doctor_id, patient_id, appointment_date, notes], (err) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error scheduling appointment' });
    } else {
      res.json({ success: true, message: 'Appointment scheduled successfully' });
    }
  });
});
//endpoint for getting all appointments
app.get('/appointments/:doctor_id', (req, res) => {
  const doctor_id = req.params.doctor_id;

  const sql = `
    SELECT a.id, a.appointment_date, a.notes, p.name AS patient_name, p.ward
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    WHERE a.doctor_id = ?
  `;
  db.query(sql, [doctor_id], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Error fetching appointments' });
    } else {
      res.json({ success: true, appointments: results });
    }
  });
});


PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
