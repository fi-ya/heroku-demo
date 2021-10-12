const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

const home = require('./routes/home.js');
const logIn = require('./routes/logIn.js');
const signUp = require('./routes/signUp.js');
const logOut = require('./routes/logOut.js');
const posts = require('./routes/posts.js');

const server = express();

server.use(express.urlencoded({ extended: false }));

// COOKIE_SECRET lives in .env to stop it ending up on GitHub
// it is used to sign cookies so we can trust them
server.use(cookieParser(process.env.COOKIE_SECRET));

server.get('/', home.get);

server.get('/sign-up', signUp.get);
server.post('/sign-up', signUp.post);

server.get('/log-in', logIn.get);
server.post('/log-in', logIn.post);

server.post('/log-out', logOut.post);

server.get('/posts', posts.get);
server.post('/posts', posts.post);

server.post('/delete-post', posts.deletePost);

server.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>');
});

const PORT = process.env.PORT || 3000;

process.on('unhandledRejection', (error) => {
  console.error(error);
  process.exit(1);
});

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
