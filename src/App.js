// Containers
import MainPage from "containers/MainPage";

// Hooks
import { UsePicturesProvider } from "hooks/usePictures";
import { UseStepsProvider } from "hooks/useSteps";

// Libs
import "./i18n";

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <UseStepsProvider>
        <UsePicturesProvider>
          <MainPage />
        </UsePicturesProvider>
      </UseStepsProvider>
    </div>
  );
}

export default App;
