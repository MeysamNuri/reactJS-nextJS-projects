import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (
            <h3 className="text-center">چیزی پیدا نکردیم متاسفانه 🤗 ...</h3>
        ),
        children: [
            {
                path: "/",
                element: <App />,
            },
        ],
    },
]);
