import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Inicio from "./pages/inicio";
import Curiosidades from "./pages/curiosidades";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Inicio />}/>
          <Route path="/curiosidades" element={<Curiosidades />}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
