import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { GuestProvider } from "./context/GuestProvider.jsx";
import BackgroundDecoration from "./components/BackgroundDecoration.jsx";

function App() {
  return (
    <BrowserRouter>
      <GuestProvider>
        <BackgroundDecoration/>
        <AppRoutes/>
      </GuestProvider>
    </BrowserRouter>
  )
}

export default App