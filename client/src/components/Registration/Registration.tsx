import { FC } from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { MainLoader } from "../MainLoader/MainLoader";
import { APP_KEYS } from "../../constants";
import { useAuthStore } from "../../stores";

import { validationSchema } from "./Registration.schema";

const Registration: FC = () => {
  const navigate = useNavigate();
  const { registration, isLoading, isLoggedIn } = useAuthStore(
    (store) => store
  );

  const handleSubmit = async (values: IRegistrationUser) => {
    const { confirmPassword, ...user } = values;
    void confirmPassword;
    registration(user);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (isLoggedIn) return <Navigate to={APP_KEYS.ROUTER_KEYS.ROOT} />;

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
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Password confirmation"
          value={formik.values.confirmPassword}
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          required
        />
        <div className="flex justify-between mt-12">
          <Button variant="outlined" size="large" type="submit">
            Registration
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(APP_KEYS.ROUTER_KEYS.LOGIN)}
          >
            To LogIn
          </Button>
        </div>
      </form>
      {isLoading && <MainLoader />}
    </div>
  );
};

export default Registration;
