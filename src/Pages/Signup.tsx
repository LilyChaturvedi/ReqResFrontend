import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const registerUser = async (payload: any) => {
    try {
      const result = await authApi.registerUser(payload);
      console.log("sing", result);
      toast.success("Successfully Register", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Register", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const onsignHAndler = () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("InValid email format")
        .required("Email Is Required"),
      password: Yup.string()
        .min(8, "Minimum Length should be 8 Char")
        .max(16, "Max length should be 16 Char")
        .required("Password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values, ", values);
      const { firstName, lastName, ...rest } = values;
      registerUser(rest);

      resetForm();
    },
  });
  return (
    <div className="h-screen  flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
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
            Sign up
          </button>
        </form>
        <div className="flex items-center flex-col">
          <h4 className="flex justify-items-center ">or</h4>
          <button
            onClick={() => {
              onsignHAndler();
            }}
            className="w-2/5 bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
