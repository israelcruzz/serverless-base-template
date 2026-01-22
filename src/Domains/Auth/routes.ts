import express from "express"
import SignInController from "@/Domains/Auth/Controllers/SignInController"
import SignUpController from "@/Domains/Auth/Controllers/SignUpController"
import ConfirmSignUpController from "@/Domains/Auth/Controllers/ConfirmSignUpController"
import ResendConfirmationCodeController from "@/Domains/Auth/Controllers/ResendConfirmationCodeController"
import ForgotPasswordController from "@/Domains/Auth/Controllers/ForgotPasswordController"
import ResetPasswordController from "@/Domains/Auth/Controllers/ResetPasswordController"
import RefreshTokenController from "@/Domains/Auth/Controllers/RefreshTokenController"

const router = express.Router()

router.post("/signin", SignInController.handler)
router.post("/signup", SignUpController.handler)
router.post("/confirm-signup", ConfirmSignUpController.handler)
router.post("/resend-confirmation-code", ResendConfirmationCodeController.handler)
router.post("/forgot-password", ForgotPasswordController.handler)
router.post("/reset-password", ResetPasswordController.handler)
router.post("/refresh-token", RefreshTokenController.handler)

export default router