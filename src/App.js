import "./App.css";
import GlobalSetup from "./components/GlobalSetup";
import ExternalPage from "./components/ExternalPage";

// <ExternalPage
//   src="https://register-ibs-uat.hsc.com.vn/"
//   title="HSC Register"
// />
function App() {
  return (
    <div className="App">
      <img src="/ONE.jpeg" alt="Background" className="fullscreen-image" />
      <GlobalSetup />
    </div>
  );
}

export default App;
