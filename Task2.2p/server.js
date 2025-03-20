const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
// Endpoint to add two numbers
app.get('/add', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let sum = num1 + num2;
    res.json({ result: sum });
});

app.use(express.json());

app.post('/add', (req, res) => {
    let { num1, num2 } = req.body;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let sum = num1 + num2;
    res.json({ result: sum });
});
app.get('/calculate', (req, res) => {
    let num1 = parseFloat(req.query.num1);
    let num2 = parseFloat(req.query.num2);
    let operation = req.query.operation;

    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid numbers provided" });
    }

    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
            break;
        default:
            return res.status(400).json({ error: "Invalid operation" });
    }

    res.json({ result });
});

