"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LottieLoader from "react-lottie-loader";
import LoginAnimation from "/public/animation/animation.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, setError } from "../store/userSlice";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Page = () => {
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  // console.log(
  //   "process.env.NEXT_PUBLIC_ANALYTICS_API",
  //   process.env.NEXT_PUBLIC_ANALYTICS_API
  // );
  const handleSubmit = async (values, { setSubmitting }) => {
    const item = { email: values.email, password: values.password };

    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-apikeeda-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      let result = await response.json();

      if (result.error) {
        setLoginError(result.error);
        dispatch(setError(result.error));
      } else {
        localStorage.setItem("user_info", JSON.stringify(result));
        dispatch(setUser(result));
        router.push("/");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      dispatch(setError(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-quicksand min-h-screen md:h-full bg-white">
      <div className="p-5 bg-[#6b17c3]">
        <div className="bg-white flex items-center rounded-3xl">
          <div className="w-1/2 md:hidden flex justify-center items-center">
            <LottieLoader
              animationData={LoginAnimation}
              className="h-[689px]"
              alt="Requirement Analysis"
            />
          </div>
          <div className="w-1/2 text-black md:w-full md:min-h-screen md:h-full flex justify-center items-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg">
              <div className="flex-col">
                <h2 className="text-3xl font-quicksandBold text-indigo-900">
                  Hello,
                </h2>
                <span className="text-3xl font-quicksandSemiBold text-indigo-900">
                  Welcome back
                </span>
              </div>

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                      <div className="mb-4">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Username or email"
                          className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-red-600 font-quicksandSemiBold"
                        />
                      </div>
                      <div className="mb-6">
                        <Field
                          name="password"
                          type="password"
                          placeholder="Password"
                          className="w-full font-quicksandSemiBold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <ErrorMessage
                          name="password"
                          component="p"
                          className="font-quicksandSemiBold text-red-600"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center font-quicksandSemiBold">
                        <input
                          id="remember-me"
                          type="checkbox"
                          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 text-sm text-gray-600"
                        >
                          Remember me
                        </label>
                      </div>

                      <div>
                        <a
                          href="#"
                          className="text-sm font-quicksandSemiBold text-indigo-600 hover:text-indigo-900"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 font-quicksandSemiBold px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    {loginError && (
                      <p className="text-red-600 font-quicksandSemiBold">
                        {loginError}
                      </p>
                    )}

                    <div className="text-center font-quicksandSemiBold text-sm mt-6">
                      <p>
                        Don't have an account?
                        <a
                          href="/signup"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Click here
                        </a>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
