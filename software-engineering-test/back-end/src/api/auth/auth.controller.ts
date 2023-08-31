import { RequestHandler } from "express";
import AuthService from "./auth.service";
import JWT from "@/JWT";

export default class AuthController {
  constructor(
    private authService: AuthService = new AuthService(),
    private jwt: JWT = new JWT()
  ){}
  public login: RequestHandler = async (req, res) => {
    const user = req.body;
    const result = await this.authService.login(user);

    return res.status(200).json(result);
  }

  public logout: RequestHandler = async (req, res) => {
    const token = req.headers.authorization as string;
    await this.authService.logout(token);

    return res.status(200).json({message: 'Logout success'});
  }

  public validateToken: RequestHandler = async (req, res) => {
    const token = req.headers.authorization as string;
    const result = await this.jwt.validate(token);

    return res.status(200).json(result);
  }

  public createUser: RequestHandler = async (req, res) => {
    const user = req.body;
    await this.authService.createUser(user);

    return res.sendStatus(201);
  }
}