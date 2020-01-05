import React from "react";
import { Table } from "antd";
import { AppState } from "../store/types";
import { connect, ConnectedProps } from "react-redux";

const columns = [
  { title: "종목코드", dataIndex: "code", key: "code" },
  { title: "이름", dataIndex: "name", key: "name" },
  { title: "5", dataIndex: "five", key: "five" },
  { title: "10", dataIndex: "ten", key: "ten" },
  { title: "20", dataIndex: "twenty", key: "twenty" },
  { title: "30", dataIndex: "thirty", key: "thirty" },
  { title: "60", dataIndex: "sixty", key: "sixty" },
  { title: "120", dataIndex: "onetwenty", key: "onetwenty" },
  { title: "240", dataIndex: "twoforty", key: "twoforty" }
];

const mapStateToProps = (state: AppState) => ({
  allMovingAverageInfo: state.stock.allMovingAverageInfo
});

const connector = connect(mapStateToProps);

const CompanyTable = (props: ConnectedProps<typeof connector>) => {
  const data = props.allMovingAverageInfo;
  return (
    <Table
      rowKey={() => Math.random.toString()}
      pagination={false}
      dataSource={data}
      columns={columns}
    />
  );
};

export default connector(CompanyTable);
