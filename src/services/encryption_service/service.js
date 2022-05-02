import React from "react";
import crypto from "crypto-js";

const encrypt = (value, secret) => {
  const keyutf = crypto.enc.Utf8.parse(secret);
  const iv = crypto.enc.Base64.parse(secret);
  var cipher = crypto.AES.encrypt(value, keyutf, { iv: iv });
  cipher = cipher.toString();
  //console.log(cipher);
  return cipher;
};

const decrypt = (value, secret) => {
  // var decipher = crypto.AES.decrypt(value, secret);
  // decipher = decipher.toString(crypto.enc.Utf8);

  const keyutf = crypto.enc.Utf8.parse(secret);
  const iv = crypto.enc.Base64.parse(secret);


  const decipher = crypto.AES.decrypt(
    { ciphertext: crypto.enc.Base64.parse(value) },
    keyutf,
    {
        iv: iv
    });
const decStr = crypto.enc.Utf8.stringify(decipher)
  return decStr;
};

export { encrypt, decrypt };
