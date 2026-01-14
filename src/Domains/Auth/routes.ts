import express from "express"
import SignInController from "./Controllers/SignInController"

const router = express.Router()

router.post("/login", SignInController.handler)

export default router