import { Response } from 'express';
import Comment from '../models/Comment.ts';
import Post from '../models/Post.ts';
import asyncHandler from '../utils/asyncHandler.ts';
import { AuthRequest } from '../middlewares/auth.ts';

// @desc    Get comments for a post
// @route   GET /api/v1/comments?post_id=ID
// @access  Public
export const getComments = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { post_id } = req.query;

  if (!post_id) {
    return res.status(400).json({ success: false, error: 'Please provide a post_id' });
  }

  const comments = await Comment.find({ post: post_id }).populate('author', 'username');

  res.status(200).json({ success: true, count: comments.length, data: comments });
});

// @desc    Get single comment
// @route   GET /api/v1/comments/:id
// @access  Public
export const getComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.id).populate('author', 'username');

  if (!comment) {
    return res.status(404).json({ success: false, error: 'Comment not found' });
  }

  res.status(200).json({ success: true, data: comment });
});

// @desc    Add comment
// @route   POST /api/v1/comments
// @access  Private
export const addComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { post_id, content } = req.body;

  if (!post_id) {
    return res.status(400).json({ success: false, error: 'Please provide a post_id' });
  }

  const post = await Post.findById(post_id);

  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  const comment = await Comment.create({
    content,
    post: post_id,
    author: req.user.id,
  });

  res.status(201).json({ success: true, data: comment });
});

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ success: false, error: 'Comment not found' });
  }

  // Make sure user is comment owner
  if (comment.author.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized to update this comment' });
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, { content: req.body.content }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: comment });
});

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return res.status(404).json({ success: false, error: 'Comment not found' });
  }

  // Make sure user is comment owner
  if (comment.author.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized to delete this comment' });
  }

  await comment.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
