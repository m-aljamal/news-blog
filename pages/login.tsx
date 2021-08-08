import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
export default function login() {
  const [session] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);
  return (
    <div>
      <h2>Login</h2>
      {!session && (
        <>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}
