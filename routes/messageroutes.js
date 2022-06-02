const express = require('express')
const router = express.Router()
const {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/messagecontroller')

const { protect } = require('../middlewares/authmiddleware')

router.route('/').get(protect, getMessage).post(protect, setMessage)
router.route('/:id').delete(protect, deleteMessage).put(protect, updateMessage)

module.exports = router