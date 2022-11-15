const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { schema, Mutation } = require('./schema/schema');
const lodash = require('lodash');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://muser:root@cluster0.t6a9oqo.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.once('open', () =>
  console.log('connected to database')
  );

app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.use(cors());
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});
