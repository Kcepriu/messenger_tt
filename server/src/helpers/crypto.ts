import jwt from 'jsonwebtoken';

const { JWT_SECRET = 'MySecretPahrase', JWT_EXPIRATION = '360000' } = process.env;

interface IPayload {
  id: string;
}

export const createToken = (payload: IPayload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  });

  return accessToken;
};

export const getPayloadAccessToken = (token: string) => jwt.verify(token, JWT_SECRET);
