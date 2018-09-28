const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  breakdowns: [{
    type: Schema.Types.ObjectId,
    ref: 'breakdown'
  }]
});

TaskSchema.statics.addBreakdown = function(id, content) {
  const Breakdown = mongoose.model('breakdown');

  return this.findById(id)
    .then(task => {
      const breakdown = new Breakdown({ content, task })
      task.breakdowns =task.breakdowns.concat(breakdown)
      return Promise.all([breakdown.save(), task.save()])
        .then(([breakdown, task]) => task);
    });
}

TaskSchema.statics.findBreakdowns = function(id) {
  return this.findById(id)
    .populate('breakdowns')
    .then(task => task.breakdowns);
}

mongoose.model('task', TaskSchema);
