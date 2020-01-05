import React from "react";
import { Input } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { StockActionTypes } from "../store/stock/actions";

const mapDispatchToProps = (dispatch: any) => ({
  setGapThreshold: (threshold: number) =>
    dispatch({
      type: StockActionTypes.SetGapThreshold,
      payload: threshold
    })
});

const connector = connect(null, mapDispatchToProps);

const CompanyTable = (props: ConnectedProps<typeof connector>) => {
  const onChange = (e: any) => {
    if (e.target.value === "") {
      props.setGapThreshold(Infinity);
      return;
    }

    let threshold = parseInt(e.target.value);
    if (!isNaN(threshold)) {
      props.setGapThreshold(threshold);
    }
  };

  return <Input onChange={onChange} placeholder={"최고차이(원)"} />;
};

export default connector(CompanyTable);
