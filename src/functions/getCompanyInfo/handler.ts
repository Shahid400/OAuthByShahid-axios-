import { middyfy } from '@libs/lambda';
import { oauthClient } from '@libs/dynamodb';

import { Handler } from 'aws-lambda';
import { formatJSONResponse } from '@libs/apiGateway';

const getCompanyInfo: Handler = async (event) => {
  const realmId = event.body.realmId;
  const accountId = event.body.accountId;
  const token = event.body.token;

  const response = await oauthClient.makeApiCall( `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/account/${accountId}?minorversion=62`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return formatJSONResponse({
    message: response.data
  });

}
export const main = middyfy(getCompanyInfo);
