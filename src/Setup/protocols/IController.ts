import { HttpRequest, HttpResponse } from "./HttpProtocols";

export interface IController {
    handler: (request: HttpRequest, response: HttpResponse) => HttpResponse
}