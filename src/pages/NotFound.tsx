import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-converter-header">404</h1>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-converter-header">Page not found</h2>
          <p className="text-converter-subtext">The page you're looking for doesn't exist.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary-hover">
          <a href="/">Return to Converter</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
