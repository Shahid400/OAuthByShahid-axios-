import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
const axios = require('axios');

const createAccount: Handler = async (event) => {
  const realmId = event.body.realmId;
  const token = event.body.token;
  const name = event.body.name;
  const accountType = event.body.accountType;

  const response = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account?minorversion=62`, {
    Name: name,
    AccountType: accountType
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return formatJSONResponse({
    message: response.data
  });
}

export const main = middyfy(createAccount);
