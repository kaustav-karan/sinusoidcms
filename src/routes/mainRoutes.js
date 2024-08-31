import EventsListing from "../pages/EventsListing";
import Home from "../pages/Home";
import WorkshopListing from "../pages/WorkshopListing";

export const mainRoutes = [
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
    name: "Webnairs",
    component: <WorkshopListing />,
    path: "/webnairs",
    nabarItem: true,
  },
];
