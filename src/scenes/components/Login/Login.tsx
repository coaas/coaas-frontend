import { api, auth_api } from '@api/constants.ts';
import { set_access } from '@api/auth.ts';

export const Login = () => {
  const submit = async (data: FormData) => {
    try {
      const resp = await auth_api.post('auth/login', {
        credentials: 'same-origin',
        json: {
          identification_method: 'username',
          auth_mode: 'password',

          login: data.get('username'),
          secret: data.get('password'),
        },
      });
      if (resp.ok) {
        const data = (await resp.json()) as {
          access_token: string;
        };
        console.log(data);
        set_access(data['access_token']);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const check_login = async () => {
    const resp = await api.post('UserService/GetUser', {
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
    <div className={'flex flex-col'}>
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
          className="py-1 text-black"
        />
        <input
          name={'password'}
          placeholder="Password"
          type="password"
          className="py-1 text-black"
        />
        <button type="submit" className="py-1">
          Login
        </button>
      </form>
      <button
        onClick={event => {
          event.preventDefault();
          check_login();
        }}
      >
        Check login
      </button>
    </div>
  );
};
