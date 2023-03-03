import express from 'express';
import bodyParser from 'body-parser';
import moviePageRoutes from './routes/moviePage.js';
import homePageRoutes from './routes/homePage.js';

const app = express();

app.use(bodyParser.json());

// ↓ ↓  --/--   ↓ ↓
app.use('/', homePageRoutes);

// ↓ ↓  --/movie--   ↓ ↓
app.use('/movie', moviePageRoutes);

export default app;
