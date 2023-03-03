import express from 'express';
import { getPage } from '../controllers/homePage.js';

const router = express.Router();

//Get Home Page
router.get('/', getPage);

export default router;
