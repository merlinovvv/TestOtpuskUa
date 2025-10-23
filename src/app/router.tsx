import { createBrowserRouter } from "react-router-dom";
import { SearchPage } from "@/pages/search/SearchPage";
import { TourPage } from "@/pages/tour/TourPage";

export const router = createBrowserRouter([
  { path: "/", element: <SearchPage /> },
  { path: "/tour/:priceId/:hotelId", element: <TourPage /> },
]);
