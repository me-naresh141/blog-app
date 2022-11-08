let mongoose = require('mongoose')
let Schema = mongoose.Schema

let commentSchema = new Schema(
  {
    content: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    likes: { type: Number, default: 0 },
    dislike: { type: Number },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Comment', commentSchema)


