import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CollegeProvider } from "./contexts/CollegeContext";

// Pages
import CollegeHome from "./pages/CollegeHome";
import StudentLogin from "./pages/StudentLogin";
import StudentSignup from "./pages/StudentSignup";
import Dashboard from "./pages/Dashboard";
import CompanyDetail from "./pages/CompanyDetail";
import QuestionBank from "./pages/QuestionBank";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddCompany from "./pages/AddCompany";
import CollegeSetup from "./pages/CollegeSetup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CollegeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CollegeHome />} />
            <Route path="/login" element={<StudentLogin />} />
            <Route path="/signup" element={<StudentSignup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
            <Route path="/questions" element={<QuestionBank />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/companies/new" element={<AddCompany />} />
            <Route path="/admin/settings" element={<CollegeSetup />} />
            <Route path="/admin/setup" element={<CollegeSetup />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CollegeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
