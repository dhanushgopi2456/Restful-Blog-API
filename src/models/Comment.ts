import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  post: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  content: {
    type: String,
    required: [true, 'Please add a comment content'],
    maxlength: [500, 'Comment cannot be more than 500 characters'],
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IComment>('Comment', CommentSchema);
