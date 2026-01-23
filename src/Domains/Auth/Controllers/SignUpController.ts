import { cognitoClient } from "@/Setup/core/cognitoClient";
import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols";
import { IController } from "@/Setup/protocols/IController";
import { CodeDeliveryFailureException, InvalidEmailRoleAccessPolicyException, InvalidPasswordException, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";
import z from "zod";

class SignUpController implements IController {
    async handler(httpRequest: HttpRequest, httpResponse: HttpResponse): Promise<HttpResponse> {
        try {
            const bodySchema = z.object({
                email: z.string().nonempty(),
                phoneNumber: z.string().min(8).nonempty(),
                name: z.string().min(3).nonempty(),
                password: z.string().min(8).nonempty()
            })

            const validateSchema = bodySchema.safeParse(httpRequest.body)

            if (!validateSchema.success) {
                return httpResponse.status(400).send({ message: validateSchema.error.message })
            }

            const {
                email,
                name,
                password,
                phoneNumber
            } = validateSchema.data

            const DEFAULT_ROLE = "user"

            const command = new SignUpCommand({
                ClientId: process.env.COGNITO_CLIENT_ID,
                Username: email as string,
                Password: password as string,
                UserAttributes: [
                    {
                        Name: "email",
                        Value: email as string
                    },
                    {
                        Name: "name",
                        Value: name as string
                    },
                    {
                        Name: "phone_number",
                        Value: phoneNumber as string
                    },
                    {
                        Name: "custom:role",
                        Value: DEFAULT_ROLE as string
                    }
                ]
            })

            await cognitoClient.send(command)

            return httpResponse.status(201).send({ message: "User was created!" })
        } catch (error) {
            console.error(error)

            if (error instanceof CodeDeliveryFailureException) {
                return httpResponse.status(502).send({
                    message: "Failed to deliver verification code. Please try again later."
                })
            }

            if (error instanceof InvalidEmailRoleAccessPolicyException) {
                return httpResponse.status(403).send({
                    message: "This email is not allowed to access this resource."
                })
            }

            if (error instanceof InvalidPasswordException) {
                return httpResponse.status(400).send({
                    message: "Password does not meet the required security criteria."
                })
            }

            return httpResponse.status(500).send({ message: "Internal Server Error" })
        }
    }
}

export default new SignUpController()