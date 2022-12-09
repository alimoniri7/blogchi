import theme from "./mui/them";
import { ThemeProvider } from "@mui/material";
import HomePage from "./components/HomePage";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <HomePage/>
    </ThemeProvider>
  )
}

export default App;
