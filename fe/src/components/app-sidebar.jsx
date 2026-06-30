import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/app-context";
import { RatingBadge } from "@/components/shared/rating-badge";
import { CoverImage } from "@/components/shared/cover-image";
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
import { LayoutDashboard, Gamepad2, LogOut, Sun, Moon, Clock, Hash } from "lucide-react";
import { sortByDate } from "@/lib/utils";

export function AppSidebar({ isDark, toggleDark, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { games } = useAppContext();

  const recentGames = sortByDate(games).slice(0, 3);

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
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <img src="/logo.png" alt="logo" className="h-8 group-data-[collapsible=icon]:h-6" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className=" text-[10px] tracking-widest uppercase">
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
                    {item.badge !== null && <SidebarMenuBadge className=" text-[10px]">{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {recentGames.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className=" text-[10px] tracking-widest uppercase">
              <Clock className="h-3 w-3 inline mr-1" />
              Recent Games
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-1 space-y-1 group-data-[collapsible=icon]:hidden">
                {recentGames.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => navigate("/dashboard/games")}
                    className="w-full text-left flex items-center gap-2 py-1.5 hover:bg-sidebar-accent/10 transition-colors rounded-sm px-1"
                    title={`${game.title} — ${game.status}`}
                  >
                    <CoverImage
                      src={game.coverUrl}
                      className="w-6 h-8 border-sidebar-border bg-sidebar-accent/5"
                      iconSize="h-3 w-3"
                    />
                    <div className="flex-1 min-w-0">
                      <p className=" text-[10px] font-medium truncate text-sidebar-foreground">{game.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <RatingBadge rating={game.rating} size="xs" className="text-sidebar-foreground/40" />
                        <span className=" text-[8px] text-sidebar-foreground/40 uppercase tracking-widest">
                          {game.status}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

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

      <SidebarRail />
    </Sidebar>
  );
}
