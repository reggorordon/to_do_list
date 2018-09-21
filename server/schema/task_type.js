const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const BreakdownType = require('./breakdown_type');
const Task = mongoose.model('task');

const TaskType = new GraphQLObjectType({
  name:  'TaskType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    breakdowns: {
      type: new GraphQLList(BreakdownType),
      resolve(parentValue) {
        return Task.findBreakdowns(parentValue.id);
      }
    }
  })
});

module.exports = TaskType;
