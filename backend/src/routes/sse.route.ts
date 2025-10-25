import { Router } from "express";
import { initialiseSSE, registerToSSE } from "../controllers/sse.controller.js";
const sseRouter = Router();

sseRouter.get("/:clientId",initialiseSSE)
sseRouter.post("/register",registerToSSE)

export default sseRouter;