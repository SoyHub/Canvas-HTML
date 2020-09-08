import React from "react";
import { AppConsumer } from "./AppContext";
import Home from "./Home";

function Layout() {
  return <AppConsumer>{() => <Home />}</AppConsumer>;
}

export default Layout;
