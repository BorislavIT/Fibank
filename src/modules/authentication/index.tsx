import { useContext } from "react";
import { UserContext } from "./userContext";
import { FiButton, FiInputText } from "../../base";
import { useFormik } from "formik";
import { initialFormValues, signInSchema } from "./constant";

import "./authentication.css";

export const AuthenticationPage = () => {
  const { login } = useContext(UserContext);

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: signInSchema,
    onSubmit: (values) => {
      login(values.username);
      formik.resetForm();
    },
  });

  return (
    <div className="authenticationContainer">
      <div className="signInFormContainer">
        <form onSubmit={formik.handleSubmit} className="p-fluid signInForm">
          <h3 className="authentication-header">Sign in page</h3>
          <div>
            <span>
              <label htmlFor="username">Username</label>
              <FiInputText
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </span>
            <small className="p-error">{formik.errors.username}</small>
          </div>
          <div>
            <span>
              <label htmlFor="password">Password</label>
              <FiInputText
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </span>
            <small className="p-error">{formik.errors.password}</small>
          </div>
          <FiButton type="submit" disabled={!(formik.isValid && formik.dirty)}>
            Sign in
          </FiButton>
        </form>
      </div>
    </div>
  );
};
