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
    const newUrl = `hsconeuat://${url}`;

    if (os === "ios") {
      // Try safari - 15, 17, 18
      const iosUrl = `x-safari-${newUrl}`;
      window.location.href = iosUrl;

      //       // Try safari old way
      await new Promise((r) => setTimeout(r, 1000));
      const iosOldUrl = `com-apple-mobilesafari-tab:${newUrl}`;
      window.location.href = iosOldUrl;
    } else if (os === "android") {
      const androidIntent = `intent://${newUrl}#Intent;scheme=http;package=com.android.chrome;end;`;
      window.location.href = androidIntent;
    }
    return false;
  } catch (error) {
    // if (os === "ios") {
    //   window.location.href = `x-safari-${url}`;
    // } else if (os === "android") {
    //   window.location.href = `intent://${urlWithoutProtocol}#Intent;scheme=http;package=com.android.chrome;end;`;
    // }
  }
};
