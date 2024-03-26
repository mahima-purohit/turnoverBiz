import './App.css';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Verify from './components/Register/Verify';
import Interests from "./components/Interests/Interests";
import Header from "./components/Header/Header";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/interests" element={<Interests />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
