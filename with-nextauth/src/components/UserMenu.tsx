import React from "react";
import { Button } from "@/components/ui";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();
  return (
    <div className="ms-6">
      {session?.user ? (
        <>
          <div className="flex items-center">
            <span className="mr-3 text-blue-600">{session?.user.name}</span>
            <Button onClick={() => signOut()} variant="danger">
              Sign out
            </Button>
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => signIn()} variant="primary">
            Login
          </Button>
        </>
      )}
    </div>
  );
}
