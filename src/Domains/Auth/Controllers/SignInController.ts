import { HttpRequest, HttpResponse } from "@/Setup/protocols/HttpProtocols";
import { IController } from "@/Setup/protocols/IController";

class SignInController implements IController {
    handler (request: HttpRequest, response: HttpResponse) {
        return response.status(200).send({ message: "sign message" })
    }
}

export default new SignInController()