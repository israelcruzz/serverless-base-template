import { buildApp } from "./app";
import serverless from "serverless-http"

const app = buildApp

export const handler = serverless(app)