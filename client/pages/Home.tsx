import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Users, BookOpen, Target, ArrowRight, Star, CheckCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Building2,
      title: "Company Database",
      description: "Track companies visiting your college with detailed information"
    },
    {
      icon: Users,
      title: "Eligibility Tracking",
      description: "Know exactly what criteria companies look for in students"
    },
    {
      icon: BookOpen,
      title: "Question Bank",
      description: "Access previous interview questions sorted by company and year"
    },
    {
      icon: Target,
      title: "Focused Preparation",
      description: "Get personalized tips based on company requirements"
    }
  ];

  const benefits = [
    "Track placement trends across multiple years",
    "Understand company-specific requirements",
    "Access comprehensive question database",
    "Get preparation tips for target companies",
    "Know eligibility criteria in advance",
    "Learn from previous placement experiences"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950 dark:via-violet-950 dark:to-indigo-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                PlacementTracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="hover:bg-white/20"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Your College Placement Success Partner
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Track companies, understand requirements, and prepare strategically for your dream job. 
              Access comprehensive placement data from previous years to boost your chances of success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 text-lg"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950 px-8 py-3 text-lg"
              >
                Login to Continue
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Placement Success
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform helps you track, prepare, and succeed in your placement journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Why Choose PlacementTracker?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <Card className="border-0 bg-white/60 backdrop-blur-sm dark:bg-black/20 p-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                  "PlacementTracker helped me understand exactly what companies were looking for. 
                  I knew the questions they asked previous students and prepared accordingly."
                </blockquote>
                <cite className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  - Final Year Student, Computer Science
                </cite>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <Card className="border-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardContent className="text-center py-16 px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Ace Your Placements?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of students who have successfully landed their dream jobs
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button 
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Create Free Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/login")}
                  className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                >
                  Already have an account?
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 PlacementTracker. Built for student success.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
