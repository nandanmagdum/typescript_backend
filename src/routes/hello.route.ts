import { Router, Request, Response} from "express";
import helmet from "helmet";

const helloRouter = Router();

helloRouter.get("/", (req:Request, res:Response):void => {
    res.json({"Data": "Hello, World !"});
});

export default helloRouter;