import * as yup from "yup";
import { regexMail } from "../../constants/regex.const";

function testPasswords(this: yup.TestContext, value: string) {
  return value === this.parent.password;
}

export const validationSchema = yup.object({
  email: yup
    .string()
    .matches(regexMail, {
      message: "Invalid email address",
    })
    .required("Email is required"),
  name: yup.string().min(5).max(15).required("Name is required"),

  password: yup.string().min(5).max(15).required("Password is required"),
  confirmPassword: yup
    .string()
    .min(5)
    .max(15)
    .required("Password confirmation is required")
    .test("passwords-match", "Passwords must match", testPasswords),
});
