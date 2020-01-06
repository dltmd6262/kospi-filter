import React from "react";
import { Input, Row, Checkbox, Col, Button } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { StockActionTypes } from "../store/stock/actions";
import { AppState } from "../store/types";
import styled from "styled-components";

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
    dispatch({ type: StockActionTypes.SetRecentlyTrending, payload: value }),
  clearCache: () => {
    dispatch({ type: StockActionTypes.ClearCache });
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

const StyledGapInput = styled(Input)`
  && {
    margin-left: 20px;
    max-width: 200px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  && {
    margin-left: 20px;
  }
`;

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

  const onClearCache = (e: any) => {
    props.clearCache();
  };

  return (
    <div>
      <StyledGapInput onChange={onGapChange} placeholder={"최고차이(%)"} />
      <StyledCheckbox
        checked={props.recentlyTrending}
        onChange={onTrendingChange}
      >
        {"5일 이평선 최고가"}
      </StyledCheckbox>
      <Button onClick={onClearCache}>{"새로고침"}</Button>
    </div>
  );
};

export default connector(FilterArea);
