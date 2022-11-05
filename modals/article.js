let mongoose = require('mongoose')
let Schema = mongoose.Schema

let articleSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, require: true },
    tags: [String],
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislike: { type: Number },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Article', articleSchema)
