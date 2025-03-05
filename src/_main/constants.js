export const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// REGEX
export const UNAME_REGEX = '[a-zA-Z][\\sa-zA-Z]{0,}';
export const PASSWORD_REGEX = '[a-zA-Z][\\sa-zA-Z]{0,}';
export const NUMBER_REGEX = '^(\\s*\\d+)$';
export const NAME_REGEX = '^([a-zA-Z]{2,}\\s[a-zA-Z]{1,}?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)';
export const ALPHA_REGEX = '^(\\s*[a-zA-Z ]+)$';
export const NUMBER_ONLY_REGEX = '^[0-9]+$';
export const MOBILE_NUMBER_REGEX = '^\\d{10}$';
// eslint-disable-next-line max-len
export const EMAIL_REGEX = /^$|^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/
export const ALPHA_NUMERIC_REGEX = '[a-zA-Z][\\sa-zA-Z]{0,}';
// export const NOT_EMPTY_REGEX = '^(?!\\s*$).+'
export const NOT_EMPTY_REGEX = /\S+/;
export const OTP_REGEX = '^d{1,6}$';
