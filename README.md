this is a simple boilerplate to run GraphQL project as a cloud code on back4app. 
It is set-up to use typescript which also enables ES6 syntax (while it's transpiled to ES5 supported by back4app node)    

minimum config required to set up GraphQL is as simple as:

provide a `package.json` located in `cloud`
```json
{
  "dependencies": {
    "graphql": "0.13.1",
    "graphql-tools": "^3.0.1",
    "apollo-server-express": "1.3.6",
   }
}
```

and `app.js` also in `cloud`:
```javascript
var fs = require("fs");
var path = require("path");

var apollo_server_express = require("apollo-server-express");
var graphql_tools = require("graphql-tools");
var bodyParser = require("body-parser");
var cors = require("cors");
var resolvers = {
    Query: {
        hello() { return "Hello world!"; }
    }
};

var schema = graphql_tools.makeExecutableSchema({
    typeDefs: fs.readFileSync(path.join(__dirname, './graphql/schema.graphql'), 'utf8'),
    resolvers: resolvers
});

app.use('/graphql', cors(), bodyParser.json(), apollo_server_express.graphqlExpress({ schema: schema }));
app.use('/graphiql', apollo_server_express.graphiqlExpress({
    // subscriptionsEndpoint: 'ws://seaas-test.back4app.io:80/subscriptions',
    endpointURL: '/graphql'
}));
```

together with `schema.graphql` in `cloud/graphql/`
```graphql
schema {
    query: Query
}

type Query {
    hello: String!
}
```

these three files should be enough to have GraphQL set up. 

To have make use of this boilerplate quickly you can run `npm i`, `npm run build` and then upload `build/cloud` folder using Dashboard -> Server Settings -> Cloud Code panel.

To make the process automated we may follow the https://docs.back4app.com/docs/integrations/command-line-interface/creating-a-parse-app/ with one important remark - as we need to deploy cloud code from build folder - we need to copy generated `.parse.local` and `.parse.project` to `build` folder so the `npm run deploy` can upload just the generated code to your app.  