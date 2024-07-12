interface IAuthUser {
  id: number;
  name: string;
}

interface ILogInUser {
  email: string;
  password: string;
}

interface IRegistrationUser {
  email: string;
  password: string;
  confirmPassword: string;
}
