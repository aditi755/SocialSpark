import jwt from 'jsonwebtoken'

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, 'iA8JrWwIn3bKVo5dsDGBtDGWsoN67YXN/VDwum6p+mI=', {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60*60*1000,
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", //CSRF attcks cross-site request forgery attacks
        secure : process.env.NODE_ENV != "development"
    })
}