import { AppModal } from "./AppModal";
import { useState } from "react";

export const ModalWebViewAlert = ({
  registerLink,
  onRedirect,
}: {
  registerLink: string;
  onRedirect: () => void;
}) => {
  const [isTryOpenBrowser, setIsTrysOpenBrowser] = useState(false);

  const handleOpenBrowser = () => {
    try {
      setIsTrysOpenBrowser(true);
      onRedirect();
    } catch (error) {
      console.error("WebView redirect failed:", error);

      // Fallback to programmatic link
      const link = document.createElement("a");
      link.href = registerLink;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard
      .writeText(registerLink)
      .then(() => {
        alert(
          "Đã sao chép URL vào clipboard. Mở trình duyệt và dán để tiếp tục."
        );
      })
      .catch(() => {
        prompt(
          "Sao chép URL và dán vào trình duyệt để tiếp tục.",
          registerLink
        );
      });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTryOpenBrowser) {
      handleCopyURL();
    } else {
      handleOpenBrowser();
    }
  };

  return (
    <AppModal
      header={<h4 className="font-weight-title">Thông báo</h4>}
      children={
        <p className="font-weight-body">
          Vui lòng mở bằng trình duyệt mặc định để tiếp tục.
        </p>
      }
      footer={
        <button
          type="button"
          id="BUTTON_OPEN_DEFAULT_BROWSER"
          onClick={handleClick}
          style={{
            backgroundColor: "#1B5DE0",
            color: "#fff",
            width: "100%",
            maxWidth: "100px",
            height: "40px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            margin: "0 auto",
            transform: "translateX(-50%)",
            marginLeft: "50%",
          }}
        >
          {isTryOpenBrowser ? "Copy URL" : "Mở trình duyệt"}
        </button>
      }
    />
  );
};
