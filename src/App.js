import logo from "./logo.svg";
import "./App.css";
import GlobalSetup from "./components/GlobalSetup";

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
      <GlobalSetup />
    </div>
  );
}

export default App;
