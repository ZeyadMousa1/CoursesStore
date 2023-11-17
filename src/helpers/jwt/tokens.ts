import * as jwt from 'jsonwebtoken'

export class JwtGenerator{

    static generateJwtAccessToken(payLoad: any): string {
         return jwt.sign(payLoad, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' })
    }

    static generateJwtRefreshToken(payLoad: any): string{
        return jwt.sign(payLoad, process.env.JWT_REFRESH_TOKEN!, {expiresIn: '1d'})
    }

}


