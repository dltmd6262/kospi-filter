import React from "react";
import { Table, Button } from "antd";
import { AppState } from "../store/types";
import { connect, ConnectedProps } from "react-redux";
import { CompanyCode } from "../api";
import { findLargestGapPer, isRecentlyTrending } from "../util";

const { shell } = window.require("electron");

const columns = [
  {
    title: "No.",
    key: "idx",
    render: (_1: any, _2: any, idx: number) => <p>{idx + 1}</p>
  },
  { title: "종목코드", dataIndex: "code", key: "code" },
  { title: "이름", dataIndex: "name", key: "name" },
  { title: "5", dataIndex: "five", key: "five" },
  { title: "10", dataIndex: "ten", key: "ten" },
  { title: "20", dataIndex: "twenty", key: "twenty" },
  { title: "30", dataIndex: "thirty", key: "thirty" },
  { title: "60", dataIndex: "sixty", key: "sixty" },
  { title: "120", dataIndex: "onetwenty", key: "onetwenty" },
  { title: "240", dataIndex: "twoforty", key: "twoforty" },
  {
    title: "링크",
    dataIndex: "code",
    key: "link",
    render: (code: CompanyCode) => {
      return (
        <Button
          onClick={() =>
            shell.openExternal(
              `https://finance.naver.com/item/fchart.nhn?code=${code}`
            )
          }
        >
          링크
        </Button>
      );
    }
  }
];

const mapStateToProps = (state: AppState) => ({
  allMovingAverageInfo: state.stock.allMovingAverageInfo,
  gapThreshold: state.stock.gapThreshold,
  recentlyTrending: state.stock.recentlyTrending
});

const connector = connect(mapStateToProps);

const CompanyTable = (props: ConnectedProps<typeof connector>) => {
  const data = props.allMovingAverageInfo.filter(
    info =>
      findLargestGapPer(info) < props.gapThreshold &&
      (!props.recentlyTrending || isRecentlyTrending(info))
  );

  return (
    <Table
      rowKey={r => r.code}
      pagination={false}
      dataSource={data}
      columns={columns}
    />
  );
};

export default connector(CompanyTable);
