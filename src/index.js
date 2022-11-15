import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DeckGLVancouver from "./routes/DeckGLVancouver";
import ErrorPage from "./routes/ErrorPage";
import SearchingLanguages from "./routes/SearchingLanguages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "deckGL/vancouver",
        element: <DeckGLVancouver />,
      },
      {
        path: "programmers/searchingLanguages",
        element: <SearchingLanguages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
