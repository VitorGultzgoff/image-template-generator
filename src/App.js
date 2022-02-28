// Components
import AppToolbar from "components/AppToolbar"

// Containers
import MainPage from "containers/MainPage";

// Libs
import "./i18n";

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppToolbar />
      <MainPage />
    </div>
  );
}

export default App;
