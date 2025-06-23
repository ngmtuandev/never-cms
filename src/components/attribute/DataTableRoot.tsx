import { Table, Button, Input } from "antd";
import { useState } from "react";
import api from "../../services/api";
import DataTableCategory from "./DataTableCategory";

const DataTableRoot = ({ data, reload }: any) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const handleSave = async (id: string) => {
    await api.patch(`/root-categories/${id}`, editForm);
    setEditingId(null);
    reload();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/root-categories/${id}`);
    reload();
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      render: (text: any, record: any) =>
        editingId === record.id ? (
          <Input
            defaultValue={text}
            onChange={(e) =>
              setEditForm((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (text: any, record: any) =>
        editingId === record.id ? (
          <Input
            defaultValue={text}
            onChange={(e) =>
              setEditForm((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) =>
        editingId === record.id ? (
          <>
            <Button type="link" onClick={() => handleSave(record.id)}>
              Lưu
            </Button>
            <Button type="link" onClick={() => setEditingId(null)}>
              Huỷ
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => setEditingId(record.id)}>
              Sửa
            </Button>
            <Button danger type="link" onClick={() => handleDelete(record.id)}>
              Xoá
            </Button>
          </>
        ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      expandable={{
        expandedRowRender: (record) => (
          <DataTableCategory rootCategoryId={record.id} />
        ),
        rowExpandable: () => true,
      }}
    />
  );
};

export default DataTableRoot;
