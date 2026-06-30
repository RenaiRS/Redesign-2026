import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "@/context/app-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import LoginPage from "@/pages/login-page";
import Dashboard from "@/pages/dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </TooltipProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
}
