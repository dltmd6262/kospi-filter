import React from "react";
import { Layout, Typography } from "antd";
import CompanyTable from "./CompanyTable";
import { StockActionTypes } from "../store/stock/actions";
import { connect, ConnectedProps } from "react-redux";
import FilterInput from "./FilterInput";

const mapDispatchToProps = (dispatch: any) => ({
  updateAllMovingAverages: () =>
    dispatch({ type: StockActionTypes.UpdateAllMovingAverages })
});

const connector = connect(null, mapDispatchToProps);

const App = (props: ConnectedProps<typeof connector>) => {
  props.updateAllMovingAverages();

  return (
    <Layout>
      <Typography.Title>이평선이 모아지는 종목 찾기</Typography.Title>
      <FilterInput />
      <CompanyTable />
    </Layout>
  );
};

export default connector(App);
