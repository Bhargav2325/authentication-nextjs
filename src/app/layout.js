"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./store/store";

const quicksandRegular = localFont({
  src: "./fonts/Quicksand-Regular.ttf",
  variable: "--font-quicksand-regular",
  weight: "100 900",
});
const quicksandBold = localFont({
  src: "./fonts/Quicksand-Bold.ttf",
  variable: "--font-quicksand-Bold",
  weight: "700",
});
const quicksandMedium = localFont({
  src: "./fonts/Quicksand-Medium.ttf",
  variable: "--font-quicksand-medium",
  weight: "500",
});
const quicksandLight = localFont({
  src: "./fonts/Quicksand-Light.ttf",
  variable: "--font-quicksand-light",
  weight: "300",
});
const quicksandSemiBold = localFont({
  src: "./fonts/Quicksand-SemiBold.ttf",
  variable: "--font-quicksand-semibold",
  weight: "600",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Create new Next JS</title>
      </head>
      <body
        className={` ${quicksandRegular.variable} ${quicksandSemiBold.variable} ${quicksandLight.variable} ${quicksandMedium.variable} antialiased`}
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
