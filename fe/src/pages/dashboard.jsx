import { useAppContext } from "@/context/app-context";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/login", { replace: true });
    return null;
  }

  return <DashboardLayout />;
}
