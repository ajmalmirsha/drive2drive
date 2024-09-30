import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import LoadingScreen from "./common/LoadingScreen/LoadingScreen";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <RouterProvider router={router} />
        <Toaster  />
      </Suspense>
    </>
  );
};

export default App;
