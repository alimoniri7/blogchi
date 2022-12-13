import theme from "./mui/them";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./ReactRouter/Routes";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  )
}

export default App;
