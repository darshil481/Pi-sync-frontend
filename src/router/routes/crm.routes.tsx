import React from "react";

const DashBoard = React.lazy(() => import("../../pages/dashboard/index"));

export const publicRoutes = [
   {path:'/',component:<DashBoard />}
]

export const privateRoutes = []