import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { RouteMap } from '@components/Layout/components/types';

import registerUser from './api';
import { escapeRegExp } from './helpers';
import type { SubmitFormElements } from './types';

export function RegisterForm() {
  const [patternForConfirmPassword, setPatternForConfirmPassword] =
    useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.target as typeof event.target & SubmitFormElements;

    try {
      await registerUser(
        form.username.value,
        form.password.value,
        form.password_confirm.value,
      );
    } catch (error) {
      // Ошибки уже обрабатываются автоматически через apiErrorHandler
      // Просто игнорируем ошибку здесь
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-background">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 p-8 bg-area-dark rounded-lg shadow-card w-80 border-[1.5px] border-stroke-gray-dark"
        >
          <h1 className="text-2xl font-bold text-center mb-4 text-white font-inter">
            Register
          </h1>

          <input
            name="username"
            placeholder="Username"
            className="px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
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
            onChange={event =>
              setPatternForConfirmPassword(escapeRegExp(event.target.value))
            }
            className="px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    bg-area-dark text-white placeholder-gray
                    transition-colors duration-200"
            required
          />

          <input
            name="password_confirm"
            placeholder="Password confirm"
            type="password"
            pattern={patternForConfirmPassword}
            title="Passwords must match"
            className="px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    bg-area-dark text-white placeholder-gray
                    transition-colors duration-200"
            required
          />

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue ring-2 ring-blue hover:bg-area text-white 
                    rounded-lg transition-all duration-200 font-medium font-inter
                    focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 
                    focus:ring-offset-area-dark"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-400">
          Already have an account?{' '}
          <Link
            to={RouteMap.login}
            className="text-blue hover:text-blue-400 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
