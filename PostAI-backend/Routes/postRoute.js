import express from 'express';

import { GeneratePostCaptions, SaveGeneratedContent, GetPostIdeas, CreateCaptionsFromIdeas, GetUserGeneratedContents, deletePost } from '../Controllers/postController.js'

const router = express.Router();


router.post('/gen', GeneratePostCaptions);
router.post('/gen-from-idea', CreateCaptionsFromIdeas);
router.post('/new', SaveGeneratedContent);
router.post('/genfrom-inspired', GetPostIdeas);
router.get('/:uid', GetUserGeneratedContents);
router.delete('/delete/:id', deletePost);

export default router;
