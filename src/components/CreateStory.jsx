import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Navbar from './Navbar';


const CreateStory = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post("https://emmersion-1.onrender.com/story/add", formData, { withCredentials: true });
      if (response) {
        navigateTo("/home");
      }
    } catch (error) {
      console.log("error while submitting form", error);
    }
  };

  return (
    <section>
      <Navbar />
      <h2 className="text-center text-4xl font-bold leading-tight text-white">
        Create Story
      </h2>
      <div className="flex items-center justify-center px-4 sm:px-6 sm:py-16 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-lg 2xl:max-w-xl border border-gray-300 rounded-lg py-[2%] px-[8%]">
          <form
            action=""
            method="POST"
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="space-y-5">
              <div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-[#191926] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter Title"
                    required
                  ></input>
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <textarea className="flex h-[300px] w-full rounded-md border border-gray-300 bg-[#191926] px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="body" onChange={handleInputChange} value={formData.body} id=""></textarea>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-900/80"
                >
                  Submit <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default CreateStory
