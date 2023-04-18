const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log('Server running on port ', PORT);
})