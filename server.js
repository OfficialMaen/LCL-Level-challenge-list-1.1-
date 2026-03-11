// Simple Node.js server for syncing localStorage across browsers
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const DATA_FILE = path.join(__dirname, 'lcl_data.json');
const PORT = 3000;

// Initialize data file if it doesn't exist
function initializeDataFile() {
    if (!fs.existsSync(DATA_FILE)) {
        const defaultData = {
            users: [
                {
                    id: 'admin1',
                    email: 'maencopra@gmail.com',
                    displayName: 'Admin',
                    password: 'maenissocool12345gGs',
                    isAdmin: true
                }
            ],
            levels: [
                {
                    id: 1,
                    name: 'Stereo Madness',
                    levelId: 1,
                    url: 'https://example.com/level1',
                    youtubeUrl: 'https://youtube.com/watch?v=example1',
                    thumbnail: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%234a90e2%22 width=%22300%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22white%22 font-size=%2220%22%3EStereo Madness%3C/text%3E%3C/svg%3E',
                    difficulty: 'Easy',
                    submittedBy: 'Admin',
                    submittedDate: new Date().toISOString(),
                    status: 'approved'
                }
            ],
            pendingLevels: [],
            settings: {
                theme: 'dark',
                language: 'en',
                darkBackground: true
            }
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
        console.log('✅ Data file created at:', DATA_FILE);
    }
}

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// API Routes
app.get('/api/data', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Failed to read data' });
    }
});

app.post('/api/data', (req, res) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
        console.log('✅ Data saved at:', new Date().toLocaleTimeString());
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.get('/api/data-file-location', (req, res) => {
    res.json({ location: DATA_FILE });
});

// Start server
initializeDataFile();
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║  LCL - Level Challenge List Server     ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  🚀 Server running on:                 ║`);
    console.log(`║  http://localhost:${PORT}                       ║`);
    console.log('║                                        ║');
    console.log('║  📍 Open in all browsers:              ║');
    console.log(`║  Edge: http://localhost:${PORT}         ║`);
    console.log(`║  Brave: http://localhost:${PORT}        ║`);
    console.log(`║  Chrome: http://localhost:${PORT}       ║`);
    console.log('║                                        ║');
    console.log('║  💾 Data file:                         ║');
    console.log(`║  ${DATA_FILE}                          ║`);
    console.log('║                                        ║');
    console.log('║  ✅ All data is shared across browsers! ║');
    console.log('║  Press Ctrl+C to stop server           ║');
    console.log('╚════════════════════════════════════════╝');
});
