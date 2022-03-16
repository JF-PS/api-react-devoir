import jwt from "jsonwebtoken";
const secret = "test";

const createToken = (formData: any) => {
  return jwt.sign(formData, secret, {
    expiresIn: "1h",
  });
};

export { createToken };
