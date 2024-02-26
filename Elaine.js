const mysql = require('mysql');
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require ('fs');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

// Connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

connection.query('DROP DATABASE IF EXISTS 499HousingP');

connection.query(`CREATE DATABASE IF NOT EXISTS 499HousingP`);

connection.query('USE 499HousingP');

connection.query('CREATE TABLE IF NOT EXISTS students (' +
    'uid VARCHAR(5) UNIQUE NOT NULL, ' +
    'fName VARCHAR(255) NOT NULL, ' +
    'lName VARCHAR(255) NOT NULL, ' +
    'phone VARCHAR(255) NOT NULL, ' +
    'password VARCHAR(255) NOT NULL, ' +
    'address VARCHAR(255), ' +
    'studentID INTEGER, ' +
    'gradYear INTEGER, ' +
    'program VARCHAR(255), ' +
    'PRIMARY KEY(uid)' +
    ');');

connection.query('CREATE TABLE IF NOT EXISTS groups (' +
    'gid VARCHAR(4) UNIQUE NOT NULL,' +
    'type VARCHAR(255),' +
    'bedroom INTEGER,' +
    'bathroom INTEGER,' +
    'parking INTEGER,' +
    'laundry VARCHAR(255),' +
    'lowerBound FLOAT(5, 2),' +
    'upperBound FLOAT(5, 2),' +
    'accessibility BOOLEAN,' +
    'PRIMARY KEY(gid),' +
    'UNIQUE (gid)' +
    ');');

connection.query('CREATE TABLE IF NOT EXISTS grouping (' +
    'mid INTEGER NOT NULL AUTO_INCREMENT,' +
    'gid VARCHAR(4) NOT NULL,' +
    'uid VARCHAR(5) NOT NULL,' +
    'PRIMARY KEY (mid),' +
    'FOREIGN KEY (gid) REFERENCES groups(gid),' +
    'FOREIGN KEY (uid) REFERENCES students(uid)' +
    ');');

console.log("AAA");

function generateRandomUID() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 2; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 3; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function generateUniqueUID(existingUIDs) {
    let uniqueUID = generateRandomUID();
    while (existingUIDs.includes(uniqueUID)) {
        uniqueUID = generateRandomUID();
    }
    return uniqueUID;
}

function generateRandomGID() {
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
}

function generateUniqueGID(existingGIDs){
    let uniqueGID = generateRandomGID();
    while (existingGIDs.includes(uniqueGID)) {
        uniqueGID = generateRandomGID();
    }
    return uniqueGID;
}

connection.query('INSERT INTO `students` (uid, fName, lName, phone, password, address, studentID, gradYear, program) ' +
    'VALUES ("aa000", "Elaine", "Wu", "5489899512", "Wyx_20020803", "333 University Avenue", 20198899, 2025, "Computer Science")');
connection.query('INSERT INTO `groups` (gid) ' +
    'VALUES ("0000");');
connection.query('INSERT INTO `grouping` (gid, uid) ' +
    'VALUES ("0000", "aa000");');
connection.query('INSERT INTO `students` (uid, fName, lName, phone, password, address, studentID, gradYear, program) ' +
    'VALUES ("aa001", "Evelyn", "Fan", "3433433433", "Fxr_20020130", "333 University Avenue", 20202020, 2025, "Education");');

app.get('/dashboard.html', function (req, res, next) {
    // if (req.session.uid) {
    console.log("dashboard-get");
    let UID;
    try {
        UID = req.session.uid;
    }
    catch(err){
        UID = "aa000";
    }
    finally {
        connection.query('SELECT * FROM students ' +
            'JOIN grouping ON grouping.uid=students.uid ' +
            'JOIN groups ON grouping.gid=groups.gid ' +
            'WHERE students.uid=? LIMIT 1', [UID], (err, results) => {
            if (err) throw err;
            console.log("${UID}");
            const student = results[0];
            let members = null;
            if (!student.gid === null){
                connection.query('SELECT * FROM students' +
                    'JOIN grouping ON grouping.uid = students.uid ' +
                    'JOIN groups ON grouping.gid=groups.gid ' +
                    'WHERE groups.gid=?', [student.gid], (err, results) => {
                    if (err) throw err;
                    members = results;
                })
            }
            console.log(student, members);
            res.next(student, members);
        });
    }
    // }
    // else {
    //     res.redirect('/login');
    // }
});

app.post('/dashboard', async (req, res) => {
    connection.query("SELECT gid FROM `groups`", (err, results) => {
        if (err) throw err;
        existingGIDs = results.map(result => result.gid);
        let GID = generateUniqueGID(existingGIDs);
        connection.query("INSERT INTO `groups` (gid) VALUES (?)", [GID], (err) => {
            if (err) throw err;
            connection.query("INSERT INTO `grouping` (gid, uid) VALUES (?, ?)", [GID, UID], (err) => {
                if (err) throw err;
            })
            res.redirect('/dashboard?created')
        });
    })
})

app.get('/modify-group')

app.post('/modify-group', async (req, res) => {
    const UID = req.session.uid;
    connection.query('SELECT * FROM `grouping` ' +
        'JOIN `groups` ON `grouping`.gid = `groups`.gid ' +
        'JOIN `students` ON `grouping`.uid = students.uid ' +
        'WHERE grouping.uid=? LIMIT 1', [UID], (err, results) => {
        if (err) throw err;
        const item = results[0];
        const dict = {
            "type": req.body.roomType,
            "bedroom": req.body.bedroom,
            "bathroom": req.body.bathroom,
            "parking": req.body.parking,
            "laundry": req.body.laundry,
            "lowerBound": req.body.lBound,
            "upperBound": req.body.uBound,
            "accessibility": req.body.accessibility
        };
        let message = "";
        for (const [key, value] of Object.entries(dict)) {
            if (value !== null) {
                connection.query('UPDATE `groups` SET ?=? WHERE gid=?', [key, value, item.gid], (err) => {
                    if (err) throw err;
                    message += `Updated ${key}.`;
                })
            }
        }
        if (message !== '') {
            res.redirect('/dashboard?changed');
        } else {
            res.redirect('/dashboard?canceled');
        }
    });
})

app.post('/member', async (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const phone = req.body.phone;
    let statement = "";
    if (fName !== null) {
        statement += `fName LIKE ${fName} AND`;
    }
    if (lName !== null) {
        statement += `lName LIKE ${lName} AND`;
    }
    if (phone !== null) {
        statement += `phone LIKE ${phone} AND`;
    }
    console.log(statement);
    if (statement.length === 0){
        res.redirect('/member?null');
    }
    connection.query('SELECT * FROM students ' +
        'LEFT JOIN `grouping` ON students.uid = `grouping`.uid ' +
        'WHERE ? grouping.gid=NULL', [statement], (err, results) => {
        if (err) throw err;
        const students = results;
        res.render('search-result', { students });
    });
})
