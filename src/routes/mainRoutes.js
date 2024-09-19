import CmsImageListing from "../pages/CmsImageListing";
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
];
