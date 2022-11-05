const { application } = require('express')
var express = require('express')
const article = require('../modals/article')
var router = express.Router()
let Article = require('../modals/article')

/* GET users listing. */
router.get('/', function (req, res, next) {
  Article.find({}, (err, article) => {
    if (err) return next(err)
    res.render('articlelist', { article })
  })
})

router.get('/new', function (req, res, next) {
  res.render('form')
})

router.post('/', function (req, res, next) {
  Article.create(req.body, (err, article) => {
    if (err) return next(err)
    Article.find({}, (err, article) => {
      if (err) return next(err)
      res.render('articlelist', { article })
    })
  })
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, author) => {
    if (err) return next(err)
    res.render('singalarticle', { author: author })
  })
})

// update
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, author) => {
    if (err) return next(err)
    res.render('editform', { author: author })
  })
})

router.post('/:id', (req, res, next) => {
  let id = req.params.id
  Article.findByIdAndUpdate(id, req.body, (err, author) => {
    if (err) return next(err)
    res.redirect('/users/' + id)
  })
})

// delete

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id
  Article.findByIdAndDelete(id, (err, article) => {
    Article.find({}, (err, article) => {
      if (err) return next(err)
      res.render('articlelist', { article })
    })
  })
})

// like
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err)
    res.redirect('/users/' + id)
  })
})

//dislike
router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id
  Article.findById(id, (err, article) => {
    if (article.likes > 0) {
      Article.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, article) => {
        if (err) return next(err)
        res.redirect('/users/' + id)
      })
    }
  })
})

module.exports = router
