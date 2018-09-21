const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const TaskType = require('./task_type');
const IngredientType = require('./ingredient_type');
const Ingredient = mongoose.model('ingredient');
const Task = mongoose.model('task');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find({});
      }
    },
    task: {
      type: TaskType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Task.findById(id);
      }
    },
    Ingredient: {
      type: IngredientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Ingredient.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
