const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const db_url="mongodb+srv://andand1510nd_db_user:PRaixnirjM551eyD@cluster0.urwc0ed.mongodb.net/citizen_data?appName=Cluster0";
const mongoose =require('mongoose');
const user=require('./models/user');



mongoose.connect(db_url);




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
app.post('/login', async (req, res) => {
    try {
        const { mobileno, pass } = req.body;

        // Validate mobile number: exactly 10 digits
        if (!mobileno || !/^[0-9]{10}$/.test(mobileno)) {
            return res.status(400).send('Mobile number must be exactly 10 digits');
        }
        if (!pass) {
            return res.status(400).send('Password is required');
        }
        if (mobileno === "1234567890" && pass === "admin") {
            return res.redirect('/admin');
        }

        const temp_user = await user.findOne({ mobileno: mobileno });
        if (!temp_user) {
            return res.status(400).send('User not found');
        }

        if (temp_user.pass == pass) {
            return res.redirect('/home');
        }

        return res.status(400).send('Incorrect password');
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).send('Server error');
    }
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, mobileno, pass, conformpass } = req.body;
        if (!name || !email || !mobileno || !pass) {
            return res.status(400).send('Name, email, mobile number and password are required');
        }
        if (pass !== conformpass) {
            return res.status(400).send('Passwords do not match');
        }

        const existing = await user.find({ mobileno: mobileno });
        if (existing.length > 0) {
            return res.status(400).send('User with this mobile number already exists');
        }

        const temp_user = new user({
            name: name,
            email: email,
            mobileno: mobileno,
            pass: pass,
            conformpass: conformpass
        });

        await temp_user.save();
        return res.redirect('/home');
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});