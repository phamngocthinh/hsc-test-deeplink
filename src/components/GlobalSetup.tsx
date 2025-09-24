import { memo } from "react";
import { useAutoRedirectToDeviceBrowser } from "../hooks/useAutoRedirectToDefaultBrowser";
import { ModalWebViewAlert } from "./ModalWebViewAlert";

// This has to be a component and not a hook
// because it is used in _app.tsx with the provider code
// if it was a hook it would not have access to some of the provider data
const GlobalSetup = () => {
  const { openModalRedirect, registerLink, handleRedirection } =
    useAutoRedirectToDeviceBrowser();

  if (openModalRedirect) {
    return (
      <ModalWebViewAlert
        registerLink={registerLink}
        onRedirect={handleRedirection}
      />
    );
  }

  return null;
};

export default memo(GlobalSetup);
