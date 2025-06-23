import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTableRoot from "../DataTable";
import { convertResponse } from "../../utils/helper";
import CustomButton from "../CustomButton";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const Attribute = () => {
  const [rootAttribute, setRootAttribute] = useState<any[]>([]);
  const [isCreateNew, setCreateNew] = useState(false);
  const [dataRequest, setDataRequest] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);

  const fetchRootAttribute = async () => {
    try {
      const res = await api.get("/attribute-types");
      const result = convertResponse(res?.data);
      const data = result?.map((item: any) => ({
        ...item,
        key: item.id,
      }));
      setRootAttribute(data);
    } catch (error) {
      console.log("error == ", error);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await api.post(`/attribute-types`, dataRequest);
      const resConvert = convertResponse(res);
      if (resConvert?.is_success) {
        toast.success(resConvert?.message || "Tạo thành công !");
        fetchRootAttribute();
        setCreateNew(false);
      } else {
        toast.success(resConvert?.message || "Tạo thất bại !");
        setCreateNew(false);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRootAttribute();
  }, []);

  return (
    <div className="p-4">
      <div className="w-full flex justify-end items-center mb-4">
        <CustomButton
          onClick={() => {
            setCreateNew(!isCreateNew);
          }}
          text="+ Danh mục"
        ></CustomButton>
      </div>
      {isCreateNew && (
        <div className="w-full flex justify-end">
          <div className="bg-gray-200 w-1/2 p-[12px] mb-4 flex flex-col gap-2">
            <div className="flex flex-col">
              <span>Tên danh mục</span>
              <input
                onChange={(e: any) => {
                  setDataRequest((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                className="bg-white p-[6px] outline-none"
              ></input>
            </div>
            <div className="flex flex-col">
              <span>Mô tả danh mục</span>
              <input
                onChange={(e: any) => {
                  setDataRequest((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
                className="bg-white p-[6px] outline-none"
              ></input>
            </div>
            <button
              onClick={handleCreate}
              className="p-[6px] flex justify-center items-center bg-primary cursor-pointer hover:bg-opacity-90"
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} />
              ) : (
                <span className="text-white">Tạo mới</span>
              )}
            </button>
          </div>
        </div>
      )}
      <DataTableRoot
        onSaveEdit={() => fetchRootAttribute()}
        dataSource={rootAttribute}
        reload={fetchRootAttribute}
      />
    </div>
  );
};

export default Attribute;
