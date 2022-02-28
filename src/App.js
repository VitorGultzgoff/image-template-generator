// Components
import AppBar from "@mui/material/AppBar";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

// Containers
import MainPage from "containers/MainPage";

// Libs
import "./i18n";

// Icons
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';

// Styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
            <MenuBookIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Image Template Generator
            </Typography>
        </Toolbar>
      </AppBar>
      <MainPage />
    </div>
  );
}

export default App;
