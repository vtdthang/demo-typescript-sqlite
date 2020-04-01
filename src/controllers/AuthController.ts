import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { JWT_SECRET } from "../config/config";

export default class AuthController {
    static login = async (req: Request, res: Response) => {
        let {username, password} = req.body;

        if (!(username && password)) {
            res.status(400).send();
        }

        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: {username}});
        } catch(error) {
            res.status(401).send();
        }

        if(!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username},
            JWT_SECRET,
            {expiresIn: "1h"}
        );
        
        res.send(token);
    }

    static changePassword = async (req: Request, res: Response, next: NextFunction) => {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;
        console.log("Change Pass");
    }
};