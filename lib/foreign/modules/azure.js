const KeyVault = require('azure-keyvault');
const AuthenticationContext = require('adal-node').AuthenticationContext;

const clientId = process.env.AZURE_CLIENT_ID;
const clientSecret = process.env.AZURE_CLIENT_SECRET;
const vaultUri = process.env.AZURE_VAULT_URI;

// Authenticator - retrieves the access token
const authenticator = function (challenge, callback) {

    // Create a new authentication context.
    const context = new AuthenticationContext(challenge.authorization);

    // Use the context to acquire an authentication token.
    return context.acquireTokenWithClientCredentials(challenge.resource, clientId, clientSecret, function (error, tokenResponse) {
        if (error) throw error;
        // Calculate the value to be set in the request's Authorization header and resume the call.
        const authorizationValue = tokenResponse.tokenType + ' ' + tokenResponse.accessToken;
        return callback(null, authorizationValue);
    });

};

const credentials = new KeyVault.KeyVaultCredentials(authenticator);
const client = new KeyVault.KeyVaultClient(credentials);

module.exports = (key, done) => {
    const secretId = vaultUri + '/secrets/' + key;
    client.getSecret(secretId, (error, result) => {
        done(error, result ? result.value : null);
    });
};
