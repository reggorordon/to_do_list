const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Breakdown = mongoose.model('breakdown');

const BreakdownType = new GraphQLObjectType({
  name:  'BreakdownType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    task : {
      type: require('./task_type'),
      resolve(parentValue) {
        return Breakdown.findById(parentValue).populate('task')
          .then(breakdown => {
            console.log(breakdown)
            return breakdown.task
          });
      }
    }
  })
});

module.exports = BreakdownType;
