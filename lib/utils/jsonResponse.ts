import { APIGatewayProxyResult } from 'aws-lambda';

interface IResponse {
  statusCode: number;
  data: any;
  headers?: object;
}

const buildResponse = ({ statusCode = 500, data, headers = {} }: IResponse): APIGatewayProxyResult => {
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

export default {
  errors: (error: any) => {
    const statusCode = error.statusCode || 500;

    if (error.response) {
      return buildResponse({ statusCode, data: error.response.data.error_messages });
    }

    return buildResponse({ statusCode, data: error.message });
  },
  failure: (data: any, statusCode = 500) => buildResponse({ statusCode, data }),
  success: (data: any) => buildResponse({ statusCode: 200, data }),
};
