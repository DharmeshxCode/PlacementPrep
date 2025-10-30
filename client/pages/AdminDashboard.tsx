import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Plus, 
  Settings, 
  LogOut,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  Calendar,
  BarChart3,
  Download,
  Upload
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { college, user, logout, isAdmin } = useCollege();

  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, navigate]);

  // Mock data - in real app, this would come from API
  const stats = {
    totalCompanies: 15,
    activeCompanies: 8,
    totalStudents: 320,
    placedStudents: 156,
    placementPercentage: 48.75,
    averagePackage: 8.5,
    questionsBank: 245
  };

  const recentCompanies = [
    {
      id: "1",
      name: "Google",
      role: "Software Engineer",
      package: "25-30 LPA",
      status: "active",
      applicants: 45,
      deadline: "2024-02-15"
    },
    {
      id: "2", 
      name: "Microsoft",
      role: "SDE Intern",
      package: "12-15 LPA",
      status: "active",
      applicants: 67,
      deadline: "2024-02-10"
    },
    {
      id: "3",
      name: "Amazon",
      role: "Software Developer",
      package: "20-25 LPA", 
      status: "upcoming",
      applicants: 0,
      deadline: "2024-02-20"
    }
  ];

  const recentStudents = [
    {
      id: "1",
      name: "John Doe", 
      email: "john.doe@student.college.edu",
      branch: "CSE",
      cgpa: 8.7,
      status: "active"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@student.college.edu", 
      branch: "IT",
      cgpa: 9.1,
      status: "placed"
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@student.college.edu",
      branch: "ECE", 
      cgpa: 8.3,
      status: "active"
    }
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "placed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!college || !isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {college.shortName} Admin Portal
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {college.name} - Placement Management
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Administrator</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => navigate("/admin/settings")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Companies</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCompanies}</p>
                    </div>
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    {stats.activeCompanies} currently active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalStudents}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    {stats.placedStudents} placed ({stats.placementPercentage}%)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Package</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.averagePackage} LPA</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    +12% from last year
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Question Bank</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.questionsBank}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    From {stats.totalCompanies} companies
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Companies</CardTitle>
                    <Button onClick={() => navigate("/admin/companies/new")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Company
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCompanies.map((company) => (
                      <div key={company.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{company.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{company.role}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(company.status)}>
                              {company.status}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {company.applicants} applicants
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Students</CardTitle>
                    <Button variant="outline" onClick={() => navigate("/admin/students")}>
                      <Users className="w-4 h-4 mr-2" />
                      Manage Students
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{student.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{student.branch}</Badge>
                            <span className="text-xs text-gray-500">
                              CGPA: {student.cgpa}
                            </span>
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Company Management</CardTitle>
                    <CardDescription>
                      Manage companies visiting {college.shortName} for placements
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button onClick={() => navigate("/admin/companies/new")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Company
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Company management interface will be implemented here.
                  You'll be able to add, edit, and manage all companies visiting your college.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>
                      Manage student registrations and placement status
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Students
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Student management interface will be implemented here.
                  You'll be able to view all registered students, manage their profiles, and track placement status.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Question Bank Management</CardTitle>
                    <CardDescription>
                      Manage interview questions and preparation resources
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate("/admin/questions/new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Question bank management interface will be implemented here.
                  You'll be able to add, categorize, and manage interview questions for each company.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Placement Analytics</CardTitle>
                <CardDescription>
                  Comprehensive placement statistics and insights for {college.shortName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Analytics dashboard will be implemented here.
                  You'll see detailed placement statistics, trends, and insights.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
