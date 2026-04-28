import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MontazhKrovli from "./pages/services/MontazhKrovli";
import MansardaCHerdak from "./pages/services/MansardaCHerdak";
import RestavraciyaKrovli from "./pages/services/RestavraciyaKrovli";
import UteplenieDoma from "./pages/services/UteplenieDoma";
import StroitelstvoDomov from "./pages/services/StroitelstvoDomov";
import FasadnyeRaboty from "./pages/services/FasadnyeRaboty";
import IspravlenieKondensata from "./pages/services/IspravlenieKondensata";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/uslugi/montazh-krovli" element={<MontazhKrovli />} />
          <Route path="/uslugi/mansarda-i-cherdak" element={<MansardaCHerdak />} />
          <Route path="/uslugi/restavraciya-krovli" element={<RestavraciyaKrovli />} />
          <Route path="/uslugi/uteplenie-doma" element={<UteplenieDoma />} />
          <Route path="/uslugi/stroitelstvo-domov" element={<StroitelstvoDomov />} />
          <Route path="/uslugi/fasadnye-raboty" element={<FasadnyeRaboty />} />
          <Route path="/uslugi/ispravlenie-kondensata" element={<IspravlenieKondensata />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;