import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async (event) => {

    const params = {
        TableName: "VisitorCounter",
        Key: {
            id: { S: "visits" }
        },
        UpdateExpression: "SET #c = if_not_exists(#c, :start) + :inc",
        ExpressionAttributeNames: {
            "#c": "count"
        },
        ExpressionAttributeValues: {
            ":inc": { N: "1" },
            ":start": { N: "0" }
        },
        ReturnValues: "UPDATED_NEW"
    };

    const result = await client.send(new UpdateItemCommand(params));

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            count: result.Attributes.count.N
        })
    };
};
