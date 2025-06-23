import { Table } from "antd";

interface TabContentProps {
  columns: any[];
  dataSource: any[];
}

const TabContent: React.FC<TabContentProps> = ({ columns, dataSource }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default TabContent;
