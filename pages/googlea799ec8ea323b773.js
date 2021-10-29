import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GooglePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/googlea799ec8ea323b773.html");
  }, []);

  return null;
}
