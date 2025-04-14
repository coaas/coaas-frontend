import { api, authApi } from '@api/constants.ts';
import { setAccess } from '@api/setAccess/setAccess';

const submit = async (data: FormData) => {
  const login_path = 'auth/login';
  try {
    const resp = await authApi.post(login_path, {
      json: {
        identification_method: 'username',
        auth_mode: 'password',

        login: data.get('username'),
        secret: data.get('password'),
      },
    });
    if (resp.ok) {
      const data = await resp.json<{
        access_token: string;
      }>();
      setAccess(data.access_token);
    }
  } catch (error) {
    console.error(error);
  }
};

export const Login = () => {
  const checkLogin = async () => {
    const path = 'UserService/GetCurrentUserData';
    const resp = await api.post(path, {
      credentials: 'include',
      json: {},
    });
    if (!resp.ok) {
      alert('Login first');
      return;
    }
    console.log('Current user:', await resp.json());
  };

  return (
    <div className="flex flex-col justify-center dark:bg-background mt-20">
      <form
        onSubmit={e => {
          e.preventDefault();
          submit(new FormData(e.target as HTMLFormElement));
        }}
        className="flex flex-col space-y-4 p-8 bg-area-dark rounded-lg shadow-card w-80 mx-auto border-[1.5px] border-stroke-gray-dark"
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-white font-inter">
          Login
        </h1>

        <input
          name="username"
          placeholder="Username"
          className="px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                bg-area-dark text-white placeholder-gray
                transition-colors duration-200"
        />

        <input
          name="password"
          placeholder="Password"
          type="password"

          className="px-4 py-2 border-[1.5px] border-stroke-gray-dark rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                bg-area-dark text-white placeholder-gray
                transition-colors duration-200"
        />

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue ring-2 ring-blue hover:bg-area text-white 
            rounded-lg transition-all duration-200 font-medium font-inter
            focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2 
            focus:ring-offset-area-dark"
        >
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={event => {
            event.preventDefault();
            checkLogin();
          }}
          className="px-4 py-2 border-2 border-blue text-blue hover:bg-stroke-blue/20
                rounded-lg transition-colors duration-200 font-inter
                focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Check login
        </button>
      </div>
    </div>
  );
};
