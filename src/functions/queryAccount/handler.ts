import { middyfy } from '@libs/lambda';

import { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
const axios = require('axios');

const queryAccount: Handler = async (event) => {
  const realmId = event.body.realmId;
  const token = event.body.token;
  const name = event.body.name;
  const query = `select * from Account where Name > '${name}'`;
  

  const response = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query?query=${query}&minorversion=62`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return formatJSONResponse({
    message: response.data
  })
}

export const main = middyfy(queryAccount);
