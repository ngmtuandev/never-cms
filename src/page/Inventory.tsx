import DataTable from "../components/DataTable";

const Inventory: React.FC = () => {
  const columns = [
    { title: "Sản phẩm", dataIndex: "product", key: "product" },
    { title: "SKU / SP", dataIndex: "sku", key: "sku" },
    { title: "Tạo phiếu xuất", dataIndex: "exportTicket", key: "exportTicket" },
    { title: "Tạo phiếu nhập", dataIndex: "importTicket", key: "importTicket" },
  ];

  const dataSource = [
    {
      key: "1",
      product: "Xửát kho | PX.22848311.100069",
      sku: "1 SKU / 1 SP",
      exportTicket: true,
      importTicket: true,
    },
    {
      key: "2",
      product: "Nhập kho | PN.22848311.100069",
      sku: "1 SKU / 1 SP",
      exportTicket: true,
      importTicket: true,
    },
  ];

  return <DataTable columns={columns} dataSource={dataSource} />;
};

export default Inventory;
