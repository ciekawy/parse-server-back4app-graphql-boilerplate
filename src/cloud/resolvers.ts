import { IEnumResolver, IFieldResolver } from "graphql-tools";
import * as Parse from "parse/node";

(Parse.User as any).enableUnsafeCurrentUser();

const Role = Parse.Object.extend('_Role');
const roleQuery = new Parse.Query(Role); // result of ruleQuery.find() can be returned in resolvers as a promise

export const resolvers: {[key:string]: {[key:string]: IFieldResolver<any, any>}|IEnumResolver} = {
    Query: {
        hello: () => "Hello world!"
    }
};