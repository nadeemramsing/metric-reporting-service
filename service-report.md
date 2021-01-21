# Introduction
While the basic implementation was simple, I focused on other things such as security, validation,  testability and performance. I chose Amazon AWS Lambda as deployment platform as Deep Consulting Solutions is already making use of it and it would be a plus for me to learn it beforehand. It was relatively easy to use. 

While it is heavy compared to the likes of Fastify, I chose ExpressJS to showcase my existing skills in routing, middleware, etc. My service design however is not optimized for Amazon AWS Lambda, as I believe some features such as helmet and cors middlewares should be handled in a top layer of my microservice, i.e. in Amazon AWS Lambda. Ideally in production, I would use jeremydaly/lambda-api just so that the size of the service remains minimal and app start would be faster. The module jeremydaly/lambda-api achieves it by discarding dependencies in node_modules. 

A fast start is encouraged in Amazon AWS Lambda, as lambda functions are normally halted after a period of inactivity. As a workaround to prevent cold starts, the plugin juanjoDiaz/serverless-plugin-warmup can be used.

# Project Structure

# Routing

# Controller

# Store/Data Structure

# Security

# Validation

# Testing

# Performance

# Deployment
