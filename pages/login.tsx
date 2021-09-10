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
    <div className="  text-center mt-10 ">
      <div>
        <h2 className="text-lg text-blue ">تسجيل الدخول </h2>
        {!session && (
          <>
            <button onClick={() => signIn("google")} className="mt-4">
              <div>
                <img src="/google.png" className="w-20 h-20" />
                <p className="mt-2">Google</p>
              </div>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
