import { useState } from "react";
import { Row, Button, Table, Space, Popconfirm } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";

import {
  createUser,
  updateUser,
  deleteUser,
} from "../../../redux/slicers/user.slice";

const UserListPage = () => {
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.user);

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Space>
          <Button
            onClick={() => {
              setIsShowUpdateModal(true);
              setUpdateData(item);
            }}
          >
            Update
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger ghost>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleCreateUser = (values) => {
    // setTableData([
    //   {
    //     id: uuidv4(),
    //     name: values.name,
    //     age: values.age,
    //     address: values.address,
    //   },
    //   ...tableData,
    // ]);
    dispatch(
      createUser({
        id: uuidv4(),
        name: values.name,
        age: values.age,
        address: values.address,
      })
    );
    setIsShowCreateModal(false);
  };

  const handleUpdateUser = (id, values) => {
    // const newTableData = [...tableData];
    // const index = tableData.findIndex((item) => item.id === id);
    // const newUser = {
    //   id: id,
    //   ...values,
    // };
    // newTableData.splice(index, 1, newUser);
    // setTableData(newTableData);
    dispatch(updateUser({ id: id, values: values }));
    setIsShowUpdateModal(false);
  };

  const handleDeleteUser = (id) => {
    // Cách 1 (Nhanh hơn khi có sẵn index)
    // const newTableData = [...tableData];
    // const index = tableData.findIndex((item) => item.id === id);
    // newTableData.splice(index, 1);
    // Cách 2
    // const newTableData = tableData.filter((item) => item.id !== id);
    // setTableData(newTableData);
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <h3>User list</h3>
        <Button type="primary" onClick={() => setIsShowCreateModal(true)}>
          Create user
        </Button>
      </Row>
      <Table dataSource={userList} columns={tableColumns} pagination={false} />
      <CreateModal
        isShowCreateModal={isShowCreateModal}
        setIsShowCreateModal={setIsShowCreateModal}
        handleCreateUser={handleCreateUser}
      />
      <UpdateModal
        isShowUpdateModal={isShowUpdateModal}
        setIsShowUpdateModal={setIsShowUpdateModal}
        handleUpdateUser={handleUpdateUser}
        updateData={updateData}
      />
    </div>
  );
};

export default UserListPage;
