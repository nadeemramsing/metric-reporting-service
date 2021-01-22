# Introduction
While the basic implementation was simple, I focused on other things such as security, validation,  testability and performance. I chose Amazon AWS Lambda as deployment platform as Deep Consulting Solutions is already making use of it and it would be a plus for me to learn it beforehand. It was relatively easy to use. 

While it is heavy compared to the likes of Fastify, I chose ExpressJS to showcase my existing skills in routing, middleware, etc. My service design however is not optimized for Amazon AWS Lambda, as I believe some features such as helmet and cors middlewares should be handled in a top layer of my microservice, i.e. in Amazon AWS Lambda. Ideally in production, I would use jeremydaly/lambda-api just so that the size of the service remains minimal and app start would be faster. The module jeremydaly/lambda-api achieves it by discarding dependencies in node_modules. 

A fast start is encouraged in Amazon AWS Lambda, as lambda functions are normally halted after a period of inactivity. As a workaround to prevent cold starts, the plugin juanjoDiaz/serverless-plugin-warmup can be used.

# Project Structure

# Routing

# Controller

# Store/Data Structure
In Typescript, the definition of the store would be as follows:
```
interface Store {
    [key: string]: {
        value: number,
        date: number
    }[]
}
```

The store has been used as a **Singleton** by exporting an instance of it.

For the date, rather than using the type **Date**, **number** was used.
*Reasons:* 
- A date would contain too many irrelevant, unnecessary information (such as year, month, day, seconds, timezone)
- We are only interested in the **hour and minute** parts of a date *(performance optimization)*
- A cron job executed at every 1 minute by default was used to discard of any values that trespassed the 1 hour line *(performance optimization)*

The conversion from Date to Number:

The cron job:

Here are the methods implemented in the store:
```
    postValue(key, value, date = convertDateToNumber(new Date()))

    getSumByKey(key)

    removeExpiredValues()

    contains(key, value, date)

    initArrayByKey(key)
```

### Basic algorithm of each:
postValue:

getSumByKey:

removeExpiredValues:

contains:

initArrayByKey:

# Security

# Validation

# Testing
Jest was used for testing.

## Unit Testing
### Store
```
for (const storeName of ['map', 'object']) {
    const store = require(`../store/${storeName}.store`);

    beforeEach(() => store.initArrayByKey('test_key'));

    test('Store should allow Object to be stored in it (postValue)', () => {

    });

    test('Store should return sum of metrics by key (getSumByKey)', () => {

    });

    test('Store should return sum of non-expired metrics by key (getSumByKey)', () => {

    });

    test('Store should remove all expired values (removeExpiredValues) ', () => {

    });

    test('Store should tell if it contains an Object (contains) or not', () => {

    });

    test('Store should allow its arrays to be initialized (initArrayByKey)', () => {

    });
}
```

### Utils

### Integration Testing
This testing tests the methods in the controller associated to the router's endpoints. It mimics req as input.

# Performance
## Benchmark
To decide which is to be used as store/main data structure between Object and Map, I've written a short script:

It can be ran using *npm run benchmark*

# Deployment
