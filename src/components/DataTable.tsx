import { Button, Input, Table } from "antd";
import { useState } from "react";
import DataTableChild from "./DataTableChild";
import api from "../services/api";
import { convertResponse } from "../utils/helper";
import { toast } from "react-toastify";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
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

const DataTableRoot = ({ dataSource, onSaveEdit }: any) => {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any>({});

  const isEditing = (record: any) => record.key === editingKey;

  const edit = (record: any) => {
    setEditingKey(record.key);
    setEditingData({ ...record });
  };

  const handleUpdateRootCategory = async (data: any) => {
    try {
      await api.put(`/root-categories/${data.id}`, data);
    } catch (error) {
      console.log("error ==== ", error);
      toast("Cập nhập lỗi");
    }
  };

  const save = async () => {
    try {
      await handleUpdateRootCategory(editingData);
      setEditingKey(null);
      setEditingData({});
      onSaveEdit();
      onSaveEdit && onSaveEdit(editingData);
    } catch (error) {
      console.error("Save error: ", error);
    }
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const handleDelete = async (id: any) => {
    try {
      const res = await api.delete(`/root-categories/${id}`);
      const resConvert = convertResponse(res);
      if (resConvert?.is_success) {
        toast.success(resConvert?.message || "Xoá thành công !");
        onSaveEdit();
      } else {
        toast.success(resConvert?.message || "Xoá bị lỗi !");
      }
    } catch (error) {
      toast.success("Xoá bị lỗi !");
    }
  };

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      editable: true,
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save()} type="link">
              Lưu
            </Button>
            <Button onClick={cancel} type="link">
              Huỷ
            </Button>
          </span>
        ) : (
          <span>
            <Button
              disabled={editingKey !== null}
              onClick={() => edit(record)}
              type="link"
            >
              Sửa
            </Button>
            <Button danger onClick={() => handleDelete(record.id)} type="link">
              Xoá
            </Button>
          </span>
        );
      },
    },
  ];

  const onChangeEdit = (field: string, value: string) => {
    setEditingData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  return (
    <Table
      columns={mergedColumns}
      components={{ body: { cell: EditableCell } }}
      dataSource={dataSource}
      rowClassName="editable-row"
      expandable={{
        expandedRowRender: (record) => (
          <DataTableChild rootCategoryId={record.id} />
        ),
      }}
    />
  );
};

export default DataTableRoot;
