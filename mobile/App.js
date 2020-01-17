import React from "react";
import Routes from "./src/routes";
import { StatusBar, YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Unrecognized WebSocket connection"]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D4BE7" />
      <Routes />
    </>
  );
}
