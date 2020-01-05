import React from "react";
import { Layout, Typography } from "antd";
import CompanyTable from "./CompanyTable";
import { StockActionTypes } from "../store/stock/actions";
import { connect, ConnectedProps } from "react-redux";

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateAllMovingAverages: () =>
      dispatch({ type: StockActionTypes.UpdateAllMovingAverages })
  };
};

const connector = connect(null, mapDispatchToProps);

const App = (props: ConnectedProps<typeof connector>) => {
  props.updateAllMovingAverages();

  return (
    <Layout>
      <Typography.Title>이평선이 모아지는 종목 찾기</Typography.Title>
      <CompanyTable />
    </Layout>
  );
};

export default connector(App);
