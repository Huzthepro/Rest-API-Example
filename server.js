import app from './index.js';

const PORT = process.env.PORT || 3000;
//Set the server to listen port
app.listen(PORT, () => { console.log(`Server start listening port:${PORT}`);});
