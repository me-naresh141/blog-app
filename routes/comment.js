let express = require('express')
let Comment = require('../modals/comment')
let Article = require('../modals/article')
const comment = require('../modals/comment')

let router = express.Router()

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Comment.findById(id, (err, comment) => {
    if (err) return next(err)
    res.render('updateComment', { comment })
  })
})

router.post('/:id', (req, res) => {
  let id = req.params.id
  //   console.log(id)
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) return next(err)
    res.redirect('/users/' + comment.articleId)
  })
})

// delete a comment

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err)
    res.redirect('/users/' + comment.articleId)
  })
})

// like comment

router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id
  Comment.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, comment) => {
    if (err) return next(err)
    res.redirect('/users/' + comment.articleId)
  })
})

// dislike
router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id
  Comment.findById(id, (err, comment) => {
    if (comment.likes > 0) {
      Comment.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, comment) => {
        if (err) return next(err)
        res.redirect('/users/' + comment.articleId)
      })
    }
  })
})

module.exports = router
