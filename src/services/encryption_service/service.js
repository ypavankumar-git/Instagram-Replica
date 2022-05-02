import crypto from "crypto-js";

const encrypt = (value, secret) => {
  const keyutf = crypto.enc.Utf8.parse(secret);
  const iv = crypto.enc.Base64.parse(secret);
  var cipher = crypto.AES.encrypt(value, keyutf, { iv: iv });
  cipher = cipher.toString();
  return cipher;
};

// const decrypt = (value, secret) => {
//   console.log("value and secret : ", value, secret);

//   const keyutf = crypto.enc.Utf8.parse(secret);
//   const iv = crypto.enc.Base64.parse(secret);

//   const decipher = crypto.AES.decrypt(
//     { ciphertext: crypto.enc.Base64.parse(value) },
//     keyutf,
//     {
//       iv: iv,
//     }
//   );
//   console.log(decipher);
//   const decStr = crypto.enc.Utf8.stringify(decipher);
//   return decStr;
// };

const decrypt = async (value, secret) => {
  // var decipher = crypto.AES.decrypt(value, secret);
  // decipher = decipher.toString(crypto.enc.Utf8);

  console.log("value and secret : ", value, secret);

  const keyutf = crypto.enc.Utf8.parse(secret);
  const iv = crypto.enc.Base64.parse(secret);


  const decipher = crypto.AES.decrypt(
    { ciphertext: crypto.enc.Base64.parse(value) },
    keyutf,
    {
        iv: iv
    });
    console.log(decipher);
const decStr = await crypto.enc.Utf8.stringify(decipher)
console.log(decStr);
  return decStr;
};

export { encrypt, decrypt };
