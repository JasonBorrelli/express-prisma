import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();


router.get('/',(req,res) => {
    res.send('list of books');
});

export default router;

