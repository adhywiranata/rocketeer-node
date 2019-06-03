import { APIGatewayProxyResult } from 'aws-lambda';

export default (statusCode: number = 500, data: any, headers = {}): APIGatewayProxyResult => {
  const result: APIGatewayProxyResult = {
    body: JSON.stringify(data),
    headers: Object.assign({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': '*',
    }, headers),
    statusCode,
  };

  return result;
};
