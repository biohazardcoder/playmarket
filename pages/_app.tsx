import "@/styles/globals.css";
import { configureStore } from "@reduxjs/toolkit";
import type { AppProps } from "next/app";
import UserReducer from "../toolkits/UserSlicer";
import GamesReducer from "../toolkits/ProductSlicer";
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";

import Header from "@/components/Header";


const store = configureStore({
  reducer: {
    user: UserReducer,
    products: GamesReducer,
  },
});

export default function App({ Component, pageProps, }: AppProps) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
}
