import { defaultFieldResolver } from "graphql";


// -----
const { mapSchema, getDirective, MapperKind } = require("@graphql-tools/utils");
// const { defaultFieldResolver } = require("graphql");
const { ApolloError } = require("apollo-server-express");

function AuthorizationDirective(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_TYPE]: (fieldConfig, _fieldName, typeName) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName);

      if (authDirective && authDirective.length) {
        const requiredRoles = authDirective[0].requires;

        if (requiredRoles && requiredRoles.length) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async function (...args) {
            
            if (context.isAuth) {
              const result = await resolve.apply(this, args);
              return result;
            } else {
              throw new ApolloError("Not authenticated", 401);
            }
            
            return resolve(...args);

            // if (requiredRoles.includes('PUBLIC')) {
            //   console.log(`==> ${context.code || 'ANONYMOUS'} ACCESSING PUBLIC RESOLVER: ${info.fieldName}`);
            //   logging(context, info.fieldName, args);

            //   return resolve(source, args, context, info);
            // }

            // if (!requiredRoles.includes(context.code)) {
            //   throw new ApolloError('NOT AUTHORIZED', 'NO_AUTH');
            // }
            // console.log(`==> ${context.code} ACCESSING PRIVATE RESOLVER: ${info.fieldName}`);
            // logging(context, info.fieldName, args);

            // return resolve(source, args, context, info);
          };

          return fieldConfig;
        }
      }
    },
  });
}

module.exports = AuthorizationDirective;
