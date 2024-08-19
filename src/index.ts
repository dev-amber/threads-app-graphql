import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 9000;

    app.use(express.json());

    // CREATE GRAPHQL SERVER
    const gqlServer = new ApolloServer({
        typeDefs: `
        type Query {
            hello: String
            say(name:String) :String
        }
        `, // Schema
        resolvers: {
            Query: {
                hello: () => `Hey there, I am a GraphQL server`,
                say:(_,{name}:{name :string},) => `Hey ${name}, Ho are you?`,
            },
        },
    });

    // START THE GRAPHQL SERVER
    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({ message: "Server is up and running" });
    });

    app.use("/graphql", expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
}

init();
