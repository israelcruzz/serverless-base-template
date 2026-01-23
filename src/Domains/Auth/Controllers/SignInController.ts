import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols";
import { IController } from "@/Setup/protocols/IController";
import z from "zod";
import {
    InitiateAuthCommand
} from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "@/Setup/core/cognitoClient";

class SignInController implements IController {
    async handler(httpRequest: HttpRequest, httpResponse: HttpResponse) {
        try {
            const schema = z.object({
                email: z.email().nonempty(),
                password: z.string().min(8)
            })

            const validationSchema = schema.safeParse(httpRequest.body)

            if (validationSchema.error) {
                return httpResponse.status(400).send({ message: validationSchema.error.message })
            }

            const { email, password } = validationSchema.data

            const command = new InitiateAuthCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                AuthFlow: "USER_PASSWORD_AUTH",
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password
                }
            })

            const { AuthenticationResult } = await cognitoClient.send(command)

            const body = {
                idToken: AuthenticationResult?.IdToken,
                accessToken: AuthenticationResult?.AccessToken,
                refreshToken: AuthenticationResult?.RefreshToken
            }

            return httpResponse.status(200).send({ body })
        } catch (error) {
            console.error(error)

            return httpResponse.status(500).send({ message: "Internal Server Error" })
        }
    }
}

export default new SignInController()