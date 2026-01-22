import z from "zod";

const envSchema = z.object({
    COGNITO_CLIENT_ID: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    throw new Error("[envSchema]")
}

export const env = _env.data