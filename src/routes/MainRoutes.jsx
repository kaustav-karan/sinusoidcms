import Login from "../auth/Login";
import CmsImageListing from "../pages/CmsImageListing";
import EventRegistration from "../pages/EventRegistration";
import EventsListing from "../pages/EventsListing";
import Home from "../pages/Home";
import MarketingComponentConfig from "../pages/MarketingComponentConfig";
import OrVerification from "../pages/OutsideRegistrationVerfication";
import PlanLisitng from "../pages/PlanLisitng";
import PlanRegistrations from "../pages/PlanRegistrations";
import WorkshopListing from "../pages/WorkshopListing";

import React from "react";

export const MainRoutes = [
  {
    name: "Login",
    component: <Login />,
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
    header: true,
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
    header: true,
  },
  {
    name: "Plan Registrations",
    component: <PlanRegistrations />,
    path: "/planregistrations",
    nabarItem: true,
    header: true,
  },
  {
    name: "Plans",
    component: <PlanLisitng />,
    path: "/plans",
    nabarItem: true,
    header: true,
  },
  {
    name: "Marketing Component Config",
    component: <MarketingComponentConfig />,
    path: "/marketingcomponentconfig",
    nabarItem: true,
    header: false,
  },
  {
    name: "OR Verification",
    component: <OrVerification />,
    path: "/orverification",
    nabarItem: true,
    header: true,
  },
].sort((a, b) => a?.name.localeCompare(b?.name));
