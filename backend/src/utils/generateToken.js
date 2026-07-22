import jwt from 'jsonwebtoken';

export const generateRefreshToken = async (id) => {
    const token = await jwt.sign({id},process.env.JWT_REFRESH_SECRET,{
        expiresIn:'7d'
    })

    return token;
}
export const generateAccessToken = async (id) => {
    const token = await jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'15m'
    })

    return token;
}

