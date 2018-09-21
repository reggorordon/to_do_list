const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Task = mongoose.model('task');
const Breakdown = mongoose.model('breakdown');
const TaskType = require('./task_type');
const BreakdownType = require('./breakdown_type');

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
    addBreakdownToTask: {
      type: TaskType,
      args: {
        content: { type: GraphQLString },
        taskId: { type: GraphQLID }
      },
      resolve(parentValue, { content, taskId }) {
        return Task.addBreakdown(taskId, content);
      }
    },
    likeBreakdown: {
      type: BreakdownType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Breakdown.like(id);
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
