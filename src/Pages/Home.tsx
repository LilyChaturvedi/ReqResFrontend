import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import Card from "../component/Card";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

const Home = () => {
  const [isopen, setIsopen] = useState(false);
  const onOpenModal = () => {
    setIsopen(true);
  };
  const [data, setData] = useState<UserData[]>([]);
  const notify = () => toast("Wow so easy!");
  const getAllUser = () => {
    try {
      const resp = userApi.fetchALLUser();
      resp.then((res) => setData(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  const createuser = async (payload: any) => {
    try {
      const res = userApi.createUser(payload);
      console.log("create ,", res);
      toast.success("create successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error);
      toast.error("fail to create", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      job: "",
    },

    onSubmit: (values, { resetForm }) => {
      console.log("values, ", values);
      createuser(values);
      resetForm();
      setIsopen(false);
    },
  });
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          onOpenModal();
        }}
      >
        <IoMdAddCircleOutline size={"15%"} />
      </button>
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.map((item) => <Card key={item.id} value={item} />)}
      </div>
      <Modal open={isopen} onClose={() => setIsopen(false)}>
        <div className="max-w-md mx-auto">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                required
                type="text"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="job"
                type="text"
                required
                name="job"
                value={formik.values.job}
                onChange={formik.handleChange}
                placeholder="Enter your job"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
