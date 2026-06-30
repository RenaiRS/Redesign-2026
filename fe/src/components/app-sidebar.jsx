import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/app-context";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ShieldCheck, LayoutDashboard, Gamepad2, LogOut, Sun, Moon, Hash } from "lucide-react";

export function AppSidebar({ isDark, toggleDark, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { games } = useAppContext();

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard },
    {
      path: "/dashboard/games",
      label: "Games",
      icon: Gamepad2,
      badge: games.length || null,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* ════════════════════
           HEADER — Branding
           ════════════════════ */}
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

      <SidebarSeparator />

      {/* ════════════════════
           CONTENT AREA
           ════════════════════ */}
      <SidebarContent>
        {/* ─── Navigation ─── */}
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

        <SidebarSeparator />
      </SidebarContent>

      {/* ════════════════════
           FOOTER — Dark Mode + Logout
           ════════════════════ */}
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleDark} tooltip={isDark ? "Light Mode" : "Dark Mode"}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{isDark ? "Light" : "Dark"} Mode</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout} tooltip="Logout">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail button untuk collapsed mode */}
      <SidebarRail />
    </Sidebar>
  );
}
