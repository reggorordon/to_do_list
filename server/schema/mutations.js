const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Task = mongoose.model('task');
const Ingredient = mongoose.model('ingredient');
const TaskType = require('./task_type');
const IngredientType = require('./ingredient_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Task({ title })).save()
      }
    },
    addIngredientToTask: {
      type: TaskType,
      args: {
        content: { type: GraphQLString },
        taskId: { type: GraphQLID }
      },
      resolve(parentValue, { content, taskId }) {
        return Task.addIngredient(taskId, content);
      }
    },
    likeIngredient: {
      type: IngredientType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Ingredient.like(id);
      }
    },

    deleteTask: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Task.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;
