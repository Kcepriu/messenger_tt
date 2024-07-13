interface IAuthUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

interface ILogInUser {
  email: string;
  password: string;
}

interface IRegistrationUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
