import React from "react";
import { Layout } from "antd";
import { getDailyTradeHistory } from "./api";

const App: React.FC = () => {
  return (
    <Layout>
      <p>이평선이 모아지는 종목 찾기</p>
    </Layout>
  );
};

export default App;
