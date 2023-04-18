const express = require('express');
const path = require('path');
const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, 'html')));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})