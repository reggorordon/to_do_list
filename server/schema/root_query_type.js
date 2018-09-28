const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const TaskType = require('./task_type');
const BreakdownType = require('./breakdown_type');
const Breakdown = mongoose.model('breakdown');
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
    breakdown: {
      type: BreakdownType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Breakdown.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
