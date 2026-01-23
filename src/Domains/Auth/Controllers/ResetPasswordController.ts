import { cognitoClient } from "@/Setup/core/cognitoClient"
import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols"
import { IController } from "@/Setup/protocols/IController"
import { ConfirmForgotPasswordCommand } from "@aws-sdk/client-cognito-identity-provider"
import z from "zod"

class ResetPasswordController implements IController {
    async handler(httpRequest: HttpRequest, httpResponse: HttpResponse) {
        try {
            const bodySchema = z.object({
                code: z.string().nonempty(),
                email: z.email().nonempty(),
                newPassword: z.string().min(8).nonempty()
            })

            const validateSchema = bodySchema.safeParse(httpRequest.body)

            if (!validateSchema.success) {
                return httpResponse.status(400).send({ message: validateSchema.error.message })
            }

            const {
                email,
                code,
                newPassword
            } = validateSchema.data

            const command = new ConfirmForgotPasswordCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                Username: email as string,
                ConfirmationCode: code as string,
                Password: newPassword as string
            })

            await cognitoClient.send(command)

            return httpResponse.status(204)
        } catch (error) {
            console.error(error)

            return httpResponse.status(500).send({ message: "Internal Server Error" })
        }
    }
}

export default new ResetPasswordController()