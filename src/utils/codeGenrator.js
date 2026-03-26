import crypto from "crypto";

const generateConfirmationCode = () => {
  return crypto.randomBytes(6).toString("hex").toUpperCase();
};

export default generateConfirmationCode;
