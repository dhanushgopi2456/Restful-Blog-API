import { Response } from 'express';
import Post from '../models/Post.ts';
import asyncHandler from '../utils/asyncHandler.ts';
import { AuthRequest } from '../middlewares/auth.ts';

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
export const getPosts = asyncHandler(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;

  const posts = await Post.find()
    .populate('author', 'username')
    .skip(startIndex)
    .limit(limit);

  const total = await Post.countDocuments();

  res.status(200).json({
    success: true,
    count: posts.length,
    pagination: {
      total,
      page,
      limit,
    },
    data: posts,
  });
});

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username')
    .populate({
      path: 'comments',
      populate: { path: 'author', select: 'username' }
    });

  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  res.status(200).json({ success: true, data: post });
});

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Private
export const createPost = asyncHandler(async (req: AuthRequest, res: Response) => {
  req.body.author = req.user.id;

  const post = await Post.create(req.body);

  res.status(201).json({ success: true, data: post });
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  // Make sure user is post owner
  if (post.author.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized to update this post' });
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: post });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' });
  }

  // Make sure user is post owner
  if (post.author.toString() !== req.user.id) {
    return res.status(401).json({ success: false, error: 'Not authorized to delete this post' });
  }

  await post.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
