import { useEffect, useState } from "react";
const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  // the origin of the current window means the protocol, host, and port of the current URL
  // for example, if the URL is https://example.com:3000/path, the origin is https://example.com:3000
  // and window.location.origin returns the origin of the current window which is the same as the origin of the current URL
  // if the window object is not available, it means that the code is running in the server-side
  // so we return an empty string
  // otherwise, we return the origin of the current window
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return "";
  return origin;
};

export default useOrigin;
