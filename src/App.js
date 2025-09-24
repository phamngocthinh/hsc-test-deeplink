import "./App.css";
import GlobalSetup from "./components/GlobalSetup";
import ExternalPage from "./components/ExternalPage";

function App() {
  return (
    <div className="App">
      <ExternalPage
        src="https://register-ibs-uat.hsc.com.vn/"
        title="HSC Register"
      />
    </div>
  );
}

export default App;
