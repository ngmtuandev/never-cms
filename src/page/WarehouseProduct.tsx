import { useState } from "react";
import CustomButton from "../components/CustomButton";
import Modal from "../components/Modal";
import Category from "../components/category/Category";
import Attribute from "../components/category/Category";

const LIST_TAB = [
  {
    label: "Sản phẩm",
    key: "PRODUCT",
  },
  {
    label: "Danh mục",
    key: "CATEGORY",
  },
  {
    label: "Thuộc tính sản phẩm",
    key: "ATTRIBUTE",
  },
  {
    label: "Loại sản phẩm",
    key: "VARIENT",
  },
];

const WarehouseProduct = () => {
  const [isShowDropdown, setShowDropdown] = useState(false);
  const [isModalVisibleProduct, setIsModalVisibleProduct] = useState(false);
  const [isModalVisibleRootCategory, setIsModalVisibleRootCategory] =
    useState(false);
  const [isModalVisibleVarient, setIsModalVisibleVarient] = useState(false);
  const [isModalVisiblAttribute, setIsModalVisiblAttribute] = useState(false);

  return (
    <>
      <div className="h-full w-full p-6">
        <div className="w-full flex justify-between">
          <div>
            <span className="uppercase text-[#fc0054] text-2xl font-semibold">
              Kho & Sản phẩm
            </span>
          </div>
          <div className="relative flex items-center gap-6 justify-between">
            <CustomButton text="Báo cáo"></CustomButton>
            <CustomButton
              onClick={() => {
                setShowDropdown(!isShowDropdown);
              }}
              text="+ Thao tác"
            ></CustomButton>
            {isShowDropdown && (
              <div className="absolute flex flex-col gap-4 bg-white mt-1 border-[1px] border-gray-200 shadow-lg p-[16px] rounded-lg w-fit right-0 top-full">
                {LIST_TAB.map((item: any, index: number) => {
                  return (
                    <div
                      className="cursor-pointer hover:text-primary"
                      key={index}
                      onClick={() => {
                        if (item?.key === "PRODUCT") {
                          setIsModalVisibleProduct(true);
                        }
                        if (item?.key === "CATEGORY") {
                          setIsModalVisibleRootCategory(true);
                        }
                        if (item?.key === "ATTRIBUTE") {
                          setIsModalVisiblAttribute(true);
                        }
                        if (item?.key === "VARIENT") {
                          setIsModalVisibleVarient(true);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisibleProduct}
        onClose={() => setIsModalVisibleProduct(false)}
        className="h-screen"
        title="Sản Phẩm"
      >
        <div className="h-[80vh]">
          <p>This is the modal content. Add your form or data here.</p>
        </div>
      </Modal>
      <Modal
        visible={isModalVisiblAttribute}
        onClose={() => setIsModalVisiblAttribute(false)}
        className="h-screen"
        title="Thuộc tính sản phẩm"
      >
        <div className="h-[80vh] px-[24px] py-[18px]">
          <Attribute></Attribute>
        </div>
      </Modal>
      <Modal
        visible={isModalVisibleRootCategory}
        onClose={() => setIsModalVisibleRootCategory(false)}
        className="h-screen"
        title="Danh mục"
      >
        <div className="h-[80vh] px-[24px] py-[18px]">
          <Category></Category>
        </div>
      </Modal>
      <Modal
        visible={isModalVisibleVarient}
        onClose={() => setIsModalVisibleVarient(false)}
        className="h-screen"
        title="Lại sản phẩm"
      >
        <div className="h-[80vh]">
          <p>This is the modal content. Add your form or data here.</p>
        </div>
      </Modal>
    </>
  );
};

export default WarehouseProduct;
