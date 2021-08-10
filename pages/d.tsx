import React, { useState } from "react";
import CreateUser from "src/components/dashboard/CreateUser";
import CreatePost from "src/components/dashboard/CreatePost";
import CreateProfession from "src/components/dashboard/createProfession";
export default function dashboard() {
  const [type, setType] = useState("");

  const choose = {
    user: <CreateUser />,
    post: <CreatePost />,
    prof: <CreateProfession />,
  };

  return (
    <div className="container">
      <div className="flex gap-4 cursor-pointer">
        <p
          onClick={() => {
            setType("user");
          }}
        >
          Create User
        </p>
        <p
          onClick={() => {
            setType("post");
          }}
        >
          Create Post
        </p>
        <p
          onClick={() => {
            setType("prof");
          }}
        >
          Create prof
        </p>
      </div>
      <hr />
      <div>
        <h2>Content</h2>
        {choose[type]}
      </div>
    </div>
  );
}
