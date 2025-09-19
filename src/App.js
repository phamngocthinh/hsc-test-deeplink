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

export const redirectToDeviceBrowser = async ({ url, platform }) => {
  if (typeof window === "undefined") {
    return;
  }

  const urlWithoutProtocol = url.replace(/^https?:\/\//, "");
  const isHttps = /^https:\/\//i.test(url);
  const scheme = isHttps ? "https" : "http";

  try {
    if (platform === "ios") {
      // Try safari - 15, 17, 18
      const iosUrl = `x-safari-${url}`;
      window.location.href = iosUrl;

      // Try safari old way
      await new Promise((r) => setTimeout(r, 1000));
      const iosOldUrl = `com-apple-mobilesafari-tab:${url}`;
      window.location.href = iosOldUrl;

      return false;
    }

    if (platform === "android") {
      const androidIntent = `intent://${urlWithoutProtocol}#Intent;scheme=${scheme};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        url
      )};end;`;
      window.location.href = androidIntent;
      return false;
    }

    window.location.href = url;
    return true;
  } catch (error) {
    window.location.href = url;
  }
};

function App() {
  useEffect(() => {
    const platform = detectOS();

    redirectToDeviceBrowser({ url: window.location.href, platform });
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
