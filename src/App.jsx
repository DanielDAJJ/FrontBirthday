import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import { GuestProvider } from "./context/GuestProvider.jsx";

function App() {
  return (
    <BrowserRouter>
      <GuestProvider>
        <AppRoutes/>
      </GuestProvider>
    </BrowserRouter>
  )
}

export default App
