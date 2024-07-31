import express from 'express';

import { createUser, getUser, CreateNewAccessCode, MiddleWareCreateNew, ValidateAccessCode } from '../Controllers/userController.js'

const router = express.Router();


router.post('/new', MiddleWareCreateNew, CreateNewAccessCode);
router.get('/:id', getUser);
router.post('/verifycode', ValidateAccessCode);


export default router;
