export const sendTokens = (res, accessToken, refreshToken) => {
    const cookieOptions = { httpOnly: true, secure: false, sameSite: 'strict' };
    res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });
};
