import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { WatchlistProvider } from "./context/WatchlistContext";

import "./styles/global.css";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <React.StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <FavoriteProvider>

                    <WatchlistProvider>

                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                        />

                        <App />

                    </WatchlistProvider>

                </FavoriteProvider>

            </AuthProvider>

        </BrowserRouter>

    </React.StrictMode>
);