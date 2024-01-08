import jwt from 'jsonwebtoken'
import express, { Request, Response, NextFunction } from 'express'

interface RequestWithUser extends Request {
    user: any
}

function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).send("Veuillez vous authentifier pour pouvoir continuer")

    jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

export default authenticateToken