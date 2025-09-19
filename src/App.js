import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

const detectOS = () => {
  if (typeof window === "undefined") return "other";
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/android/i.test(userAgent)) return "android";
  if (/iPad|iPhone|iPod/.test(userAgent)) return "ios";
  return "other";
};

export const redirectToDeviceBrowser = async ({ url, os }) => {
  if (typeof window === "undefined") {
    return;
  }

  const urlWithoutProtocol = url.replace(/^https?:\/\//, "");

  try {
    if (os === "ios") {
      // Try safari - 15, 17, 18
      const iosUrl = `x-safari-${url}`;
      window.location.href = iosUrl;

      // Try safari old way
      await new Promise((r) => setTimeout(r, 1000));
      const iosOldUrl = `com-apple-mobilesafari-tab:${url}`;
      window.location.href = iosOldUrl;

      return false;
    }

    if (os === "android") {
      const androidIntent = `intent://${urlWithoutProtocol}#Intent;scheme=http;package=com.android.chrome;end;`;
      window.location.href = androidIntent;
      return false;
    }

    window.location.href = url;
    return true;
  } catch (error) {
    window.location.href = url;
  }
};

const isZaloInApp = () => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const ref = document.referrer || "";
  if (/Zalo/i.test(ua)) return true;
  if (/zalo\.me|open\.zalo\.me/i.test(ref)) return true;
  const sp = new URLSearchParams(window.location.search);
  return sp.get("isWebView") === "zalo";
};

function App() {
  useEffect(() => {
    const targetUrl = window.location.href;
    if (!isZaloInApp()) return;

    const platform = detectOS();
    try {
      redirectToDeviceBrowser({ url: targetUrl, os: platform });
    } catch (_) {}
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
