interface SubmitFormElements {
  username: HTMLInputElement;
  password: HTMLInputElement;
  password_confirm: HTMLInputElement;
}

interface ResponseAuthRegisterJson {
  access_token: string;
}

export type { SubmitFormElements, ResponseAuthRegisterJson };
