import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
interface ILogin {
  email: string;
  password: string;
}

export default function login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILogin>({});
  const onSubmit = async (value) => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(value),
    });
console.log(res);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      const { error } = await res.json();
      setError(error || res.statusText);
    }
  };
  return (
    <div>
      {error && <p className='text-red-600 '>{error}</p>}
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2">
          <input type="email" placeholder="email" {...register("email")} />
        </div>
        <div className="border-2">
          <input
            type="password"
            placeholder="password"
            {...register("password")}
          />
        </div>
        <button className="border-2 bg-red-200" type="submit">
          click to Login
        </button>
      </form>
    </div>
  );
}
