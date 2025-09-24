import React from "react";

type ExternalPageProps = {
  src: string;
  title?: string;
};

const ExternalPage: React.FC<ExternalPageProps> = ({
  src,
  title = "External Page",
}) => {
  const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const iframeStyle: React.CSSProperties = {
    flex: 1,
    width: "100%",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <iframe
        title={title}
        src={src}
        style={iframeStyle}
        allow="clipboard-read; clipboard-write; fullscreen;"
      />
    </div>
  );
};

export default ExternalPage;
