import React from "react";
import { Input, Row, Checkbox, Col } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { StockActionTypes } from "../store/stock/actions";
import { AppState } from "../store/types";

const mapStateToProps = (state: AppState) => ({
  recentlyTrending: state.stock.recentlyTrending
});

const mapDispatchToProps = (dispatch: any) => ({
  setGapThreshold: (threshold: number) =>
    dispatch({
      type: StockActionTypes.SetGapThreshold,
      payload: threshold
    }),
  setRecentlyTrending: (value: boolean) =>
    dispatch({ type: StockActionTypes.SetRecentlyTrending, payload: value })
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const FilterArea = (props: ConnectedProps<typeof connector>) => {
  const onGapChange = (e: any) => {
    if (e.target.value === "") {
      props.setGapThreshold(Infinity);
      return;
    }

    let threshold = parseInt(e.target.value);
    if (!isNaN(threshold)) {
      props.setGapThreshold(threshold);
    }
  };

  const onTrendingChange = (e: any) => {
    props.setRecentlyTrending(e.target.checked);
  };

  return (
    <Row>
      <Col span={12}>
        <Input onChange={onGapChange} placeholder={"최고차이(%)"} />
      </Col>
      <Col span={6} offset={1}>
        <Checkbox checked={props.recentlyTrending} onChange={onTrendingChange}>
          {"5일 이평선 최고가"}
        </Checkbox>
      </Col>
    </Row>
  );
};

export default connector(FilterArea);
