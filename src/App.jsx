import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>Sample Project</h1>
      </header>
      <nav>
        <h1 className="sr-only">Global Navigation Menu</h1>
        <ul>
          <li>
            <a href="#">DeckGL-Vancouver</a>
          </li>
          <li>
            <a href="#">Programmers-Searching Languages</a>
          </li>
        </ul>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
