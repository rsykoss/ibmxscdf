const AWS = require('aws-sdk');

// const dynamo = require('dynamodb');

AWS.config.update({accessKeyId: 'AKIA5RBDA3K64YSJSYPD', secretAccessKey: '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', region: 'ap-southeast-1'});

// Create the DynamoDB service object
const dynamo = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
// var dynamo = require('dynamodb');
// dynamo.AWS.config.update({accessKeyId: 'AKIA5RBDA3K64YSJSYPD', secretAccessKey: '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', region: 'ap-southeast-1'});
module.exports = {
    dynamo
}