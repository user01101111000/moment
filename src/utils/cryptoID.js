import CryptoJS from "crypto-js";

const encryptToken = (token) => {
  const secretKey = `${import.meta.env.VITE_SECRET_KEY}`;
  return CryptoJS.AES.encrypt(token, secretKey).toString();
};

const decryptToken = (encryptedToken) => {
  const secretKey = `${import.meta.env.VITE_SECRET_KEY}`;
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export { encryptToken, decryptToken };
