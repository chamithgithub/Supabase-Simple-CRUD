const express = require('express');
const router = express.Router();
const multer = require('multer');
const itemController = require('../controllers/itemController');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', upload.single('image'), itemController.createItemWithImage);
router.put('/:id', upload.single('image'), itemController.updateItemWithImage);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
