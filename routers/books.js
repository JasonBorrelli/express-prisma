import express from "express";                  // importa express                          
import prisma from "../lib/prisma.js";         // importa prisma 
import { index, show, store, update, destroy } from "../controllers/bookController.js"; 

const router = express.Router();


router.get('/', index);

router.get( '/:id', show);


router.patch('/:id',update);

router.post('/', store);

router.delete('/:id', destroy);

export default router;

