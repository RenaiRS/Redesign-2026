import { useAppContext } from "@/context/app-context";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Gamepad2, Hash, ShieldCheck, Sidebar } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navItems = [
  { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
  {
    path: "/dashboard/games",
    label: "Games",
    icon: Gamepad2,
    badge: games.length || null,
  },
];

function Breadcrumb({ pathname }) {
  const segments = [
    { label: "Dashboard", path: "/dashboard" },
    {
      label: pathname === "/dashboard" ? "Overview" : "Games",
      path: pathname,
      isActive: true,
    },
  ];

  return (
    <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {segments.map((s, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted-foreground/30">/</span>}
          <span className={s.isActive ? "text-foreground font-bold" : ""}>{s.label}</span>
        </span>
      ))}
    </nav>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const { games, logout, lastChange, addGame, updateGame, deleteGame, toggleStatus } = useAppContext();
  const navigate = useNavigate();
  const mainRef = useRef(null);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-svh w-full bg-background">
        {/* app sidebar */}
        <Sidebar collapsible="icon" variant="sidebar">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
              <ShieldCheck className="h-6 w-6 shrink-0" style={{ color: "var(--sidebar-primary)" }} />
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="font-mono text-xs tracking-widest font-bold uppercase">IGRS Admin</span>
                <span className="font-mono text-[10px] text-sidebar-foreground/50 tracking-widest uppercase">
                  KOMDIGI RI
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="font-mono text-[10px] tracking-widest uppercase">
                <Hash className="h-3 w-3 inline mr-1" />
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        isActive={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        tooltip={item.label}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge !== null && (
                          <SidebarMenuBadge className="font-mono text-[10px]">{item.badge}</SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarSeparator />
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
