const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html when visiting "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
