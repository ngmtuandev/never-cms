import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { useState } from "react";
import { Button, Input } from "antd";

const Orders: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    { title: "Đơn hàng", dataIndex: "order", key: "order" },
    { title: "Nhập kho", dataIndex: "warehouse", key: "warehouse" },
    { title: "Xuất kho", dataIndex: "export", key: "export" },
    { title: "Tồn kho", dataIndex: "stock", key: "stock" },
  ];

  const dataSource = [
    { key: "1", order: "DH 1081175728", warehouse: 1, export: 1, stock: 1 },
    { key: "2", order: "DH 117516428", warehouse: 1, export: 1, stock: 1 },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          + Thêm ĐH
        </Button>
      </div>
      <DataTable columns={columns} dataSource={dataSource} />
      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Thêm Đơn Hàng"
      >
        <Input placeholder="Mã đơn hàng" className="mb-4" />
      </Modal>
    </div>
  );
};

export default Orders;
