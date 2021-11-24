const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const jsonParser = bodyParser.json()

app.listen(3000, () => console.log('Started'))

app.use('/', express.static('app'))
app.use(session(
    {
        resave: false,
        saveUninitialized: true,
        secret: 'asdlfj903240jas'
    }
)) 

// authentication
app.post('/api/login', jsonParser, function (req, res) {
    if (req.body.username == 'bob' &&
            req.body.password == 'builder') {
        req.session.loggedin = true
        res.status(200)
    } else {
        req.session.loggedin = false
        res.status(401)
    }
    res.send('Test login')
})

app.put('/api/register', jsonParser, function (req, res) {
    console.log(req.body)
    res.status(201)
    res.send('Test register')
})

app.get('/api/isloggedin', function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200);
    } else {
        res.status(401)
    }
    res.send('Test isLoggedin')
})

app.get('/api/doesuserexist', function (req, res) {
    if(req.query.username == 'bob') {
        res.status(200)
    } else {
        res.status(204)
    }
    res.send('Test doesuserexist')
})

app.get('/api/doesemailexist', function (req, res) {
    if(req.query.email == 'bob@bob.com') {
        res.status(200)
    } else {
        res.status(204)
    }
    res.send('Test doesuserexist')
})

app.get('/api/logout', function (req, res) {
    res.status(200)
    req.session.loggedin = false
    res.send('Test logout')
})

// todo categories CRUD
app.get('/api/getcat', function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }
    res.send('Test Get categories')
})

app.put('/api/addcat', jsonParser, function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }
    res.send('Test add categories')
})

app.delete('/api/delcat/:catid', function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }    
    res.send('Test del categories')
})

app.patch('/api/updatecat/:catid', jsonParser, function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }
    res.send('Test update categories')
})

// todo list CRUD
app.get('/api/gettodos/:catid', function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }    
    res.send('Test get todos')
})

app.put('/api/addtodo', jsonParser, function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }
    res.send('Test add todo')
})

app.delete('/api/deltodo/:todoid', function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }    
    res.send('Test del todo')
})

app.patch('/api/updatetodo/:todoid', jsonParser, function (req, res) {
    if (req.session.loggedin == true) {
        res.status(200)
    } else {
        res.status(403)
    }
    res.send('Test update todo')
})

function rateLimiter({second, day, persecond, perday}){
    return async function(req, res, next){

    }
}

