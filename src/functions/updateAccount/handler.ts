import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';
const axios = require('axios');

const updateAccount: Handler = async (event) => {
  // For Account Record Updation
  // Must required params => Name, Id, AccountType, SyncToken
  // and other attributes that you want to update
  // Remember: Id, AccountType, SyncToken can never be updated
  // SyncToken (number format) auto-increments at every update
  
  const body = event.body;
  const realmId = body.realmId;
  const token = body.token;
  delete body.realmId;
  delete body.token;

  const response = await axios.post(`https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account?minorversion=62`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  return formatJSONResponse({
    message: response.data
  });
}

export const main = middyfy(updateAccount);
