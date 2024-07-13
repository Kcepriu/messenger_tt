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
  name: string;
  password: string;
  confirmPassword: string;
}
