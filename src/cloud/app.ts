import * as fs from "fs";
import * as path from "path";

import { Express } from 'express';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from "graphql-tools";
import bodyParser = require("body-parser");

import * as cors from 'cors';
import { resolvers } from "./resolvers";

// import { execute, subscribe } from "graphql";
// import { createServer } from "http";
// import { SubscriptionServer } from 'subscriptions-transport-ws';

// var express = require('express');
// var app = express();
import app = global.app;

declare module global {
    const app: Express; // provided by back4app
}

const schema = makeExecutableSchema({
    // b4a deploy does not support *graphql files - so we need to add suported filetype - i.e. '.jade' when copying to build folder
    typeDefs: fs.readFileSync(path.join(__dirname, './graphql/schema.graphql.jade'), 'utf8'),
    resolvers
});

app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({
    // subscriptionsEndpoint: 'ws://seaas-test.back4app.io:80/subscriptions',
    endpointURL: '/graphql'
}));

// const ws = createServer(app);
// ws.listen(80, () => {
//     console.log(`Apollo Server is now running on wss://seaas-test.back4app.io:80/subscriptions`);
//     // Set up the WebSocket for handling GraphQL subscriptions
//     new SubscriptionServer({
//         execute,
//         subscribe,
//         schema
//     }, {
//         server: ws,
//         path: '/subscriptions',
//     });
// });
