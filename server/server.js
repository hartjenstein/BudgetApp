const path = require('path');
const express = require('express');
const app = express();
//__dirname = current directory
const publicPath = path.join (__dirname,'..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//if the path is not a match serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
})