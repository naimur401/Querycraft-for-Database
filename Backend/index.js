const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "querycraft"
});

db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected');
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    });
});

app.post("/student", (req, res) => {
    console.log("Received data:", req.body); // Log the request body
    const q = "INSERT INTO students SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error adding student:', err); // Log any errors
            return res.status(500).json(err); // Return the error response
        }
        return res.json({
            dataInserted: true,
            message: "Student added successfully."
        });
    });
});

app.post("/user", (req, res) => {
    console.log("Received data:", req.body); // Log the request body
    const q = "INSERT INTO user SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error adding user:', err); // Log any errors
            return res.status(500).json(err); // Return the error response
        }
        return res.json({
            dataInserted: true,
            message: "User added successfully."
        });
    });
});

app.post("/enrollments", (req, res) => {
    console.log("Received data:", req.body); // Log the request body
    const q = "INSERT INTO enrollments SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error adding enrollment:', err); // Log any errors
            return res.status(500).json(err); // Return the error response
        }
        return res.json({
            dataInserted: true,
            message: "Enrollment added successfully."
        });
    });
});

app.get("/courses", (req, res) => {
    const sql = "SELECT * FROM courses";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    });
});

app.get("/events", (req, res) => {
    const sql = "SELECT * FROM events";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    });
});
app.post("/myevents", (req, res) => {
    console.log("Received data:", req.body); // Log the request body
    const q = "INSERT INTO myevents SET ?";
    const values = req.body;
    db.query(q, values, (err, data) => {
        if (err) {
            console.error('Error adding enrollment:', err); // Log any errors
            return res.status(500).json(err); // Return the error response
        }
        return res.json({
            dataInserted: true,
            message: "event added successfully."
        });
    });
});
app.get("/myevents", (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = `
        SELECT event_id, event_name, event_date, description
        FROM myevents
        WHERE email = ?`;

    db.query(sql, [email], (error, data) => {
        if (error) {
            console.error('Error retrieving courses:', error); // Log any errors
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'No courses found for this email' });
        }
        console.log(data);
        return res.json(data);
    });
});

app.delete("/myevents", (req, res) => {
    const { email, event_id } = req.query;

    if (!email || !event_id) {
        return res.status(400).json({ error: 'Email and event_id are required' });
    }

    const deleteQuery = "DELETE FROM myevents WHERE email = ? AND event_id = ?";
    const values = [email, event_id];

    db.query(deleteQuery, values, (error, result) => {
        if (error) {
            console.error('Error deleting events:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'event not found' });
        }

        return res.json({ message: 'event deleted successfully', deletedCount: true });
    });
});
app.get("/notifications", (req, res) => {
    const sql = "SELECT * FROM notifications";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    });
});
app.delete('/notifications/:notification_id', (req, res) => {
    const notificationId = req.params.notification_id;
    const query = 'DELETE FROM notifications WHERE notification_id = ?';

    db.query(query, [notificationId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error deleting notification' });
        }
        res.json({ deleted: true });
    });
});
// New endpoint to get courses by email
app.get("/my-courses", (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const sql = `
        SELECT c.course_id, c.course_code, c.title, c.description, c.prerequisites
        FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id
        WHERE e.email = ?`;

    db.query(sql, [email], (error, data) => {
        if (error) {
            console.error('Error retrieving courses:', error); // Log any errors
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: 'No courses found for this email' });
        }
        console.log(data);
        return res.json(data);
    });
});

app.delete("/enrollments", (req, res) => {
    const { email, courseId } = req.query;

    if (!email || !courseId) {
        return res.status(400).json({ error: 'Email and courseId are required' });
    }

    const deleteQuery = "DELETE FROM enrollments WHERE email = ? AND course_id = ?";
    const values = [email, courseId];

    db.query(deleteQuery, values, (error, result) => {
        if (error) {
            console.error('Error deleting enrollment:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        return res.json({ message: 'Enrollment deleted successfully', deletedCount: true });
    });
});
// Endpoint to get user-specific notifications
app.get("/notifications", (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const sql = `
        SELECT notification_id, user_id, message, timestamp, status
        FROM notifications
        WHERE user_id = ?`;

    db.query(sql, [userId], (error, data) => {
        if (error) {
            console.error('Error retrieving notifications:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        return res.json(data);
    });
});
// Endpoint to update notification status
app.patch("/notifications/:notificationId", (req, res) => {
    const { notificationId } = req.params;
    const { status } = req.body;

    if (!notificationId || !status) {
        return res.status(400).json({ error: 'Notification ID and status are required' });
    }

    const updateQuery = "UPDATE notifications SET status = ? WHERE notification_id = ?";
    const values = [status, notificationId];

    db.query(updateQuery, values, (error, result) => {
        if (error) {
            console.error('Error updating notification status:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        return res.json({ message: 'Notification status updated successfully', updated: true });
    });
});





app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
