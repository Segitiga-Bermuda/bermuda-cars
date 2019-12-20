const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    jwt = require('express-jwt'),
    {
        PORT,
        JWT_SECRET_KEY
    } = require('./config')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
    jwt({ secret: JWT_SECRET_KEY }).unless({
        path: [
            {
                url: '/',
                method: ['GET']
            },
            {
                url: '/admins/log-in',
                method: ['POST']
            },
            {
                url: '/executives/log-in',
                method: ['POST']
            },
            {
                url: '/employees/log-in',
                method: ['POST']
            },
            {
                url: '/users/log-in',
                method: ['POST']
            },
            {
                url: '/users/register',
                method: ['POST']
            }
        ]
    })
)
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            message: 'You are not allowed to enter this endpoints.'
        })
    }

    next()
})

app.use('/users', require('./routes/users'))
app.use('/admins', require('./routes/admins'))
app.use('/executives', require('./routes/executives'))
app.use('/employees', require('./routes/employees'))
app.use('/tasks', require('./routes/tasks'))
app.use('/inventory', require('./routes/inventory'))
app.use('/attreport', require('./routes/attendanceReports'))
app.use('/sales', require('./routes/sales'))



app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Bermuda Triangle Cars API.'
    })
})

app.listen(PORT, () => {
    console.log(`This app is listening on port ${PORT}.`)
})