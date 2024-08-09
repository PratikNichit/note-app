import "./App.css";
import { Routes, Route } from "react-router-dom";
import Notes from "./pages/notes";
import Create from "./pages/create";
import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";
import Layout from "./components/layout";

const customTheme = createTheme({
  palette: {
    primary: purple,
  },
  typography: {
    fontFamily: "Quicksand",
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
