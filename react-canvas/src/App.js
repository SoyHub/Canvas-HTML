import React, { Component, Suspense } from "react";
import "./App.css";
import { AppProvider } from "./AppContext";
import { BrowserRouter } from "react-router-dom";
import Loader from "./Loader";
import Layout from "./Layout";

export default class App extends Component {
  state = {
    isLoggedIn: false,
    userId: "notLoggedIn",
    userObj: {},
    tokenId: "",
    ACCESS_TOKEN: "",
  };

  render() {
    return (
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <AppProvider value={this.state}>

          <Layout/>


          </AppProvider>
        </BrowserRouter>
      </Suspense>
    );
  }
}
