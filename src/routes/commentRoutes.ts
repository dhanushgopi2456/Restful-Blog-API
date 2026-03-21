import express from 'express';
import {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
} from '../controllers/commentController.ts';
import { protect } from '../middlewares/auth.ts';

const router = express.Router();

router.route('/')
  .get(getComments)
  .post(protect, addComment);

router.route('/:id')
  .get(getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
