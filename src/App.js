import "./App.css";
import Messages from "./components/Messages";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  
    </BrowserRouter>
  );
}


export default App;
