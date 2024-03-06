import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "./AuthWrapper.tsx";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </BrowserRouter>
);
