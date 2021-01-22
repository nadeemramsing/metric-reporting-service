# Requirements
- Implement the two endpoints /metric/:key and /metric/:key/sum
- No data persistence required
- App should be optimized for readability (best practices, clean code) and performance (benchmark, security)
- Testing, logging (error handling) and good documentation expected
- Host app on AWS Lambda if possible (else, on other hosting apps)

## TODO:
### For object validation, use joi or yup DONE

### For storage, use Object, Map and then more complex Binary Tree implementations:
- https://www.npmjs.com/package/splaytree (allows duplicate)
- https://www.npmjs.com/package/bintrees (does not allow duplicate => should then add a unique index)
- https://www.npmjs.com/package/functional-red-black-tree

### For documentation, use documentation generator: Swagger REJECTED

### For CI/CD, use Github Actions Workflows DONE

### For unit testing, use Jest DONE

### For deployment to AWS Lambda, use @vendia/serverless-express (or change from Express to lambda-api) POSTPONED
- Learn how to set up AWS provider credentials: https://www.serverless.com/framework/docs/providers/aws/guide/credentials/
- serverless config credentials --provider aws --key key --secret secret

### For cold starts limitation, use 
serverless-plugin-warmup to keep lambda function warm