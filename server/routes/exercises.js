import express from "express";
import { getExercises } from "../controllers/exercise-controller.js";

const exerciseRouter = express.Router();

exerciseRouter.get("/", getExercises);

export default exerciseRouter;
