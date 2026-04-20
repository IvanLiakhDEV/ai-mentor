import jwt from 'jsonwebtoken';

export const getAccessToken = user => {
    return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
export const getRefreshToken = user => {
    return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};
export const verifyRefreshToken = token => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

export const verifyAccessToken = token => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
