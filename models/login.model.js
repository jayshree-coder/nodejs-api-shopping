const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // Set a default role as "user"
    isAdmin: { type: Boolean, default: false }, // Add an "isAdmin" field with default as false
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // Exclude password from the response
      },
    },
  }
);

module.exports = mongoose.model('User', userSchema);