import { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Search, Bell, Clock, Home, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mockNotifications = [
  { id: 1, title: "Missed Punch Alert", desc: "Dr. Sharma missed morning punch-in", time: "2 min ago", unread: true },
  { id: 2, title: "Half-Day Eligible", desc: "3 staff members eligible for half-day", time: "15 min ago", unread: true },
  { id: 3, title: "Report Ready", desc: "Weekly attendance report generated", time: "1 hr ago", unread: false },
  { id: 4, title: "New Staff Added", desc: "Priya Patel added to Science dept", time: "3 hrs ago", unread: false },
];

interface TopBarProps {
  title: string;
  subtitle?: string;
}

interface OutletContextType {
  onMobileMenuOpen: () => void;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  const context = useOutletContext<OutletContextType | null>();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const unreadCount = mockNotifications.filter((n) => n.unread).length;

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 safe-top">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={() => context?.onMobileMenuOpen()}
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div>
          <h1 className="text-base md:text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search staff, records..."
            className="pl-9 w-64 h-9 bg-secondary/50 border-border/50 text-sm"
          />
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Clock className="h-3.5 w-3.5" />
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground">Notifications</p>
              <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-border/50 last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer ${n.unread ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />}
                    <div className={n.unread ? "" : "ml-4"}>
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hidden sm:inline-flex"
          onClick={() => navigate("/")}
          title="Back to Home"
        >
          <Home className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            AD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
