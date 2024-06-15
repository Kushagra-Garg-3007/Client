import { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [story, setStory] = useState({ title: '', body: '' });
  const authUser = useSelector((state) => state?.userReducer?.authUser?.user);
  const getStories = () => {
    axios
      .get("https://emmersion-1.onrender.com/story/getStory")
      .then((res) => {
        setStories(res?.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getStories()
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory((prevStory) => ({
      ...prevStory,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:8080/story/update/${story._id}`, story, { withCredentials: true })
      .then((res) => {
        setShowForm(false);
        getStories();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="p-6">
        <div className="mt-4">
          <h2 className="text-2xl text-white font-semibold mb-4">Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {stories.map((storyItem) => (
              <div
                key={storyItem._id}
                className="border p-4 rounded flex flex-col items-center cursor-pointer transform transition duration-500 ease-in-out hover:scale-95 hover:bg-gray-800"
              >
                <h3 className="text-xl font-bold text-center">{storyItem.title}</h3>
                <p>{storyItem.body}</p>
                {authUser.isWriter && (
                  <button
                    className="bg-slate-700 mt-2"
                    onClick={() => {
                      setShowForm(true);
                      setStory(storyItem);
                    }}
                  >
                    Contribute
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl text-black font-semibold mb-4">Contribute</h2>
            <div className="my-2 p-3 border">
              <input
                type="text"
                className="text-black"
                name="title"
                value={story.title}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="my-2 p-3 border">
              <textarea
                name="body"
                className="text-black outline-none"
                value={story.body}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-[blue] text-white py-2 px-4 rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="ml-2 bg-[red] text-white py-2 px-4 rounded"
                onClick={() => {
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
