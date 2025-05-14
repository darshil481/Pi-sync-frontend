import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/crm.routes";
import SnipperLoader from "../components/loader/snipper";

const RouteComponent = () => {
  return (
    <Routes>
      {publicRoutes &&
        publicRoutes.map((route, idx) =>
          route.component ? (
            <Route
              key={idx}
              path={route.path}
              element={
                <Suspense fallback={<SnipperLoader/>}>
                  {route.component}
                </Suspense>
              }
            />
          ) : null
        )}
    </Routes>
  );
};

export default RouteComponent;
