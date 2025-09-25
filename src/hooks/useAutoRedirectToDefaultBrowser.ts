import { useCallback, useEffect, useState } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { useIsWebView } from "./useIsWebView";
import { getRegisterLink } from "../utils/getRegisterLink";
import { redirectToDeviceBrowser } from "../utils/redirectToDeviceBrowser";
import { useLocation } from "react-router-dom";

// Skip zaloJSV2 check on Zalo WebView
declare global {
  interface Window {
    zaloJSV2: any;
  }
}

export const useAutoRedirectToDeviceBrowser = () => {
  const isWebView = useIsWebView();
  const { pathname } = useLocation();
  const [openModalRedirect, setOpenModalRedirect] = useState(false);
  const [registerLink, setRegisterLink] = useState("");

  const os = isAndroid ? "android" : isIOS ? "ios" : null;

  const handleRedirection = useCallback(async () => {
    if (typeof window === "undefined" || !os) return;

    try {
      // const url = window.location.origin;
      const registerLink = window.location.hostname + window.location.search;
      console.log("registerLink", registerLink);

      // const registerLink = getRegisterLink({ url, hasUtmSource: false });
      setRegisterLink(registerLink);

      await redirectToDeviceBrowser({ url: registerLink, os });
    } catch (error) {
      console.error("WebView redirect failed:", error);
    }
  }, [os]);

  useEffect(() => {
    window.zaloJSV2 = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      zalo_h5_event_handler: function (
        eventId: any,
        eventName: any,
        eventData: any
      ) {},
    };
  }, []);

  useEffect(() => {
    // if (!isWebView || !os) return;
    setOpenModalRedirect(true);
    handleRedirection();
  }, [isWebView, os, pathname, handleRedirection]);

  return {
    registerLink,
    openModalRedirect,
    handleRedirection,
  };
};
