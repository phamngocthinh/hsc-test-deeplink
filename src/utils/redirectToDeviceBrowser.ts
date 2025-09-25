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
  try {
    window.location.href = `hsconeuat://${url}`;

    return false;
  } catch (error) {
    if (os === "ios") {
      window.location.href = DOWNLOAD_HSC_APPSTORE;
    } else if (os === "android") {
      window.location.href = DOWNLOAD_HSC_GOOGLE_PLAY;
    }
  }
};
