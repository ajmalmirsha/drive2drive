import { useEffect, useState } from "react";
import style from "./loadingScreen.module.css";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.container}>
      <span className={style.loader}></span>
      <h3>Loading {progress}%</h3>
    </div>
  );
};

export default LoadingScreen;
