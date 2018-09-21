const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const IngredientType = require('./ingredient_type');
const Task = mongoose.model('task');

const TaskType = new GraphQLObjectType({
  name:  'TaskType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve(parentValue) {
        return Task.findIngredients(parentValue.id);
      }
    }
  })
});

module.exports = TaskType;
