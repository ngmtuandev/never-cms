import { Table, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../services/api";

const DataTableCategory = ({ rootCategoryId }: { rootCategoryId: string }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [allCategories, setAllCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    const res = await api.get(`/categories/${rootCategoryId}`);
    console.log("res ", res);
    const data = res.data.data.map((c: any) => ({ ...c, key: c.id }));
    setCategories(data);
    setAllCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const save = async (id: string) => {
    await api.patch(`/categories/${id}`, formData);
    setEditingId(null);
    fetchCategories();
  };

  const remove = async (id: string) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  const columns = [
    {
      title: "Tên danh mục con",
      dataIndex: "name",
      render: (text: any, record: any) =>
        editingId === record.id ? (
          <Input
            defaultValue={text}
            onChange={(e) =>
              setFormData((prev: any) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Parent",
      dataIndex: "parentId",
      render: (parentId: any, record: any) =>
        editingId === record.id ? (
          <Select
            defaultValue={parentId || undefined}
            style={{ width: 200 }}
            onChange={(value) =>
              setFormData((prev: any) => ({ ...prev, parentId: value }))
            }
            allowClear
          >
            {allCategories
              .filter((cat) => cat.id !== record.id)
              .map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
          </Select>
        ) : (
          allCategories.find((cat) => cat.id === parentId)?.name || ""
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) =>
        editingId === record.id ? (
          <>
            <Button type="link" onClick={() => save(record.id)}>
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
            <Button danger type="link" onClick={() => remove(record.id)}>
              Xoá
            </Button>
          </>
        ),
    },
  ];

  return <div>fdfdsf</div>;
};

export default DataTableCategory;
