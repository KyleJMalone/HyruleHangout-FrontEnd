import { HyruleHangout } from "./components/HyruleHangout-Home/HyruleHangout";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <HyruleHangout />
  </BrowserRouter>
);
