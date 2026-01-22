import { cognitoClient } from "@/Setup/core/cognitoClient";
import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols";
import { IController } from "@/Setup/protocols/IController";
import { InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import z from "zod";

class RefreshTokenController implements IController {
    async handler(httpRequest: HttpRequest, httpResponse: HttpResponse) {
        try {
            const bodySchema = z.object({
                refreshToken: z.string().nonempty
            })

            const validateSchema = bodySchema.safeParse(httpRequest.body)

            if (!validateSchema.success) {
                return httpResponse.status(400).send({ message: validateSchema.error.message })
            }

            const {
                refreshToken
            } = validateSchema.data

            const command = new InitiateAuthCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                AuthFlow: "REFRESH_TOKEN_AUTH",
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken as string
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
            return httpResponse.status(500).send({ message: "Internal Server Error" })
        }
    }
}

export default new RefreshTokenController()