import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
function LoadingToRedirect() {
  let history = useHistory();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setTimeout(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    if (count === 0) {
      history.push("/login");
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;
