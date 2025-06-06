
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 lg:h-20">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9ad3c9a3-cef8-4daa-9f2f-fcbc3c2c8171.png" 
              alt="EduSphere Logo" 
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold text-gradient">EduSphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/opportunities"
            className="text-slate-700 hover:text-edu-primary transition-colors font-medium"
          >
            Opportunities
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-slate-700 hover:text-edu-primary transition-colors font-medium">
              Browse <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link to="/universities" className="w-full">
                  Universities
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/research" className="w-full">
                  Research Projects
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/internships" className="w-full">
                  Internships
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/about"
            className="text-slate-700 hover:text-edu-primary transition-colors font-medium"
          >
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="font-medium">
                  {user.email}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>
                  <Link to="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" className="font-medium" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button className="bg-edu-primary hover:bg-edu-primary/90 font-medium" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/opportunities"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              Opportunities
            </Link>
            <Link
              to="/universities"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              Universities
            </Link>
            <Link
              to="/research"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              Research Projects
            </Link>
            <Link
              to="/internships"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              Internships
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted"
            >
              About Us
            </Link>
            <div className="flex flex-col space-y-2 px-3 pt-4">
              {user ? (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">Log In</Link>
                  </Button>
                  <Button className="w-full bg-edu-primary hover:bg-edu-primary/90" asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
