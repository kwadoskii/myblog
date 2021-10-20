import { useState } from "react";

export default function NewPage() {
  const [content, setContent] = useState("");
  const submitPost = async (e) => {
    e.preventDefault();

    console.log("content", content);

    const { status, message } = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }).then((res) => res.json());

    if (status === "success") {
      setContent("");
      alert(message);
    }
  };

  return (
    <div className="bg-blue-50 md:h-minheightlg h-minheight">
      <div className="container mx-auto">
        <div className="flex flex-col gap-3 px-3 py-5 h-[600px] md:h-[800px]">
          <div className="flex flex-col flex-grow">
            <label htmlFor="content" className="mb-3 text-lg text-gray-700">
              Content
            </label>

            <textarea
              className="h-full p-3 text-lg transition-all duration-150 ease-linear rounded-lg outline-none resize-none md:p-6 focus:shadow-lg"
              id="content"
              placeholder="Enter post here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="p-3 mt-3 text-white transition-all duration-150 ease-linear bg-blue-500 rounded-lg shadow-lg outline-none active:scale-95 md:w-2/5"
            onClick={(e) => submitPost(e)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
