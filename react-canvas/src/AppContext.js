import React from "react";

const AppContext = React.createContext({
    isLoggedIn: false, 
    userId: "notLoggedIn",
    userObj: {},
    tokenId: "",
    ACCESS_TOKEN: ""
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;

export default AppContext;