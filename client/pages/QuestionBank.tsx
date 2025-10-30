import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  BookOpen, 
  Code, 
  Brain, 
  User, 
  Building2,
  Calendar,
  Tag,
  Star,
  Download,
  Eye,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface Question {
  id: number;
  company: string;
  year: number;
  type: "Coding" | "HR" | "Aptitude" | "System Design" | "Technical";
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  description?: string;
  hints?: string[];
  solution?: string;
  isFavorite?: boolean;
}

export default function QuestionBank() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  // Mock questions data - in real app, this would come from backend
  const questions: Question[] = [
    {
      id: 1,
      company: "Google",
      year: 2023,
      type: "Coding",
      question: "Given an array of integers, find the longest subarray with sum equal to zero.",
      difficulty: "Medium",
      topics: ["Arrays", "Hashing", "Prefix Sum"],
      description: "You need to find the longest contiguous subarray whose sum equals zero. If multiple subarrays have the same maximum length, return any one of them.",
      hints: ["Use prefix sum approach", "Hash map to store prefix sums", "If same prefix sum appears twice, subarray between them has sum 0"],
      solution: "Use prefix sum and hash map. Store prefix sums and their indices. If prefix sum repeats, subarray between indices has sum 0.",
      isFavorite: false
    },
    {
      id: 2,
      company: "Google",
      year: 2023,
      type: "System Design",
      question: "Design a URL shortener service like bit.ly",
      difficulty: "Hard",
      topics: ["System Design", "Database Design", "Scalability", "Caching"],
      description: "Design a system that can shorten long URLs and redirect users when they access the short URL.",
      hints: ["Base62 encoding", "Database design for storing mappings", "Caching frequently accessed URLs", "Load balancing"],
      isFavorite: true
    },
    {
      id: 3,
      company: "Microsoft",
      year: 2023,
      type: "Coding",
      question: "Implement LRU Cache with O(1) get and put operations.",
      difficulty: "Hard",
      topics: ["Design", "Hash Map", "Doubly Linked List"],
      description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
      hints: ["Combination of HashMap and Doubly Linked List", "HashMap for O(1) access", "Doubly Linked List for O(1) insertion/deletion"],
      isFavorite: false
    },
    {
      id: 4,
      company: "Amazon",
      year: 2023,
      type: "HR",
      question: "Tell me about a time when you had to work with a difficult team member.",
      difficulty: "Easy",
      topics: ["Behavioral", "Teamwork", "Conflict Resolution"],
      description: "Behavioral question to assess your teamwork and conflict resolution skills.",
      hints: ["Use STAR method", "Focus on positive outcome", "Show leadership and communication skills"],
      isFavorite: false
    },
    {
      id: 5,
      company: "Amazon",
      year: 2022,
      type: "Coding",
      question: "Find the minimum number of jumps to reach the end of array.",
      difficulty: "Medium",
      topics: ["Dynamic Programming", "Greedy", "Arrays"],
      description: "Given an array where each element represents the maximum number of steps that can be made forward from that element.",
      hints: ["Greedy approach", "Keep track of farthest reachable position", "BFS approach also works"],
      isFavorite: true
    },
    {
      id: 6,
      company: "Microsoft",
      year: 2022,
      type: "Technical",
      question: "Explain the difference between process and thread.",
      difficulty: "Easy",
      topics: ["Operating Systems", "Concurrency", "System Programming"],
      description: "Technical question about fundamental concepts in operating systems.",
      isFavorite: false
    },
    {
      id: 7,
      company: "Google",
      year: 2022,
      type: "Aptitude",
      question: "If 5 machines can make 5 widgets in 5 minutes, how long would it take 100 machines to make 100 widgets?",
      difficulty: "Easy",
      topics: ["Logical Reasoning", "Mathematics"],
      description: "Logical reasoning question to test problem-solving skills.",
      hints: ["Think about the rate per machine", "Each machine makes 1 widget in 5 minutes"],
      isFavorite: false
    },
    {
      id: 8,
      company: "Infosys",
      year: 2023,
      type: "Aptitude",
      question: "A train travels 120 km in 3 hours. What is its speed in m/s?",
      difficulty: "Easy",
      topics: ["Mathematics", "Speed Distance Time"],
      description: "Basic mathematics question on speed, distance, and time calculations.",
      hints: ["Speed = Distance/Time", "Convert km/hr to m/s"],
      isFavorite: false
    }
  ];

  const companies = ["all", ...Array.from(new Set(questions.map(q => q.company)))];
  const years = ["all", ...Array.from(new Set(questions.map(q => q.year))).sort((a, b) => b - a)];
  const types = ["all", "Coding", "HR", "Aptitude", "System Design", "Technical"];
  const difficulties = ["all", "Easy", "Medium", "Hard"];

  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          question.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCompany = selectedCompany === "all" || question.company === selectedCompany;
      const matchesYear = selectedYear === "all" || question.year.toString() === selectedYear;
      const matchesType = selectedType === "all" || question.type === selectedType;
      const matchesDifficulty = selectedDifficulty === "all" || question.difficulty === selectedDifficulty;

      return matchesSearch && matchesCompany && matchesYear && matchesType && matchesDifficulty;
    });
  }, [searchQuery, selectedCompany, selectedYear, selectedType, selectedDifficulty, questions]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Coding":
        return <Code className="w-4 h-4" />;
      case "System Design":
        return <Building2 className="w-4 h-4" />;
      case "HR":
        return <User className="w-4 h-4" />;
      case "Technical":
        return <BookOpen className="w-4 h-4" />;
      case "Aptitude":
        return <Brain className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
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

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCompany("all");
    setSelectedYear("all");
    setSelectedType("all");
    setSelectedDifficulty("all");
  };

  const toggleExpanded = (questionId: number) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
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
                <BookOpen className="w-8 h-8 text-purple-600" />
                <div>
                  <h1 className="text-xl font-bold">Question Bank</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredQuestions.length} questions available
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Questions</span>
            </CardTitle>
            <CardDescription>
              Use filters to find specific questions by company, year, type, or difficulty
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Questions</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by question, company, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Companies" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company === "all" ? "All Companies" : company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Year</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year === "all" ? "All Years" : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty === "all" ? "All Difficulties" : difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Active filters and clear */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge variant="secondary">
                    Search: "{searchQuery}"
                  </Badge>
                )}
                {selectedCompany !== "all" && (
                  <Badge variant="secondary">
                    Company: {selectedCompany}
                  </Badge>
                )}
                {selectedYear !== "all" && (
                  <Badge variant="secondary">
                    Year: {selectedYear}
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary">
                    Type: {selectedType}
                  </Badge>
                )}
                {selectedDifficulty !== "all" && (
                  <Badge variant="secondary">
                    Difficulty: {selectedDifficulty}
                  </Badge>
                )}
              </div>
              {(searchQuery || selectedCompany !== "all" || selectedYear !== "all" || 
                selectedType !== "all" || selectedDifficulty !== "all") && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search criteria or filters to find more questions.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredQuestions.map((question) => (
              <Card key={question.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Question Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            {getTypeIcon(question.type)}
                            <Badge variant="outline">{question.type}</Badge>
                          </div>
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <Building2 className="w-3 h-3" />
                            <span>{question.company}</span>
                          </Badge>
                          <Badge variant="secondary" className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{question.year}</span>
                          </Badge>
                          {question.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
                        <div className="flex flex-wrap gap-1">
                          {question.topics.map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              <Tag className="w-3 h-3 mr-1" />
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleExpanded(question.id)}
                        >
                          {expandedQuestion === question.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedQuestion === question.id && (
                      <div className="space-y-4 pt-4 border-t">
                        {question.description && (
                          <div>
                            <h4 className="font-semibold mb-2">Description</h4>
                            <p className="text-gray-700 dark:text-gray-300">{question.description}</p>
                          </div>
                        )}

                        {question.hints && question.hints.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">Hints</h4>
                            <ul className="space-y-1">
                              {question.hints.map((hint, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                                  <span className="text-purple-600 font-bold">•</span>
                                  <span>{hint}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {question.solution && (
                          <div>
                            <h4 className="font-semibold mb-2">Approach</h4>
                            <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                              {question.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Results Summary */}
        {filteredQuestions.length > 0 && (
          <Card className="mt-8">
            <CardContent className="p-4">
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredQuestions.length} of {questions.length} questions
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
