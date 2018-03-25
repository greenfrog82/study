const express = require('express')
const path = require('path')
const app = express()

const clientPath = '/develop/html_css/what_is_the_question_mark_with_filename/src/';

app.use('/', express.static(clientPath));
app.get(
    '/', 
    (req, res) => {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
);

app.listen(8080, () => console.log('Example app listening on port 8080!'))