import { asyncHandler } from "../../infrastructure/middlewares/asyncHandler";
import { Request, Response } from "express";
import { config } from "../../infrastructure/config/app";
import { registerSchema } from "../validations/auth";
import { HTTPSTATUS } from "../../infrastructure/config/http";

interface CustomUser {
    id: string;
    name: string;
    email: string;
    picture?: string;
    currentWorkspace?: string;
}

interface CustomRequest extends Request {
    user?: CustomUser;
}

export const googleLoginCallback = asyncHandler(
    async (req: CustomRequest, res: Response) => {
        const currentWorkspace = req.user?.currentWorkspace;

        if (!currentWorkspace) {
            return res.redirect(
                `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
            );
        }

        return res.redirect(
            `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
        );
    }
);

export const registerUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const body = registerSchema.parse({
            ...req.body,
        });

        await registerUserService(body);

        return res.status(HTTPSTATUS.CREATED).json({
            message: "User created successfully",
        });
    }
);

function registerUserService(body: { email: string; name: string; password: string; }) {
    throw new Error("Function not implemented.");
}
