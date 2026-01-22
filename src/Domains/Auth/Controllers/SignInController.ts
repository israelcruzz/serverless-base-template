import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols";
import { IController } from "@/Setup/protocols/IController";
import z from "zod";
import {
  InitiateAuthCommand
} from "@aws-sdk/client-cognito-identity-provider"
import { cognitoClient } from "@/Setup/core/cognitoClient";

class SignInController implements IController {
    async handler (request: HttpRequest, response: HttpResponse) {
        const schema = z.object({
            email: z.email().nonempty(),
            password: z.string().min(8)
        })

        const validationSchema = schema.safeParse(request.body)

        if (validationSchema.error) {
            return response.status(400).send({ message: validationSchema.error.message })
        }

        const { email, password } = validationSchema.data

        const command = new InitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            ClientId: process.env.COGNITO_CLIENT_ID,
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

        return response.status(200).send({ body })
    }
}

export default new SignInController()