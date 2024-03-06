import { useFormik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import { authContext } from "../AuthWrapper";
import authApi from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignIn = () => {
  const token = useContext(authContext);
  const navigate = useNavigate();

  const loginUser = async (values: any) => {
    try {
      const result = await authApi.loginUser(values);
      console.log("result :", result);

      if (result.token) {
        token?.setToken(true);
        navigate("/");
      } else {
        toast.error("Invalid credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.log("error in finding ");
      toast.error("fail to login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const onsignupButton = () => {
    navigate("/register");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("InValid email format")
        .required("Email Is Required"),
      password: Yup.string()
        .min(5, "Minimum Length should be 8 Char")
        .max(16, "Max length should be 16 Char")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values, ", values);
      loginUser(values);
      resetForm();
    },
  });
  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="bg-white h-fit p-8 flex justify-center flex-col rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            {formik.touched.password && formik.errors.password && (
              <p style={{ color: "red" }}>{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign In
          </button>
        </form>
        <div className="flex  items-center flex-col">
          <h4 className="flex justify-center  ">or</h4>
          <button
            onClick={() => onsignupButton()}
            className="w-2/5 bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
