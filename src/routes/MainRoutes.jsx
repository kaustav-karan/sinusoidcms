import Login from "../auth/Login";
import CmsImageListing from "../pages/CmsImageListing";
import EventRegistration from "../pages/EventRegistration";
import EventsListing from "../pages/EventsListing";
import Home from "../pages/Home";
import WorkshopListing from "../pages/WorkshopListing";

import React from "react";

export const MainRoutes = [
  {
    name: "Login",
    component:  <Login />,
    path: "/auth",
  },
  {
    name: "Home",
    component: <Home />,
    path: "/",
  },
  {
    name: "Events",
    component: <EventsListing />,
    path: "/events",
    nabarItem: true,
  },
  {
    name: "Workshops",
    component: <WorkshopListing />,
    path: "/workshops",
    nabarItem: true,
  },
  {
    name: "Images",
    component: <CmsImageListing />,
    path: "/imagelisting",
    nabarItem: true,
  },
  {
    name: "Event Registrations",
    component: <EventRegistration />,
    path: "/eventregistration",
    nabarItem: true,
  }
];

