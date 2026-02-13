import { Link } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, QrCode } from "lucide-react";

export function Navbar() {
  const { data: user } = useUser();
  const logout = useLogout();

  if (!user) return null;

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">
            FindMy<span className="text-primary">Stuff</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.username}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => logout.mutate()}
            disabled={logout.isPending}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
