"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Loginform from "@/components/LoginForm";

import { NavigationEvents } from "@/utils/navigation-events";

export default function LoginPage() {
  const router = useRouter();
  const { searchParams } = NavigationEvents();

  const { data: session } = useSession();

  /* form values */
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  /* Callback url */
  const callbackUrl = decodeURI(
    (searchParams.get("callback") as string) ?? "/"
  );

  /* Form submitting ... */
  const handleFormSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const result = await signIn("credentials", {
      email: authState.email,
      password: authState.password,
      callbackUrl: callbackUrl ?? "/",
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    }

    if (result?.ok) {
      router.replace(callbackUrl);
    }
  };

  /* if session redirect home else show form  */
  if (!session) {
    return (
      <div className="w-[500px] bg-white shadow-md rounded-lg p-5 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Loginform
          onSubmit={handleFormSubmit}
          setState={setAuthState}
          authState={authState}
          error={error}
        />
        {/* 
        <form onSubmit={handleFormSubmit}>
          <div className="mt-5">
            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
          </div>
  
          <div className="mt-5">
            <Input
              type="password"
              label="Password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Button variant="primary" type="submit" size="lg" className="w-full">
              Login
            </Button>
          </div>
          {!!error && <p className="text-red-600 mt-5">ERROR: {error}</p>}
        </form>
        */}
      </div>
    );
  } else {
    router.replace("/");
  }
}
