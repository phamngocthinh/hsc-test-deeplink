// export const redirectToDeviceBrowser = async ({
//   url,
//   os,
// }: {
//   url: string;
//   os: "android" | "ios";
// }) => {
//   if (typeof window === "undefined") {
//     return;
//   }

//   const urlWithoutProtocol = url.replace(/^https?:\/\//, "");

//   try {
//     if (os === "ios") {
//       // Try safari - 15, 17, 18
//       const iosUrl = `x-safari-${url}`;
//       window.location.href = iosUrl;

//       // Try safari old way
//       await new Promise((r) => setTimeout(r, 1000));
//       const iosOldUrl = `com-apple-mobilesafari-tab:${url}`;
//       window.location.href = iosOldUrl;

//       return false;
//     }

//     if (os === "android") {
//       const androidIntent = `intent://${urlWithoutProtocol}#Intent;scheme=http;package=com.android.chrome;end;`;
//       window.location.href = androidIntent;
//       return false;
//     }

//     window.location.href = url;
//     return true;
//   } catch (error) {
//     window.location.href = url;
//   }
// };

const DOWNLOAD_HSC_APPSTORE =
  "https://apps.apple.com/vn/app/lotus-trade/id6476192374";
const DOWNLOAD_HSC_GOOGLE_PLAY =
  "https://play.google.com/store/apps/details?id=vn.com.hsc.lotus.trading";

export const redirectToDeviceBrowser = async ({
  url,
  os,
}: {
  url: string;
  os: "android" | "ios";
}) => {
  if (typeof window === "undefined") {
    return;
  }
  const appSchemeUrl = `hsconeuat://${url}`;
  const storeUrl =
    os === "ios" ? DOWNLOAD_HSC_APPSTORE : DOWNLOAD_HSC_GOOGLE_PLAY;

  // Trình duyệt không ném lỗi khi mở custom scheme.
  // Chiến lược: điều hướng tới scheme, đợi ngắn; nếu trang không bị ẩn (không chuyển app) thì đưa tới store.
  let pageHiddenOrBlurred = false;
  const onVisibilityChange = () => {
    if (document.hidden) {
      pageHiddenOrBlurred = true;
    }
  };
  const onWindowBlur = () => {
    pageHiddenOrBlurred = true;
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("blur", onWindowBlur);

  const navigationStart = Date.now();

  // Thử mở app
  window.location.href = appSchemeUrl;

  // Đợi một khoảng ngắn để phát hiện chuyển app
  await new Promise((resolve) => setTimeout(resolve, 1200));

  document.removeEventListener("visibilitychange", onVisibilityChange);
  window.removeEventListener("blur", onWindowBlur);

  const elapsed = Date.now() - navigationStart;
  if (!pageHiddenOrBlurred && elapsed < 2000) {
    window.location.href = storeUrl;
  }
};
