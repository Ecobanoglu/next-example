import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import UserCard from "@/components/UserCard";
import isAuth from "@/utils/isAuth";
import { getServerSession } from "next-auth";
import React from "react";

export default async function UserDashboard() {
  const session: CustomSession | null = await getServerSession(authOptions);

  /* Users with "admin" or "user" roles can access this page.  */
  const roles: string[] = ["admin", "user"];
  isAuth(session, roles);
  return (
    <>
      {session && <UserCard user={session?.user} pagetype={"Home"} />}
      <h2 className="text-5xl">This is a user page</h2>
    </>
  );
}
