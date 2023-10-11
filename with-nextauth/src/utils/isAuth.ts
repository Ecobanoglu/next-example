import { redirect } from "next/navigation";

const isAuth = (session: any, roles: string[]) => {
  if (session == null || roles.indexOf(session?.user?.role) == -1) {
    return redirect("/account/login");
  }
};

export default isAuth;
