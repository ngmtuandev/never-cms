import TabContent from "../components/TabContent";

const Overview: React.FC = () => {
  const columns = [
    { title: "Sản phẩm", dataIndex: "product", key: "product" },
    { title: "Chờ nhập", dataIndex: "waiting", key: "waiting" },
    { title: "Đã nhập", dataIndex: "imported", key: "imported" },
    { title: "Tồn kho", dataIndex: "stock", key: "stock" },
    { title: "Cần điều", dataIndex: "adjustment", key: "adjustment" },
  ];

  const dataSource = [
    {
      key: "1",
      product: "Aespa - MINI CABINET PACKAGE",
      waiting: 0,
      imported: 0,
      stock: 1,
      adjustment: 1,
    },
    {
      key: "2",
      product: "Aespa - CD SMART TOK - DRAMA",
      waiting: 0,
      imported: 0,
      stock: 1,
      adjustment: 1,
    },
  ];

  return <TabContent columns={columns} dataSource={dataSource} />;
};

export default Overview;
