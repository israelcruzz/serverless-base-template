import express, { Express, Router } from "express"

type BuildAppOptions = {
  basePathName: string,
  middlewares?: Array<(app: Express) => void>
  router?: Router
}

class BuildAppFactory {
    public handle(options: BuildAppOptions) {
        const app = express()

        app.use(express.json())
        
        options.middlewares?.forEach((middleware) => middleware(app))
        
        if (options.router) {
            app.use(options.basePathName, options.router)
        }

        return app
    }
}

export default new BuildAppFactory()