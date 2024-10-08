"use client";
import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { setUser, setError } from "../store/userSlice";
import LottieLoader from "react-lottie-loader";
import LoginAnimation from "/public/animation/animation.json";
import { useDispatch, useSelector } from "react-redux";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [signupError, setSignUPError] = useState(null);

  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [userInfo, router]);

  const handleSubmit = async (values, { setSubmitting }) => {
    const { name, email, password } = values;
    const item = { name, email, password };

    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
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
        throw new Error("Signup failed");
      }

      let result = await response.json();

      if (result.error) {
        setSignUPError(result.error);
        dispatch(setError(result.error));
      } else {
        localStorage.setItem("user_info", JSON.stringify(result));
        dispatch(setUser(result));
        router.push("/dashboard");
      }
    } catch (error) {
      setSignUPError("An error occurred during SignUp. Please try again.");
      dispatch(setError(error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-quicksand bg-white md:h-full">
      <div className="p-5 bg-[#6b17c3]">
        <div className="bg-white flex justify-center items-center rounded-3xl">
          <div className="w-1/2 md:w-full md:min-h-screen md:h-full text-black flex justify-center items-center">
            <div className="max-w-md w-full p-2 bg-white rounded-lg">
              <div className="flex-col">
                <h2 className="text-3xl font-quicksandBold text-indigo-900">
                  Hello,
                </h2>
                <span className="text-3xl font-quicksandSemiBold font-semibold text-indigo-900">
                  Welcome back
                </span>
              </div>

              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm">
                      <div className="mb-4">
                        <Field
                          name="name"
                          type="text"
                          placeholder="Please enter a name"
                          className="w-full font-quicksandSemiBold px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="font-quicksandSemiBold text-red-600"
                        />
                      </div>
                      <div className="mb-4">
                        <Field
                          name="email"
                          type="email"
                          placeholder="Username or email"
                          className=" font-quicksandSemiBold w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          className="text-red-600 font-quicksandSemiBold"
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
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full py-2 px-4 font-quicksandSemiBold bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sign Up..." : "Sign Up"}
                      </button>
                      {signupError && (
                        <p className="text-red-600 font-quicksandSemiBold">
                          {signupError}
                        </p>
                      )}
                    </div>

                    <div className="text-center font-quicksandSemiBold text-black text-sm mt-6">
                      <p>
                        Have an account?
                        <a
                          href="/login"
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
          <div className="w-1/2 md:hidden">
            <LottieLoader
              animationData={LoginAnimation}
              alt="Requirement Analysis"
              className="h-[689px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
