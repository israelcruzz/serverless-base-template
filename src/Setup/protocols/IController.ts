import { HttpRequest, HttpResponse } from "./HttpProtocols";

export interface IController {
    handler: (httpRequest: HttpRequest, httpResponse: HttpResponse) => Promise<HttpResponse>
}