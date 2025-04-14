import { useState } from "react";
import type { FormEvent } from "react";

import registerUser from "./api";
import type { SubmitFormElements } from "./types";

export function RegisterForm() {

    const [userPassword, setUserPassword] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        
        event.preventDefault();

        const form = event.target as (typeof event.target & SubmitFormElements);

        registerUser(
            form.username.value,
            form.password.value,
            form.password_confirm.value
        );

    }

    return (
        <div className="flex flex-col justify-center dark:bg-background mt-20">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-8 bg-area-dark rounded-lg shadow-card w-80 mx-auto border-[1.5px] border-stroke-gray-dark"
            >
                <h1 className="text-2xl font-bold text-center mb-4 text-white font-inter">
                    Register
                </h1>

                <input
                    name="username"
                    placeholder="Username"
                    className="
                        px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        bg-area-dark text-white placeholder-gray
                        transition-colors duration-200"
                    required
                />

                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    minLength={4}
                    maxLength={16}
                    onChange={(event) => setUserPassword(event.target.value)}
                    className="
                        px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        bg-area-dark text-white placeholder-gray
                        transition-colors duration-200"
                    required
                />


                <input
                    name="password_confirm"
                    placeholder="Password confirm"
                    type="password"
                    pattern={userPassword}
                    className="
                        px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500
                        bg-area-dark text-white placeholder-gray
                        transition-colors duration-200"
                    required
                />

                <button
                    type="submit"
                    className="
                        mt-4 px-4 py-2 bg-blue ring-2 ring-blue hover:bg-area text-white 
                        rounded-lg transition-all duration-200 font-medium font-inter
                        focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 
                        focus:ring-offset-area-dark"
                >
                    Register
                </button>
            </form>
        </div>
    );

}