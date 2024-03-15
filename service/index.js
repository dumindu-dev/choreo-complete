const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use((req, res, next) => {
    console.log('Headers:');
    console.log(req.headers);
    console.log('Cookies:');
    console.log(req.cookies);
    next();
});

app.get('/data', (req, res) => {
    res.set('Content-Type', 'text/plain');
    
    // Send headers
    res.write('Headers:\n');
    res.write(JSON.stringify(req.headers, null, 2) + '\n\n');
    
    // Send cookies
    res.write('Cookies:\n');
    res.write(JSON.stringify(req.cookies, null, 2));
    
    // End response
    res.end();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
