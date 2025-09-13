import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(true);

  useEffect(() => {
    const handleOffline = () => {
      setOnlineStatus(false);
    };

    const handleOnline = () => {
      setOnlineStatus(true);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // * boolean value
  return onlineStatus;
};

export default useOnlineStatus;
