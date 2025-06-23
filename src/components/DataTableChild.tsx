import { Table, Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import api from "../services/api";
import { convertResponse } from "../utils/helper";
import { toast } from "react-toastify";

// Cell có thể chỉnh sửa
const EditableCell = ({
  editing,
  dataIndex,
  record,
  children,
  onChangeEdit,
  ...restProps
}: any) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Input
          defaultValue={record[dataIndex]}
          onChange={(e) => onChangeEdit(dataIndex, e.target.value)}
        />
      ) : (
        children
      )}
    </td>
  );
};

const DataTableChild = ({ rootCategoryId }: { rootCategoryId: number }) => {
  const [data, setData] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>({});
  const [isCreateNew, setCreateNew] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    rootCategoryId: rootCategoryId,
    parentId: null, // Default to null for top-level subcategories
  });
  const [isLoading, setLoading] = useState(false);

  // Fetch subcategories
  const fetchSubCategories = async () => {
    try {
      const res = await api.get(`/categories/${rootCategoryId}`);
      const resultConvert = convertResponse(res);
      const categories = resultConvert.data?.rootCategory?.categories || [];
      setData(categories.map((item: any) => ({ ...item, key: item.id })));
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Lỗi khi lấy danh mục con!");
    }
  };

  // Create new subcategory
  const handleCreate = async () => {
    if (!newCategory.name) {
      toast.error("Vui lòng nhập tên danh mục!");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: newCategory.name,
        rootCategoryId: newCategory.rootCategoryId,
        parentId: newCategory.parentId || null,
      };
      const res = await api.post(`/categories`, payload);
      const resConvert = convertResponse(res);
      if (resConvert?.is_success) {
        toast.success(resConvert?.message || "Tạo danh mục con thành công!");
        setCreateNew(false);
        setNewCategory({
          name: "",
          rootCategoryId: rootCategoryId,
          parentId: null,
        });
        fetchSubCategories();
      } else {
        toast.error(resConvert?.message || "Tạo danh mục con thất bại!");
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Lỗi khi tạo danh mục con!"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [rootCategoryId]);

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    setEditingKey(record.key);
    setEditingData({ ...record });
  };

  const cancel = () => {
    setEditingKey(null);
    setEditingData({});
  };

  const onChangeEdit = (field: string, value: string) => {
    setEditingData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const save = async () => {
    try {
      const payload = {
        name: editingData.name,
        description: editingData.description,
        rootCategoryId: editingData.rootCategoryId ?? null,
        parentId: editingData.parentId ?? null,
      };

      await api.put(`/categories/${editingData.id}`, payload);
      toast.success("Cập nhật danh mục con thành công!");
      setEditingKey(null);
      setEditingData({});
      fetchSubCategories();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Lỗi khi cập nhật danh mục con!");
    }
  };

  const remove = async (id: number) => {
    try {
      const res = await api.delete(`/categories/${id}`);
      const resConvert = convertResponse(res);
      if (resConvert?.is_success) {
        toast.success(resConvert?.message || "Xóa danh mục con thành công!");
        fetchSubCategories();
      } else {
        toast.error(resConvert?.message || "Xóa danh mục con thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi khi xóa danh mục con!");
    }
  };

  const columns = [
    {
      title: "Tên danh mục con",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Button type="link" onClick={() => save()}>
              Lưu
            </Button>
            <Button type="link" onClick={cancel}>
              Huỷ
            </Button>
          </>
        ) : (
          <>
            <Button type="link" onClick={() => edit(record)}>
              Sửa
            </Button>
            <Button danger type="link" onClick={() => remove(record.id)}>
              Xoá
            </Button>
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) return col;
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        onChangeEdit,
      }),
    };
  });

  // Flatten the category tree to create a list for the Select component
  const getCategoryOptions = (categories: any[], prefix = "") => {
    let options: { value: number; label: string }[] = [];
    categories.forEach((category) => {
      options.push({
        value: category.id,
        label: `${prefix}${category.name}`,
      });
      if (category.children && category.children.length > 0) {
        options = [
          ...options,
          ...getCategoryOptions(category.children, `${prefix}--`),
        ];
      }
    });
    return options;
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button
          className="bg-primary text-white"
          onClick={() => setCreateNew(!isCreateNew)}
        >
          {isCreateNew ? "Hủy" : "+ Thêm danh mục con"}
        </Button>
      </div>
      {isCreateNew && (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <div className="flex flex-col gap-2">
            <div>
              <span>Tên danh mục con</span>
              <Input
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Nhập tên danh mục con"
              />
            </div>
            <div>
              <span>Danh mục cha</span>
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn danh mục cha (nếu có)"
                value={newCategory.parentId}
                onChange={(value) =>
                  setNewCategory((prev) => ({ ...prev, parentId: value }))
                }
                options={getCategoryOptions(data)}
              />
            </div>
            <Button
              className="bg-primary text-white mt-2"
              onClick={handleCreate}
              loading={isLoading}
            >
              Tạo mới
            </Button>
          </div>
        </div>
      )}
      <Table
        columns={mergedColumns}
        dataSource={data}
        rowClassName="editable-row"
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      />
    </div>
  );
};

export default DataTableChild;
