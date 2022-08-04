// Components
import AppToolbar from "components/AppToolbar";

// Containers
import MainPage from "containers/MainPage";

// Hooks
import { UsePicturesProvider } from "hooks/usePictures";

// Libs
import "./i18n";

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppToolbar />
      <UsePicturesProvider>
        <MainPage />
      </UsePicturesProvider>
    </div>
  );
}

export default App;
