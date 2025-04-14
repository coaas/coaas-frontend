import { authApi } from "@api/constants";
import { setAccess } from "@api/index";

import type { ResponseAuthRegisterJson } from "./types";

export default async function registerUser(
    username: string,
    password: string,
    password_confirm: string
) {

    try {

        const response = await authApi.post(
            'auth/register', 
            {
                json: {
                    username,
                    password,
                    password_confirm
                },
            }
        );

        if (response.ok) {
            const data = await response.json<ResponseAuthRegisterJson>();
            setAccess(data.access_token);
        } else {
            throw new Error(
                "Failed to obtain access token" +
                `\nServer response status code: ${response.status}`
            );
        }

    } catch (error) {
        console.error(error);
    }

}