const router = require('express').Router();
const Article = require('../models/Article');

// CRUD

// Create
router.post('/', (req, res) => {
	Article.create(req.body)
		.then((article) => {
			res.status(200).json(article);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

// Read - Get All
router.get('/', (req, res) => {
	Article.find()
		.then((articles) => {
			res.status(200).json(articles);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// Read - find one
router.get('/:articleId', (req, res) => {
	const { articleId } = req.params;
	Article.findById(articleId)
		.then((article) => {
			res.status(200).json(article);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

// Update
router.patch('/:articleId', (req, res) => {
	const { articleId } = req.params;
	Article.findByIdAndUpdate(articleId, req.body, { new: true })
		.then(({ name }) => {
			res.status(200).json('Updated successfully ' + name);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

// Delete
router.delete('/:articleId', (req, res) => {
	const { articleId } = req.params;
	Article.findByIdAndDelete(articleId)
		.then(({ name }) => {
			res.status(200).json('Deleted successfully ' + name);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

module.exports = router;
