"use client";

import React, { useState, useEffect } from "react";
import LottieLoader from "react-lottie-loader";
import LoginAnimation from "/public/animation/Animation - 1727946232941.json";

const Page = () => {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedCategories = localStorage.getItem("category-blog");
    if (savedCategories) {
    }
  }, []);

  useEffect(() => {
    if (category) {
      localStorage.setItem("category-blog", JSON.stringify(category));
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const currentCategory = category;
    setCategory("");

    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    if (!userInfo || !userInfo.authorization) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    const newCategory = {
      name: currentCategory,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-apikeeda-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${userInfo.authorization}`,
          },
          body: JSON.stringify(newCategory),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      const data = await response.json();
      localStorage.setItem("category-blog", JSON.stringify(data));
      alert("Category added successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to add category. Please try again.");
      setCategory(currentCategory);
    } finally {
      setLoading(false);
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
                  Add Category
                </h2>
              </div>

              {error && (
                <div className="bg-red-200 text-red-700 p-3 rounded">
                  {error}
                </div>
              )}

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm">
                  <div className="mb-4">
                    <input
                      name="category"
                      type="text"
                      placeholder="Add a new category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 font-quicksandSemiBold px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Category"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
