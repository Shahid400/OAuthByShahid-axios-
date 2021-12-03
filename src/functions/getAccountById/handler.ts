import { middyfy } from '@libs/lambda';

import { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
const axios = require('axios');

const getAccountById: Handler = async (event) => {
  const realmId = event.body.realmId;
  const accountId = event.body.accountId;
  const token = event.body.token;

  const response = await axios.get(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account/${accountId}?minorversion=62`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return formatJSONResponse({
    message: response.data
  });
}

export const main = middyfy(getAccountById);
