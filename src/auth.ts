import {Request, Response ,NextFunction} from "express";


const USERNAME = "admin"
const PASSWORD = "qwerty"


export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res.status(404);
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = credentials.split(":");

  if (username === USERNAME && password === PASSWORD) {
    return next();
  }

  return res.status(404)
};
