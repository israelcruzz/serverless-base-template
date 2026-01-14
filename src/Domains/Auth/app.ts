import express from "express"
import AuthRoutes from "@/Domains/Auth/routes"

export const buildApp = () => {
    const app = express()

    app.use(express.json())

    app.use("/authentication", AuthRoutes)

    return app
}