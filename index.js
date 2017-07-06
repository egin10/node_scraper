const express = require('express');
const swig = require('swig');
const path = require('path');

const app = express();

app.engine('html', swig.compileFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'bootstrap')));

app.get('/', (req, res) => {
    res.render('index');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});