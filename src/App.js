import "./App.css";
import GlobalSetup from "./components/GlobalSetup";
import ExternalPage from "./components/ExternalPage";

function App() {
  // useEffect(() => {
  //   const targetUrl = window.location.href;
  //   if (!isZaloInApp()) return;

  //   const platform = detectOS();
  //   try {
  //     redirectToDeviceBrowser({ url: targetUrl, os: platform });
  //   } catch (_) {}
  // }, []);

  return (
    <div className="App">
      <GlobalSetup />
      <ExternalPage
        src="https://register-ibs-uat.hsc.com.vn/"
        title="HSC Register"
      />
    </div>
  );
}

export default App;
