import { FC } from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainLoader } from "../MainLoader/MainLoader";

import { APP_KEYS } from "../../constants";
import { useAuthStore } from "../../stores";
import { validationSchema } from "./Login.schema";

const Login: FC = () => {
  const navigate = useNavigate();
  const { logIn, isLoading } = useAuthStore((store) => store);

  const handleSubmit = async (values: ILogInUser) => {
    await logIn(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex grow justify-center items-center h-screen">
      <form
        className="flex flex-col gap-5 w-[300px]"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <div className="flex justify-between mt-12">
          <Button variant="outlined" size="large" type="submit">
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.REGISTRATION)}
          >
            To Registration
          </Button>
        </div>
      </form>
      {isLoading && <MainLoader />}
    </div>
  );
};

export { Login };
