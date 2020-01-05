import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { configureStore } from "./store";
import { Provider } from "react-redux";

const store = configureStore();
const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<RootApp />, document.getElementById("root"));
