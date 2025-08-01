import express from 'express';
import { getAllInterns, getInternById } from '../controllers/internController.js';

const router = express.Router();

router.get('/', getAllInterns);
router.get('/:id', getInternById);

export default router;
