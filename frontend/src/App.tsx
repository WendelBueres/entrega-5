import { Slide, ToastContainer } from "react-toastify";
import "./App.css";
import { Router } from "./routers/router";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Router />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        transition={Slide}
        pauseOnHover
      />
    </div>
  );
}

export default App;
