const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    ref: 'ingredient'
  }]
});

TaskSchema.statics.addIngredient = function(id, content) {
  const Ingredient = mongoose.model('ingredient');

  return this.findById(id)
    .then(task => {
      const ingredient = new Ingredient({ content, task })
      task.ingredients =task.ingredients.concat(ingredient)
      return Promise.all([ingredient.save(), task.save()])
        .then(([ingredient, task]) => task);
    });
}

TaskSchema.statics.findIngredients = function(id) {
  return this.findById(id)
    .populate('ingredients')
    .then(task => task.ingredients);
}

mongoose.model('task', TaskSchema);
