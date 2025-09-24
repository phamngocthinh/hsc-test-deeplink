import React, { FC, PropsWithChildren, ReactNode } from "react";
import ReactDOM from "react-dom";

interface AppModalProps {
  header: ReactNode;
  footer: ReactNode;
  open?: boolean;
  onClose?: () => void;
  [key: string]: any;
}

export const AppModal: FC<AppModalProps & PropsWithChildren> = ({
  header,
  footer,
  children,
  open = true,
  onClose,
  ...props
}) => {
  if (!open) return null;

  const backdropStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1300,
  };

  const modalStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: 8,
    maxWidth: "80vw",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    padding: "20px 16px",
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const modalContent = (
    <div
      className="modal-backdrop"
      style={backdropStyle}
      onClick={handleBackdropClick}
      {...props}
    >
      <div
        className="modal-main"
        style={modalStyle}
        role="dialog"
        aria-modal="true"
      >
        <div style={{ textAlign: "center" }}>{header}</div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
