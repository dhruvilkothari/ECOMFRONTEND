import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => (currentCount = currentCount - 1));
    }, 1000);
    // once count =0
    count == 0 && history.push("/");
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="container p-5 text-center">
      <div class="lds-dual-ring"></div>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}

export default LoadingToRedirect;
