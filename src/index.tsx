import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { configureStore } from "./store";
import { Provider } from "react-redux";
import "antd/dist/antd.css";

// const rust = import("moving_average_calculator");
// rust.then(m =>
//   console.log(
//     1111,
//     m.calculate_moving_average({
//       name: "yes",
//       trade_infos: [{ highest: 10, lowest: 10 }]
//     })
//   )
// );

const store = configureStore();
const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<RootApp />, document.getElementById("root"));
