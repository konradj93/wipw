export const defaultRegion = 'eu-west-1';
export const identityPoolId = 'eu-west-1:d6ce9d7b-42e1-40e7-aa10-67e32e0bca38';
export const userPoolId = `eu-west-1_j54jnd7Px`;
export const credentialName = `cognito-idp.${defaultRegion}.amazonaws.com/${userPoolId}`;
export const myBucket = '213774';
export const apiUrl = 'https://rrdhk1j3ii.execute-api.eu-west-1.amazonaws.com/dev'

export const authCfg = {
    userPoolId: userPoolId,
    clientId: 'evmsouskqjs2d1e70mmj2fo3m',
    identityPoolId: identityPoolId,
    credentialName: credentialName
}