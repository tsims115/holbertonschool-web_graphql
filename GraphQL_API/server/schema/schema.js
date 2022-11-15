const Project =  require('../models/project');
const Task =  require('../models/task');
const { GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, GraphQLNonNull } = require('graphql');
const lodash = require('lodash');
const mongoose = require('mongoose');


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: async (parent, args) => {
        return await Task.findOne().where("_id").equals(args.id).exec();
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: {type: GraphQLString}
      },
      resolve: async (parent, args) => {
        return await Project.findOne().where("_id").equals(args.id).exec();
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve: async () => await Task.find().exec(),
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: async () => await Project.find().exec(),
    }
  }),
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: { 
      type: ProjectType,
      resolve: async (parent, args) => {
        return await Project.find().where("_id").equals(parent.id).exec();
      }
     },
  }),
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    task: {
      type: TaskType,
      resolve: async () => {
        return await Task.find().where("_id").equals(parent.id).exec();
        }
    },
  })
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const newProject = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description, 
        });
        newProject.save(function (err, project) {
          if (err) return console.error(err);
          console.log(project.title + " saved to project collection.");
        });
        return newProject;
      },
    },
    addTask: {
      type: TaskType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const newTask = new Task({
          title: args.title,
          weight: args.weight,
          description: args.description, 
        });
        newTask.save(function (err, task) {
          if (err) return console.error(err);
          console.log(task.title + " saved to task collection.");
        });
        return newTask;
      },
    }
  })
});

module.exports = {
  schema: new GraphQLSchema({
    mutation: Mutation,
    query: RootQuery,
  }),
};
