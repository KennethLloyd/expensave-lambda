const dynamoose = require('dynamoose');

(async () => {
  try {
    // Create new DynamoDB instance
    const ddb = new dynamoose.aws.sdk.DynamoDB({
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET,
      region: process.env.MY_AWS_REGION,
    });

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
    // dynamoose.aws.ddb.local();
  } catch (e) {
    console.log(e);
  }
})();
