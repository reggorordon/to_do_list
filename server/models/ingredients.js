const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: 'task'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

IngredientSchema.statics.like = function(id) {
  const Ingredient = mongoose.model('ingredient');

  return Ingredient.findById(id)
    .then(ingredient => {
      ++ingredient.likes;
      return ingredient.save();
    })
}

mongoose.model('ingredient', IngredientSchema);
