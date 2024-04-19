import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load applicants data from JSON file
let applicants = [];
try {
    const data = fs.readFileSync('applicants.json');
    applicants = JSON.parse(data);
} catch (err) {
    console.error('Error reading applicants data:', err);
}

// GET all applicants
app.get('/applicants', (req, res) => {
    res.json(applicants);
});

// GET single applicant by ID
app.get('/applicants/:id', (req, res) => {
    const applicantId = req.params.id;
    const applicant = applicants.find(applicant => applicant.id === applicantId);
    if (applicant) {
        res.json(applicant);
    } else {
        res.status(404).json({ error: 'Applicant not found' });
    }
});

// POST a new applicant
app.post('/applicants', (req, res) => {
    const newApplicant = req.body;
    applicants.push(newApplicant);
    fs.writeFile('applicants.json', JSON.stringify(applicants), (err) => {
        if (err) {
            console.error('Error writing to applicants data:', err);
            res.status(500).json({ error: 'Failed to add applicant' });
        } else {
            res.status(201).json(newApplicant);
        }
    });
});

// PUT/update an existing applicant
app.put('/applicants/:id', (req, res) => {
    const applicantId = req.params.id;
    const updatedApplicant = req.body;
    const index = applicants.findIndex(applicant => applicant.id === applicantId);
    if (index !== -1) {
        applicants[index] = updatedApplicant;
        fs.writeFile('applicants.json', JSON.stringify(applicants), (err) => {
            if (err) {
                console.error('Error writing to applicants data:', err);
                res.status(500).json({ error: 'Failed to update applicant' });
            } else {
                res.json(updatedApplicant);
            }
        });
    } else {
        res.status(404).json({ error: 'Applicant not found' });
    }
});

// DELETE an applicant by ID
app.delete('/applicants/:id', (req, res) => {
    const applicantId = req.params.id;
    applicants = applicants.filter(applicant => applicant.id !== applicantId);
    fs.writeFile('applicants.json', JSON.stringify(applicants), (err) => {
        if (err) {
            console.error('Error writing to applicants data:', err);
            res.status(500).json({ error: 'Failed to delete applicant' });
        } else {
            res.json({ message: 'Applicant deleted successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => console.log(`Server Listening on Port: http://localhost:${PORT}`));
