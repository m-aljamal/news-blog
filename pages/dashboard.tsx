import React, { useState } from "react";
import CreateUser from "src/components/dashboard/CreateUser";
import CreatePost from "src/components/dashboard/CreatePost";
export default function dashboard() {
  const [type, setType] = useState("");

  const choose = {
    user: <CreateUser />,
    post: <CreatePost />,
  };

  return (
    <div className='container'>
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
      </div>
      <hr />
      <div>
        <h2>Content</h2>
        {choose[type]}
      </div>
    </div>
  );
}
