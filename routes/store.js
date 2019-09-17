const router = require('express').Router();
const Store = require('../models/Store');
// CRUD

// Read, list all stores

router.get('/', (req, res) => {
	Store.find()
		.then((stores) => {
			res.status(200).json(stores);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

router.get('/:id', (req, res) => {
	Store.findById(req.params.id)
		.then((store) => {
			res.status(200).json(store);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

// Create, create a store
router.post('/', (req, res) => {
	Store.create({ ...req.body })
		.then((store) => {
			res.status(200).json(store);
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

// Update, update a store
router.patch('/:id', (req, res) => {
	const { id } = req.params;

	Store.findByIdAndUpdate(id, req.body, { new: true })
		.then((store) => {
			res.status(200).json(`Updated Store ${store.name}`);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

// Delete, delete a store
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	Store.findByIdAndDelete(id)
		.then((store) => {
			res.status(200).json(`Store ${store.name} was deleted`);
		})
		.catch((err) => {
			res.status(400).json('Error: ' + err);
		});
});

module.exports = router;
