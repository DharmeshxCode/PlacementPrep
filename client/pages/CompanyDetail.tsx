import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  IndianRupee,
  CheckCircle,
  XCircle,
  Star,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  MessageSquare,
  Code,
  Brain,
  User
} from "lucide-react";

export default function CompanyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock company data - in real app, this would be fetched based on ID
  const company = {
    id: 1,
    name: "Google",
    role: "Software Engineer",
    package: "25-30 LPA",
    location: "Bangalore, Hyderabad",
    description: "Google is a multinational technology company that specializes in Internet-related services and products, which include online advertising technologies, search engine, cloud computing, software, and hardware.",
    eligibility: {
      cgpa: 7.5,
      tenth: 80,
      twelfth: 80,
      backlogs: 0,
      branches: ["Computer Science", "Information Technology", "Electronics"]
    },
    status: "Upcoming",
    applicationDeadline: "2024-02-15",
    interviewDates: "2024-02-20 to 2024-02-25",
    rounds: [
      {
        name: "Online Coding Test",
        duration: "90 minutes",
        description: "2-3 coding problems focusing on data structures and algorithms",
        topics: ["Arrays", "Strings", "Trees", "Dynamic Programming", "Graphs"]
      },
      {
        name: "Technical Interview 1",
        duration: "45 minutes",
        description: "Coding and system design questions",
        topics: ["Data Structures", "Algorithms", "Object Oriented Programming", "System Design Basics"]
      },
      {
        name: "Technical Interview 2",
        duration: "45 minutes",
        description: "Advanced technical concepts and problem solving",
        topics: ["System Design", "Database Design", "Scalability", "Advanced Algorithms"]
      },
      {
        name: "HR Interview",
        duration: "30 minutes",
        description: "Behavioral questions and cultural fit assessment",
        topics: ["Leadership", "Teamwork", "Communication", "Company Values"]
      }
    ],
    previousYearData: {
      2023: { applied: 450, shortlisted: 80, selected: 12 },
      2022: { applied: 380, shortlisted: 65, selected: 8 },
      2021: { applied: 320, shortlisted: 55, selected: 10 }
    },
    tips: [
      {
        category: "Preparation",
        points: [
          "Focus heavily on data structures and algorithms",
          "Practice system design for senior roles",
          "Review object-oriented programming concepts",
          "Understand Google's products and services"
        ]
      },
      {
        category: "Coding Round",
        points: [
          "Time complexity optimization is crucial",
          "Write clean, readable code with proper variable names",
          "Test your solution with edge cases",
          "Explain your approach clearly"
        ]
      },
      {
        category: "Interview",
        points: [
          "Think out loud during problem solving",
          "Ask clarifying questions before coding",
          "Discuss trade-offs in your solutions",
          "Show enthusiasm for Google's mission"
        ]
      }
    ],
    sampleQuestions: [
      {
        type: "Coding",
        year: 2023,
        question: "Given an array of integers, find the longest subarray with sum equal to zero.",
        difficulty: "Medium",
        topics: ["Arrays", "Hashing"]
      },
      {
        type: "Coding",
        year: 2023,
        question: "Implement LRU Cache with O(1) get and put operations.",
        difficulty: "Hard",
        topics: ["Design", "Hash Map", "Doubly Linked List"]
      },
      {
        type: "System Design",
        year: 2023,
        question: "Design a URL shortener service like bit.ly",
        difficulty: "Medium",
        topics: ["System Design", "Database Design", "Scalability"]
      },
      {
        type: "HR",
        year: 2023,
        question: "Tell me about a time when you had to work with a difficult team member.",
        difficulty: "Easy",
        topics: ["Behavioral", "Teamwork"]
      },
      {
        type: "Coding",
        year: 2022,
        question: "Find the minimum number of jumps to reach the end of array.",
        difficulty: "Medium",
        topics: ["Dynamic Programming", "Greedy"]
      }
    ],
    isEligible: true
  };

  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "Coding":
        return <Code className="w-4 h-4" />;
      case "System Design":
        return <Building2 className="w-4 h-4" />;
      case "HR":
        return <User className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">{company.name}</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{company.role}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(company.status)}>
                {company.status}
              </Badge>
              {company.isEligible ? (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Eligible
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600">
                  <XCircle className="w-3 h-3 mr-1" />
                  Not Eligible
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Company Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <IndianRupee className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Package</p>
                  <p className="font-semibold">{company.package}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="font-semibold">{company.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Deadline</p>
                  <p className="font-semibold">{new Date(company.applicationDeadline).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interview Dates</p>
                  <p className="font-semibold">{company.interviewDates}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{company.description}</p>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="rounds">Rounds</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Previous Year Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5" />
                    <span>Previous Year Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(company.previousYearData).map(([year, data]) => (
                    <div key={year} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{year}</span>
                        <span className="text-sm text-gray-600">
                          {data.selected}/{data.applied} selected
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Applied: {data.applied}</span>
                          <span>Shortlisted: {data.shortlisted}</span>
                          <span>Selected: {data.selected}</span>
                        </div>
                        <Progress 
                          value={(data.selected / data.applied) * 100} 
                          className="h-2" 
                        />
                        <p className="text-xs text-gray-600">
                          Success Rate: {((data.selected / data.applied) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Facts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>Quick Facts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{company.rounds.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Rounds</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">{company.sampleQuestions.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sample Questions</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Eligible Branches:</p>
                    <div className="flex flex-wrap gap-2">
                      {company.eligibility.branches.map((branch) => (
                        <Badge key={branch} variant="secondary" className="text-xs">
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Eligibility Criteria</span>
                </CardTitle>
                <CardDescription>
                  Check if you meet the requirements for this company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Academic Requirements</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span>Minimum CGPA</span>
                        <Badge variant="outline">{company.eligibility.cgpa}+</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span>10th Grade %</span>
                        <Badge variant="outline">{company.eligibility.tenth}%+</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span>12th Grade %</span>
                        <Badge variant="outline">{company.eligibility.twelfth}%+</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span>Active Backlogs</span>
                        <Badge variant="outline">Max {company.eligibility.backlogs}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Branch Eligibility</h4>
                    <div className="space-y-2">
                      {company.eligibility.branches.map((branch) => (
                        <div key={branch} className="flex items-center space-x-2 p-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{branch}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rounds" className="space-y-6">
            <div className="space-y-4">
              {company.rounds.map((round, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span>{round.name}</span>
                      </CardTitle>
                      <Badge variant="outline">{round.duration}</Badge>
                    </div>
                    <CardDescription>{round.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold mb-2">Key Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {round.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>Previous Year Questions</span>
                </CardTitle>
                <CardDescription>
                  Sample questions asked in previous interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {company.sampleQuestions.map((question, index) => (
                    <Card key={index} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getQuestionIcon(question.type)}
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge className={getDifficultyColor(question.difficulty)}>
                              {question.difficulty}
                            </Badge>
                            <Badge variant="secondary">{question.year}</Badge>
                          </div>
                        </div>
                        <p className="font-medium mb-2">{question.question}</p>
                        <div className="flex flex-wrap gap-1">
                          {question.topics.map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="space-y-6">
              {company.tips.map((tipCategory, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span>{tipCategory.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tipCategory.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
