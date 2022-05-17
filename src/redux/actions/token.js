export const setTokens = (authTokens) => ({
  type: 'setTokens',
  payload: authTokens,
});

export const clearTokens = () => ({
  type: 'clearTokens',
  payload: null,
});
