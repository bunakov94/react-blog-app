const USER_TOKEN_NAME = 'userToken';

const getUserToken = (): string | null => localStorage.getItem(USER_TOKEN_NAME);
const setUserToken = (token: string): void => localStorage.setItem(USER_TOKEN_NAME, token);
const removeUserToken = (): void => localStorage.removeItem(USER_TOKEN_NAME);

export { getUserToken, setUserToken, removeUserToken };
