import DataTable from "../components/DataTable";

const Payment: React.FC = () => {
  const columns = [
    { title: "Đơn hàng", dataIndex: "order", key: "order" },
    { title: "Ngày tạo", dataIndex: "date", key: "date" },
  ];

  const dataSource = [
    { key: "1", order: "Xửát kho | PX.22848311.100069", date: "27/05" },
    { key: "2", order: "Nhập kho | PN.22848311.100069", date: "27/05" },
  ];

  return <DataTable columns={columns} dataSource={dataSource} />;
};

export default Payment;
