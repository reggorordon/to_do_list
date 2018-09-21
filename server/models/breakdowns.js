const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BreakdownSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

BreakdownSchema.statics.like = function(id) {
  const Breakdown = mongoose.model('breakdown');

  return Breakdown.findById(id)
    .then(breakdown => {
      ++breakdown.likes;
      return breakdown.save();
    })
}

mongoose.model('breakdown', BreakdownSchema);
