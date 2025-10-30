import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Users, BookOpen, Target, ArrowRight, Star, CheckCircle, GraduationCap, Shield } from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";

export default function CollegeHome() {
  const navigate = useNavigate();
  const { college } = useCollege();

  if (!college) {
    return <div>Loading...</div>;
  }

  const features = [
    {
      icon: Building2,
      title: "Company Database",
      description: `Track companies visiting ${college.shortName} with detailed information`
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
    `Track placement trends at ${college.shortName}`,
    "Understand company-specific requirements",
    "Access comprehensive question database",
    "Get preparation tips for target companies",
    "Know eligibility criteria in advance",
    "Learn from previous placement experiences at your college"
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950"
      style={{
        background: `linear-gradient(135deg, ${college.theme.primaryColor}10 0%, ${college.theme.secondaryColor}10 50%, ${college.theme.accentColor}10 100%)`
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
          style={{ backgroundColor: college.theme.primaryColor + '40' }}
        ></div>
        <div 
          className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
          style={{ backgroundColor: college.theme.secondaryColor + '40' }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
          style={{ backgroundColor: college.theme.accentColor + '40' }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})` }}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold"
                  style={{ 
                    background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {college.shortName} Placements
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {college.name}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/login")}
                className="hover:bg-white/20"
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Student Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate("/admin/login")}
                className="border-gray-300 hover:bg-gray-50"
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
              <Button 
                onClick={() => navigate("/signup")}
                style={{ 
                  background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})`,
                  color: 'white'
                }}
                className="hover:opacity-90"
              >
                Register
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span 
                style={{ 
                  background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor}, ${college.theme.accentColor})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {college.shortName} Placement Portal
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Your comprehensive placement tracking system for {college.name}. 
              Track companies, understand requirements, and prepare strategically for your dream job.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                style={{ 
                  background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})`,
                  color: 'white'
                }}
                className="px-8 py-3 text-lg hover:opacity-90"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-gray-300 hover:bg-gray-50 px-8 py-3 text-lg"
              >
                Student Login
              </Button>
            </div>
          </div>
        </div>

        {/* College Info */}
        <div className="container mx-auto px-4 py-12">
          <Card className="border-0 bg-white/60 backdrop-blur-sm dark:bg-black/20 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: college.theme.primaryColor }}>
                    About {college.shortName}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {college.name}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    {college.address}
                  </p>
                  {college.website && (
                    <Button variant="link" className="mt-2" asChild>
                      <a href={college.website} target="_blank" rel="noopener noreferrer">
                        Visit Website →
                      </a>
                    </Button>
                  )}
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold mb-3" style={{ color: college.theme.secondaryColor }}>
                    Placement Cell
                  </h4>
                  <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>Coordinator:</strong> {college.placementCell.coordinatorName}</p>
                    <p><strong>Email:</strong> {college.placementCell.email}</p>
                    <p><strong>Phone:</strong> {college.placementCell.phone}</p>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold mb-3" style={{ color: college.theme.accentColor }}>
                    Available Branches
                  </h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {college.branches.slice(0, 3).map((branch) => (
                      <span 
                        key={branch} 
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      >
                        {branch.replace('Engineering', '').trim()}
                      </span>
                    ))}
                    {college.branches.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        +{college.branches.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Placement Success
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive placement tracking system designed specifically for {college.shortName} students
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 bg-white/60 backdrop-blur-sm dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white"
                    style={{ background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})` }}
                  >
                    <feature.icon className="w-8 h-8" />
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
                Why Choose Our Platform?
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
                  "This portal helped me understand exactly what companies visiting {college.shortName} were looking for. 
                  I knew the questions they asked previous students and prepared accordingly."
                </blockquote>
                <cite className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  - Final Year Student, {college.branches[0]}
                </cite>
              </div>
            </Card>
          </div>
        </div>

        {/* Login Options */}
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className="border-0 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${college.theme.primaryColor}, ${college.theme.secondaryColor})` }}
              onClick={() => navigate("/login")}
            >
              <CardContent className="text-center py-16 px-8">
                <GraduationCap className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  Student Portal
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Access your placement dashboard, track companies, and prepare for interviews
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Student Login
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="border-0 bg-gradient-to-br from-slate-600 to-slate-800 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate("/admin/login")}
            >
              <CardContent className="text-center py-16 px-8">
                <Shield className="w-16 h-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl font-bold mb-4">
                  Admin Portal
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Manage companies, students, and placement data for {college.shortName}
                </p>
                <Button 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
                >
                  Admin Login
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>&copy; {college.activeYear} {college.name}. Placement Management System.</p>
            <p className="text-sm mt-1">
              Contact: {college.placementCell.email} | {college.placementCell.phone}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
