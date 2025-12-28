const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const db_url="mongodb+srv://andand1510nd_db_user:PRaixnirjM551eyD@cluster0.urwc0ed.mongodb.net/?appName=Cluster0";
const mongoose =require('mongoose');

mongoose.connect(db_url);

const Cat = mongoose.model('Cat', { name: String });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ==================== USER INTERFACE API'S ====================

app.get('/', (req, res) => {
    res.render('app.ejs');
});
app.get('/aboutus', (req, res) => {
    res.render('aboutus.ejs');
});
app.get('/map1', (req, res) => {
    res.render('map1.ejs');
});

app.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

app.get('/complaints', (req, res) => {
    res.render('complaints.ejs');
});
app.get('/home', (req, res) => {
    res.render('home.ejs');
});
app.get('/schedule_pickup', (req, res) => {
    res.render('shedule_pickup.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get('/signup', (req, res) => {
    res.render('signup.ejs');
});
app.post('/login', (req, res) => {
    const { mobileno, pass } = req.body;
    
    // Validate mobile number: exactly 10 digits
    if (!mobileno || !/^[0-9]{10}$/.test(mobileno)) {
        return res.status(400).send('Mobile number must be exactly 10 digits');
    }
    
    if (!pass) {
        return res.status(400).send('Password is required');
    }
    if(mobileno==="1234567890" && pass==="admin"){
        return res.redirect('/admin');
    }else{
        return 
    }
    
   
}) ;
app.post('/signup', (req, res) => {
    const { name, email, number, pass, conformpass } = req.body;
    if (!name || !email || !pass) {
        return res.status(400).send('Name, email and password are required');
    }
    if (pass !== conformpass) {
        return res.status(400).send('Passwords do not match');
    }

}) ;
// ==================== COMPLAINTS API ====================

// Get all complaints
app.get('/api/complaints', (req, res) => {
    const query = 'SELECT * FROM complaints ORDER BY created_at DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching complaints:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json(results || []);
    });
});

// Post a complaint
app.post('/api/complaints', (req, res) => {
    const { name, email, location, type, description } = req.body;

    if (!name || !email || !location || !type) {
        return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const query = `INSERT INTO complaints (name, email, location, type, description, status, created_at) 
                   VALUES (?, ?, ?, ?, ?, 'Pending', NOW())`;
    const values = [name, email, location, type, description || ''];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting complaint:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: result.insertId });
    });
});

// Update complaint
app.put('/api/complaints/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const query = 'UPDATE complaints SET status = ?, notes = ? WHERE id = ?';
    connection.query(query, [status, notes, id], (err) => {
        if (err) {
            console.error('Error updating complaint:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Delete complaint
app.delete('/api/complaints/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM complaints WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting complaint:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// ==================== PICKUPS API ====================

// Get all pickups
app.get('/api/pickups', (req, res) => {
    const query = 'SELECT * FROM scheduled_pickups ORDER BY created_at DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching pickups:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json(results || []);
    });
});

// Post a pickup request
app.post('/api/pickups', (req, res) => {
    const { name, address, item, day } = req.body;

    if (!name || !address || !item || !day) {
        return res.status(400).json({ success: false, error: 'Required fields missing' });
    }

    const query = `INSERT INTO scheduled_pickups (name, address, item, day, status, created_at) 
                   VALUES (?, ?, ?, ?, 'Pending', NOW())`;
    const values = [name, address, item, day];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting pickup:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true, id: result.insertId });
    });
});

// Update pickup
app.put('/api/pickups/:id', (req, res) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const query = 'UPDATE scheduled_pickups SET status = ?, notes = ? WHERE id = ?';
    connection.query(query, [status, notes, id], (err) => {
        if (err) {
            console.error('Error updating pickup:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

// Delete pickup
app.delete('/api/pickups/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM scheduled_pickups WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) {
            console.error('Error deleting pickup:', err);
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});