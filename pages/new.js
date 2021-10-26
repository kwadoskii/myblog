import React from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { server } from "../configs/server";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Loading from "../components/Loading";
import ReactMde from "react-mde";
import { Remarkable } from "remarkable";
import "react-mde/lib/styles/css/react-mde-all.css";

export default function NewPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [source, setSource] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.replace("/api/auth/signin");
    },
  });

  const submitPost = async (e) => {
    e.preventDefault();

    if (!content) return alert("Post content is required");

    const { status, message } = await fetch(`${server}/api/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        excerpt,
        coverImage,
        source,
        arthur: session.user.id,
      }),
    }).then((res) => res.json());

    if (status === "success") {
      setTitle("");
      setContent("");
      setExcerpt("");
      setCoverImage("");
      setSource("");
      alert(message);
    } else {
      alert("Something went wrong try again.");
    }
  };

  const md = new Remarkable();
  const loadSuggestions = (text) => {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        const suggestions = [
          {
            preview: "Austin",
            value: "@austin",
          },
          {
            preview: "Andre",
            value: "@andre",
          },
          {
            preview: "Ife",
            value: "@ifeloluwa",
          },
          {
            preview: "Walata",
            value: "@walata",
          },
        ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
        accept(suggestions);
      }, 250);
    });
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>New post - Myblog</title>
      </Head>

      <div className="min-h-screen px-3 bg-blue-50">
        <div className="flex flex-col max-w-5xl pt-8 mx-auto">
          <div className="flex flex-col mb-3.5">
            <label htmlFor="title" className="mb-1.5 text-gray-700 font-semibold">
              Title <span className="font-medium text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              className="p-2.5 rounded-lg outline-none focus:ring-2 text-lg w-full mx-auto"
              placeholder="Post title"
            />
          </div>

          <label className="mb-1.5 text-gray-700 font-semibold">
            Content <span className="font-medium text-red-600">*</span>
          </label>
          <ReactMde
            value={content}
            onChange={setContent}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) => Promise.resolve(md.render(markdown))}
            childProps={{
              writeButton: {
                tabIndex: -1,
              },
            }}
            loadSuggestions={loadSuggestions}
          />

          <div className="flex flex-col mt-3.5">
            <label htmlFor="excerpt" className="mb-1.5 text-gray-700 font-semibold">
              Excerpt <span className="font-medium text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              id="excerpt"
              className="p-2.5 rounded-lg outline-none focus:ring-2 text-lg w-full mx-auto"
              placeholder="Brief summary of the post"
            />
          </div>
          <div className="flex my-3.5 gap-3 flex-col md:flex-row">
            <div className="flex flex-col w-full">
              <label htmlFor="source" className="mb-1.5 text-gray-700 font-semibold">
                Source URL
              </label>
              <input
                type="url"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                id="source"
                className="p-2.5 rounded-lg outline-none focus:ring-2 text-lg w-full mx-auto"
                placeholder="Link to source document"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="coverImage" className="mb-1.5 text-gray-700 font-semibold">
                Cover image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                id="coverImage"
                className="p-2.5 rounded-lg outline-none focus:ring-2 text-lg w-full mx-auto"
                placeholder="Link to cover image"
              />
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              className="flex-grow p-3 mt-3 text-white transition-all duration-150 ease-linear bg-blue-500 rounded-lg shadow-lg outline-none md:flex-grow-0 active:scale-95 md:w-2/5 hover:shadow-lg"
              onClick={(e) => submitPost(e)}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
