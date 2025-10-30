import { useState, useEffect } from "react";
import { supabase } from "@shared/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Building2, 
  Plus, 
  Trash2, 
  Save, 
  AlertCircle,
  CheckCircle,
  Calendar,
  MapPin,
  IndianRupee
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";

interface CompanyRound {
  name: string;
  type: string;
  duration: string;
  description: string;
  topics: string[];
  isElimination: boolean;
}

export default function AddCompany() {
  const navigate = useNavigate();
  const { college, isAdmin } = useCollege();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    package: "",
    location: "",
    description: "",
    website: "",
    visitDate: "",
    applicationDeadline: "",
    interviewDates: "",
    status: "upcoming" as const,
    
    // Eligibility criteria
    minCgpa: "",
    minTenth: "",
    minTwelfth: "",
    maxBacklogs: "0",
    eligibleBranches: [] as string[],
    specialRequirements: "",

    // Rounds
    rounds: [] as CompanyRound[]
  });

  const [newRound, setNewRound] = useState<CompanyRound>({
    name: "",
    type: "online_test",
    duration: "",
    description: "",
    topics: [],
    isElimination: true
  });

  const [newTopic, setNewTopic] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, navigate]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const handleBranchToggle = (branch: string) => {
    setFormData(prev => ({
      ...prev,
      eligibleBranches: prev.eligibleBranches.includes(branch)
        ? prev.eligibleBranches.filter(b => b !== branch)
        : [...prev.eligibleBranches, branch]
    }));
  };

  const addTopic = () => {
    if (newTopic.trim()) {
      setNewRound(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()]
      }));
      setNewTopic("");
    }
  };

  const removeTopic = (index: number) => {
    setNewRound(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const addRound = () => {
    if (newRound.name && newRound.duration) {
      setFormData(prev => ({
        ...prev,
        rounds: [...prev.rounds, { ...newRound }]
      }));
      setNewRound({
        name: "",
        type: "online_test",
        duration: "",
        description: "",
        topics: [],
        isElimination: true
      });
    }
  };

  const removeRound = (index: number) => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Company name is required");
      return false;
    }

    if (!formData.role.trim()) {
      setError("Job role is required");
      return false;
    }

    if (!formData.package.trim()) {
      setError("Package information is required");
      return false;
    }

    if (formData.eligibleBranches.length === 0) {
      setError("Please select at least one eligible branch");
      return false;
    }

    if (!formData.applicationDeadline) {
      setError("Application deadline is required");
      return false;
    }

    const cgpa = parseFloat(formData.minCgpa);
    if (isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      setError("Valid CGPA is required (0-10)");
      return false;
    }

    const tenth = parseFloat(formData.minTenth);
    if (isNaN(tenth) || tenth < 0 || tenth > 100) {
      setError("Valid 10th percentage is required (0-100)");
      return false;
    }

    const twelfth = parseFloat(formData.minTwelfth);
    if (isNaN(twelfth) || twelfth < 0 || twelfth > 100) {
      setError("Valid 12th percentage is required (0-100)");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");
  setSuccess("");

  if (!validateForm()) {
    setIsLoading(false);
    return;
  }

  try {
    // Prepare company data for Supabase
    const companyData = {
      name: formData.name,
      role: formData.role,
      package: formData.package,
      location: formData.location,
      description: formData.description,
      website: formData.website,
      visit_date: formData.visitDate || null,
      application_deadline: formData.applicationDeadline,
      interview_dates: formData.interviewDates || null,
      status: formData.status,
      min_cgpa: parseFloat(formData.minCgpa),
      min_tenth: parseFloat(formData.minTenth),
      min_twelfth: parseFloat(formData.minTwelfth),
      max_backlogs: parseInt(formData.maxBacklogs),
      eligible_branches: formData.eligibleBranches,
      special_requirements: formData.specialRequirements,
    };

    // Insert into companies table
    const { data: insertedCompany, error: insertError } = await supabase
      .from("companies")
      .insert([companyData])
      .select()
      .single();

    if (insertError) throw insertError;

    // ✅ If company added successfully, add its selection rounds
    if (formData.rounds.length > 0) {
      const roundsData = formData.rounds.map((round) => ({
        company_id: insertedCompany.id,
        round_name: round.name,
        round_type: round.type,
        duration: round.duration,
        description: round.description,
        is_elimination: round.isElimination,
        topics: round.topics,
      }));

      const { error: roundError } = await supabase
        .from("selection_rounds")
        .insert(roundsData);

      if (roundError) throw roundError;
    }

    setSuccess("✅ Company added successfully!");
    setFormData((prev) => ({
      ...prev,
      name: "",
      role: "",
      package: "",
      location: "",
      description: "",
      website: "",
      visitDate: "",
      applicationDeadline: "",
      interviewDates: "",
      status: "upcoming",
      minCgpa: "",
      minTenth: "",
      minTwelfth: "",
      maxBacklogs: "0",
      eligibleBranches: [],
      specialRequirements: "",
      rounds: [],
    }));

    // Redirect to admin dashboard
    setTimeout(() => navigate("/admin/dashboard"), 2000);

  } catch (err: any) {
    console.error("Insert error:", err);
    setError(err.message || "Failed to add company. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  if (!college || !isAdmin) {
    return <div>Loading...</div>;
  }

  const roundTypes = [
    { value: "online_test", label: "Online Test" },
    { value: "technical_interview", label: "Technical Interview" },
    { value: "hr_interview", label: "HR Interview" },
    { value: "group_discussion", label: "Group Discussion" },
    { value: "aptitude_test", label: "Aptitude Test" }
  ];

  const statusOptions = [
    { value: "upcoming", label: "Upcoming" },
    { value: "open", label: "Open for Applications" },
    { value: "closed", label: "Closed" },
    { value: "postponed", label: "Postponed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/dashboard")}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-3">
                <Building2 className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold">Add New Company</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add a company to {college.shortName} placement portal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Company Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Company Information</span>
                </CardTitle>
                <CardDescription>
                  Basic details about the company and job role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      placeholder="Google"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Job Role *</Label>
                    <Input
                      id="role"
                      placeholder="Software Engineer"
                      value={formData.role}
                      onChange={(e) => handleInputChange("role", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="package">Package *</Label>
                    <Input
                      id="package"
                      placeholder="25-30 LPA"
                      value={formData.package}
                      onChange={(e) => handleInputChange("package", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Bangalore, Hyderabad"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description about the company..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.company.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Timeline Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Timeline & Status</span>
                </CardTitle>
                <CardDescription>
                  Important dates and current status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="visitDate">Visit Date</Label>
                    <Input
                      id="visitDate"
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => handleInputChange("visitDate", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleInputChange("status", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="applicationDeadline">Application Deadline *</Label>
                    <Input
                      id="applicationDeadline"
                      type="date"
                      value={formData.applicationDeadline}
                      onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interviewDates">Interview Dates</Label>
                    <Input
                      id="interviewDates"
                      type="date"
                      value={formData.interviewDates}
                      onChange={(e) => handleInputChange("interviewDates", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
                <CardDescription>
                  Academic requirements and branch eligibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCgpa">Min CGPA *</Label>
                    <Input
                      id="minCgpa"
                      type="number"
                      placeholder="7.5"
                      value={formData.minCgpa}
                      onChange={(e) => handleInputChange("minCgpa", e.target.value)}
                      min="0"
                      max="10"
                      step="0.1"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minTenth">Min 10th % *</Label>
                    <Input
                      id="minTenth"
                      type="number"
                      placeholder="80"
                      value={formData.minTenth}
                      onChange={(e) => handleInputChange("minTenth", e.target.value)}
                      min="0"
                      max="100"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minTwelfth">Min 12th % *</Label>
                    <Input
                      id="minTwelfth"
                      type="number"
                      placeholder="80"
                      value={formData.minTwelfth}
                      onChange={(e) => handleInputChange("minTwelfth", e.target.value)}
                      min="0"
                      max="100"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxBacklogs">Max Backlogs</Label>
                    <Input
                      id="maxBacklogs"
                      type="number"
                      value={formData.maxBacklogs}
                      onChange={(e) => handleInputChange("maxBacklogs", e.target.value)}
                      min="0"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Eligible Branches *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {college.branches.map((branch) => (
                      <div key={branch} className="flex items-center space-x-2">
                        <Checkbox
                          id={branch}
                          checked={formData.eligibleBranches.includes(branch)}
                          onCheckedChange={() => handleBranchToggle(branch)}
                          disabled={isLoading}
                        />
                        <Label htmlFor={branch} className="text-sm cursor-pointer">
                          {branch}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="Any additional requirements..."
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                    rows={2}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Selection Rounds */}
            <Card>
              <CardHeader>
                <CardTitle>Selection Rounds</CardTitle>
                <CardDescription>
                  Define the interview/selection process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Round */}
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-semibold mb-4">Add Round</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Round Name</Label>
                      <Input
                        placeholder="Online Coding Test"
                        value={newRound.name}
                        onChange={(e) => setNewRound(prev => ({ ...prev, name: e.target.value }))}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select 
                        value={newRound.type} 
                        onValueChange={(value) => setNewRound(prev => ({ ...prev, type: value }))}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roundTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        placeholder="90 minutes"
                        value={newRound.duration}
                        onChange={(e) => setNewRound(prev => ({ ...prev, duration: e.target.value }))}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-6">
                      <Checkbox
                        id="elimination"
                        checked={newRound.isElimination}
                        onCheckedChange={(checked) => setNewRound(prev => ({ ...prev, isElimination: checked as boolean }))}
                        disabled={isLoading}
                      />
                      <Label htmlFor="elimination">Elimination Round</Label>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Brief description of this round..."
                      value={newRound.description}
                      onChange={(e) => setNewRound(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label>Topics</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add topic"
                        value={newTopic}
                        onChange={(e) => setNewTopic(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                        disabled={isLoading}
                      />
                      <Button type="button" onClick={addTopic} disabled={isLoading}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newRound.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{topic}</span>
                          <button
                            type="button"
                            onClick={() => removeTopic(index)}
                            className="ml-1 hover:text-red-500"
                            disabled={isLoading}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button type="button" onClick={addRound} disabled={isLoading}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Round
                  </Button>
                </div>

                {/* Existing Rounds */}
                {formData.rounds.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Added Rounds</h4>
                    {formData.rounds.map((round, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h5 className="font-medium">{round.name}</h5>
                              <Badge variant="outline">{round.type.replace('_', ' ')}</Badge>
                              <span className="text-sm text-gray-500">{round.duration}</span>
                              {round.isElimination && (
                                <Badge variant="destructive" className="text-xs">
                                  Elimination
                                </Badge>
                              )}
                            </div>
                            {round.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {round.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {round.topics.map((topic, topicIndex) => (
                                <Badge key={topicIndex} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRound(index)}
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  "Adding Company..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Add Company
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
