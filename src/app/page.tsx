"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const JangosoftPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null; // Or Loader
};

export default JangosoftPage;
