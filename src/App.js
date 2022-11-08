// import logo from './logo.svg';
import './App.css';
import TList from './components/TList/TList';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div className="AppHeader">
          <TList></TList>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
