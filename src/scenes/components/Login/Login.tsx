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
    const path = 'UserService/GetUser';
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
    <div className="flex flex-col">
      <form
        onSubmit={e => {
          e.preventDefault();
          submit(new FormData(e.target as HTMLFormElement));
        }}
        className={'flex flex-col space-y-2 w-40 mx-auto'}
      >
        <h1>Login</h1>
        <input
          name={'username'}
          placeholder="Username"
          className="py-1 text-neutral-950 dark:text-neutral-950"
        />
        <input
          name={'password'}
          placeholder="Password"
          type="password"
          className="py-1 text-neutral-950 dark:text-neutral-950"
        />
        <button type="submit" className="py-1">
          Login
        </button>
      </form>
      <button
        onClick={event => {
          event.preventDefault();
          checkLogin();
        }}
      >
        Check login
      </button>
    </div>
  );
};
