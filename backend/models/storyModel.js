import mongoose, { Schema } from "mongoose";

const storySchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  story: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Story = mongoose.model('Story', storySchema);

export default Story
