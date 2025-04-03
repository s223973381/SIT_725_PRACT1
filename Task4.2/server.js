const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

// MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/mydatabase'; // Change "mydatabase" to your DB name

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose Schema
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Project', ProjectSchema);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when visiting "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to fetch projects from MongoDB
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Error fetching projects", error });
    }
});

const newProject = new Project({
    title: "Sample Project",
    image: "https://example.com/image.jpg",
    link: "https://example.com",
    description: "Testing database visibility"
});

newProject.save()
    .then(() => console.log("✅ Sample project added to MongoDB"))
    .catch(err => console.error("❌ Error inserting project:", err));

