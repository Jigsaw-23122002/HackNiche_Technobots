import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("userType");
    router.push("/");
  }, []);
  return <div></div>;
}
