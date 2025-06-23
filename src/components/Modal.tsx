import { Modal as AntModal, Button } from "antd";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  width?: any;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  className = "",
  width,
}) => {
  const customTitle = (
    <div className="text-center bg-[#fc0054] text-white py-4 uppercase">
      {title}
    </div>
  );

  return (
    <AntModal
      title={customTitle}
      open={visible}
      onCancel={onClose}
      footer={
        [
          // <Button key="back" onClick={onClose}>
          //   Cancel
          // </Button>,
          // <Button key="submit" type="primary">
          //   Save
          // </Button>,
        ]
      }
      className={`custom-modal ${className}`} // Loại bỏ p-0 khỏi đây
      width={width ? `${width}%` : "90%"}
      style={{ maxWidth: "90vw", top: 70 }}
    >
      <div className="p-0 overflow-y-scroll">{children}</div>{" "}
      {/* Thêm div với p-0 cho nội dung */}
    </AntModal>
  );
};

export default Modal;
