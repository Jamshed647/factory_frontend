"use client";

import React from "react";
import { Button, Space, Table } from "antd";
import type { TableProps } from "antd";
import TableTools from "./Tabletoolbar";
import { Edit, MinusIcon, Trash } from "lucide-react";
import UpdateUser from "./update/updateUser";

interface UserDataType {
  key: string;
  name: string;
  email: string;
  factories_count: number;
}

interface PaginatedData<T> {
  data: T[];
  pagination: {
    page: number;
    total: number;
    perPage: number;
    totalPages: number;
  };
}

const data: PaginatedData<UserDataType> = {
  data: [
    {
      key: "1",
      name: "John Brown",
      email: "john.brown@example.com",
      factories_count: 3,
    },
    {
      key: "2",
      name: "Jim Green",
      email: "jim.green@example.com",
      factories_count: 5,
    },
    {
      key: "3",
      name: "Joe Black",
      email: "joe.black@example.com",
      factories_count: 2,
    },
  ],
  pagination: {
    page: 1,
    total: 3,
    perPage: 10,
    totalPages: 1,
  },
};

const UserTable = () => {
  const [searchText, setSearchText] = React.useState("");
  const handleAction = (
    info: UserDataType,
    action: "update" | "disable" | "delete",
  ) => {
    console.log("Action:", info, action);
  };

  const columns: TableProps<UserDataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Factories Count",
      dataIndex: "factories_count",
      align: "center" as const,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "end" as const,
      render: (_, record) => (
        <Space>
          <UpdateUser info={record} />

          <Button
            style={{ height: "40px" }}
            disabled={record.factories_count === 0}
            onClick={() => handleAction(record, "disable")}
          >
            <MinusIcon strokeWidth={3} size={16} />
          </Button>
          <Button
            danger
            style={{ height: "40px" }}
            onClick={() => handleAction(record, "delete")}
          >
            <Trash strokeWidth={3} size={16} />
          </Button>
        </Space>
      ),
    },
  ];

  // TODO: Optional: filter data based on searchText
  const filteredData = data.data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <Table<UserDataType>
      columns={columns}
      dataSource={filteredData}
      bordered
      title={() => (
        <TableTools searchText={searchText} setSearchText={setSearchText} />
      )}
      pagination={{
        current: data.pagination.page,
        pageSize: data.pagination.perPage,
        total: data.pagination.total,
      }}
      rowKey="key"
    />
  );
};

export default UserTable;
