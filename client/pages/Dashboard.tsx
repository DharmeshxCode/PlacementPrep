import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@shared/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  User, 
  GraduationCap, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Users, 
  BookOpen,
  LogOut,
  Search,
  Filter,
  ChevronRight,
  Star,
  Clock,
  IndianRupee
} from "lucide-react";

  export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [studentData, setStudentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch student details from Supabase
  useEffect(() => {
    const fetchStudent = async () => {
      const email = localStorage.getItem("studentEmail");
      if (!email) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        console.error("Error fetching student data:", error);
      } else {
        setStudentData(data);
      }
      setLoading(false);
    };

    fetchStudent();
  }, [navigate]);

  // 🔁 Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // ❌ No student data
  if (!studentData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <p className="text-lg font-medium text-red-500">Student data not found.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  // 🏢 Company data (unchanged)
  const companies = [
    {
      id: 1,
      name: "Google",
      role: "Software Engineer",
      package: "25-30 LPA",
      location: "Bangalore, Hyderabad",
      eligibility: { cgpa: 7.5, tenth: 80, twelfth: 80, backlogs: 0 },
      status: "Upcoming",
      applicationDeadline: "2024-02-15",
      rounds: 4,
      previousYearQuestions: 15,
      isEligible: true,
      priority: "high"
    },
    {
      id: 2,
      name: "Microsoft",
      role: "SDE Intern",
      package: "12-15 LPA",
      location: "Hyderabad, Pune",
      eligibility: { cgpa: 8.0, tenth: 85, twelfth: 85, backlogs: 0 },
      status: "Open",
      applicationDeadline: "2024-02-10",
      rounds: 3,
      previousYearQuestions: 12,
      isEligible: true,
      priority: "high"
    },
    {
      id: 3,
      name: "Amazon",
      role: "Software Development Engineer",
      package: "20-25 LPA",
      location: "Bangalore, Chennai",
      eligibility: { cgpa: 7.0, tenth: 75, twelfth: 75, backlogs: 1 },
      status: "Registrations Open",
      applicationDeadline: "2024-02-20",
      rounds: 5,
      previousYearQuestions: 20,
      isEligible: true,
      priority: "medium"
    },
    {
      id: 4,
      name: "Infosys",
      role: "Systems Engineer",
      package: "4-6 LPA",
      location: "Multiple Locations",
      eligibility: { cgpa: 6.5, tenth: 70, twelfth: 70, backlogs: 2 },
      status: "Upcoming",
      applicationDeadline: "2024-03-01",
      rounds: 3,
      previousYearQuestions: 8,
      isEligible: true,
      priority: "low"
    },
    {
      id: 5,
      name: "Goldman Sachs",
      role: "Technology Analyst",
      package: "15-20 LPA",
      location: "Mumbai, Bangalore",
      eligibility: { cgpa: 8.5, tenth: 90, twelfth: 90, backlogs: 0 },
      status: "Closed",
      applicationDeadline: "2024-01-30",
      rounds: 4,
      previousYearQuestions: 10,
      isEligible: false,
      priority: "high"
    }
  ];

  const filteredCompanies = companies.filter((company) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "eligible") return company.isEligible;
    if (selectedFilter === "high-priority") return company.priority === "high" && company.isEligible;
    if (selectedFilter === "upcoming") return company.status === "Upcoming" || company.status === "Open";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
      case "Registrations Open":
        return "bg-green-100 text-green-800 border-green-200";
      case "Upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const eligibleCompanies = companies.filter((c) => c.isEligible).length;
  const highPriorityCompanies = companies.filter((c) => c.priority === "high" && c.isEligible).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
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
              <Button variant="outline" onClick={() => navigate("/questions")}>
                <BookOpen className="w-4 h-4 mr-2" />
                Question Bank
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem("studentEmail");
                  navigate("/login");
                }}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 🧑‍🎓 Student Profile */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="text-center pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={studentData.avatar || undefined} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg">
                    {studentData.name
                      ? studentData.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "S"}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{studentData.name}</CardTitle>
                <CardDescription>{studentData.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Branch:</span>
                    <span>{studentData.branch}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Semester:</span>
                    <span>{studentData.semester}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Academic Performance</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>10th Marks</span>
                      <span className="font-medium">{studentData.tenth_marks}%</span>
                    </div>
                    <Progress value={studentData.tenth_marks} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>12th Marks</span>
                      <span className="font-medium">{studentData.twelfth_marks}%</span>
                    </div>
                    <Progress value={studentData.twelfth_marks} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CGPA</span>
                      <span className="font-medium">{studentData.cgpa}</span>
                    </div>
                    <Progress value={studentData.cgpa * 10} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Eligible Companies</span>
                  </div>
                  <Badge variant="secondary">{eligibleCompanies}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">High Priority</span>
                  </div>
                  <Badge variant="secondary">{highPriorityCompanies}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Company list remains unchanged */}
          {/* (keep the rest of your code as is) */}
        <div className="lg:col-span-3 space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <CardTitle className="text-2xl">Available Companies</CardTitle>
                    <CardDescription>Companies you can apply to based on your profile</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: "all", label: "All Companies" },
                    { key: "eligible", label: "Eligible" },
                    { key: "high-priority", label: "High Priority" },
                    { key: "upcoming", label: "Opening Soon" }
                  ].map((filter) => (
                    <Button
                      key={filter.key}
                      variant={selectedFilter === filter.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter.key)}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Companies List */}
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <Card 
                  key={company.id} 
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    !company.isEligible ? "opacity-60" : ""
                  }`}
                  onClick={() => navigate(`/company/${company.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold">{company.name}</h3>
                          <Badge className={getStatusColor(company.status)}>
                            {company.status}
                          </Badge>
                          {company.priority === "high" && company.isEligible && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{company.role}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">{company.package}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{company.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm">{company.rounds} rounds</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-purple-600" />
                            <span className="text-sm">{company.previousYearQuestions} questions</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Eligibility:</span> CGPA {company.eligibility.cgpa}+, 
                            10th {company.eligibility.tenth}%+, 12th {company.eligibility.twelfth}%+
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Deadline: {new Date(company.applicationDeadline).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                        {company.isEligible ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Eligible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No companies found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Try adjusting your filters to see more companies.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
          
}