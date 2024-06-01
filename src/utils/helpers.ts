import { AES, enc } from 'crypto-js';
import { SECRET } from './constants';

export const encryptMessage = (message: string) => {
  return AES.encrypt(message, SECRET).toString();
};

export const decryptMessage = (message: string) => {
  return AES.decrypt(message, SECRET).toString(enc.Utf8);
};
