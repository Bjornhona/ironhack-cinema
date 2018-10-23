const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema ({
    userName : String,
    favorites: [{
      type: ObjectId,
      ref: 'Movie'
    }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  // const userSchema = new Schema({
  //   username: {
  //     type: String,
  //     required: true
  //   },
  //   password: {
  //     type: String,
  //     required: true
  //   }
  // }, {
  //   timestamps: true
  // });


const User = mongoose.model('User', userSchema);

module.exports = User;