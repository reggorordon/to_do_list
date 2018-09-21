const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Ingredient = mongoose.model('ingredient');

const IngredientType = new GraphQLObjectType({
  name:  'IngredientType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    task : {
      type: require('./task_type'),
      resolve(parentValue) {
        return Ingredient.findById(parentValue).populate('task')
          .then(ingredient => {
            console.log(ingredient)
            return ingredient.task
          });
      }
    }
  })
});

module.exports = IngredientType;
