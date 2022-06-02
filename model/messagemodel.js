const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema (
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subject: {
        type: String,
        required: [true, 'Please add a message subject']
        
    },
    content: {
        type: String,
        required: [true, 'Please add a message content']
        
       
    },
    isRead: {
        type: Boolean,
        required: [true, 'Please add a message status']
        
    },
    
},
{
    timestamps: true,
  })

module.exports = mongoose.model('Message', MessageSchema)