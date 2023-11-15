import * as jwt from 'jsonwebtoken'

export class JwtGenerator{

    static generateJwt(playLoad: any): string {
         return jwt.sign(playLoad, process.env.JWT_SECRET_KEY!, { expiresIn: '1m' })
    }

}


