import express from "express";
import { getSessions } from "../controllers/sessions-controller.js";

const sessionRouter = express.Router();

sessionRouter.get("/", getSessions);

export default sessionRouter;
