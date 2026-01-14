import AuthRoutes from "@/Domains/Auth/routes"
import BuildAppFactory from "@/Domains/Shared/factories/buildAppFactory"

export const buildApp = BuildAppFactory.handle({
    router: AuthRoutes,
    basePathName: "/authentication"
})