const asyncHandler = require('express-async-handler')

const Message = require('../model/messagemodel')
const User = require('../model/usermodel')

// @desc    Get Messages
// @route   GET /api/messages
// @access  Private
const getMessage = asyncHandler(async (req, res) => {
  const message = await Message.find({ user: req.user.id })

  res.status(200).json(message)
})

// @desc    Set message
// @route   POST /api/message
// @access  Private
const setMessage = asyncHandler(async (req, res) => {

  if (!req.body) {
    res.status(400)
    throw new Error('Please add input')
  }

  const message = await Message.create({
    subject: req.body.subject,
    content: req.body.content,
    isRead: req.body.isRead,
    user: req.user.id,
  })

  res.status(200).json(message)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    res.status(400)
    throw new Error('Message not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the message for the user
  if (message.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedMessage)
})

// @desc    Delete message
// @route   DELETE /api/message/:id
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id)

  if (!message) {
    res.status(400)
    throw new Error('Message not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (message.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await message.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getMessage,
  setMessage,
  updateMessage,
  deleteMessage,
}