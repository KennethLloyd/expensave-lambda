const dynamoose = require('dynamoose');

(async () => {
  try {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.sdk.DynamoDB({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.AWS_REGIONs,
    });

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
  } catch (e) {
    console.log(e);
  }
})();
