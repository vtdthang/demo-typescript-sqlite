import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export default class UserController {
    static getAll = async(req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
            select: ["id", "username", "role"] //We dont want to send the passwords on response
        });

        //Send the users object
        res.send(users);
    }

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = Number(req.params.id);
      
        //Get the user from database
        const userRepository = getRepository(User);
        try {
          const user = await userRepository.findOneOrFail(id, {
            select: ["id", "username", "role"] //We dont want to send the password on response
          });
        } catch (error) {
          res.status(404).send("User not found");
        }
      };
};