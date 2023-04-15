import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import "./utils/firebase";
import NewQuizForm from "./components/form/new/NewQuizForm";

function App() {
  return (
    <BrowserRouter>
      <Box className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />

          <Route path="/new" element={<NewQuizForm />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
