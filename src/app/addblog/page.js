"use client";
import React, { useState } from "react";
import LottieLoader from "react-lottie-loader";
import LoginAnimation from "/public/animation/Animation - 1727946232941.json";

const Page = () => {
  // State to hold form inputs
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // File input state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userInfo = JSON.parse(localStorage.getItem("user_info"));
    if (!userInfo || !userInfo.authorization) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    // Validate the form inputs
    if (!title || !category || !description || !image) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Prepare the form data (could be for API or storing locally)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", image); // Store file in formData

    try {
      // Store data in localStorage
      const blogData = {
        title,
        category,
        description,
        imageUrl: image.name, // Just saving the image name or convert to base64 if needed
      };
      localStorage.setItem("blog", JSON.stringify(blogData));

      // Simulate API call (replace with actual API request)
      const response = await fetch(
        // `${process.env.NEXT_PUBLIC_API_URL}/blog`,
        "https://service.apikeeda.com/api/v1/blog",
        {
          method: "POST",
          headers: {
            // Assuming you have some authorization token or API key
            Authorization: `${userInfo.authorization}`,
            "x-apikeeda-key": "t1727956292583zqp824820863ab",
            // "x-apikeeda-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: formData, // Send the formData in request body
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }

      alert("Blog added successfully!");
      // Clear the form
      setTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error submitting blog:", error);
      setError("Failed to add blog");
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
                  Add Blog
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
                      name="title"
                      type="text"
                      placeholder="Add blog title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      name="category"
                      type="text"
                      placeholder="Add Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      name="description"
                      placeholder="Add something..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      name="image"
                      type="file"
                      onChange={handleImageChange}
                      className="w-full font-quicksandSemiBold block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-2 font-quicksandSemiBold px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Blog"}
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
