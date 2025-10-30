import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff, GraduationCap, ArrowLeft, Building2, AlertCircle, CheckCircle } from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";
import { supabase } from "@shared/supabaseClient";


export default function StudentSignup() {
  const navigate = useNavigate();
  const { college } = useCollege();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    password: "",
    confirmPassword: "",
    branch: "",
    semester: "",
    tenthMarks: "",
    twelfthMarks: "",
    cgpa: "",
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!college) {
      setError("College configuration not found.");
      return false;
    }

    // Validate college email domain
    if (!formData.email.endsWith(`@${college.emailDomain}`)) {
      setError(`Please use your ${college.shortName} college email (ending with @${college.emailDomain})`);
      return false;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return false;
    }

    // Validate academic marks
    const tenth = parseFloat(formData.tenthMarks);
    const twelfth = parseFloat(formData.twelfthMarks);
    const cgpa = parseFloat(formData.cgpa);

    if (tenth < 0 || tenth > 100) {
      setError("10th marks must be between 0 and 100");
      return false;
    }

    if (twelfth < 0 || twelfth > 100) {
      setError("12th marks must be between 0 and 100");
      return false;
    }

    if (cgpa < 0 || cgpa > 10) {
      setError("CGPA must be between 0 and 10");
      return false;
    }

    // Validate branch selection
    if (!college.branches.includes(formData.branch)) {
      setError("Please select a valid branch");
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
      const { error: insertError } = await supabase.from("users").insert([
      {
       name: formData.name,
       email: formData.email,
       roll_number: formData.rollNumber,
       password: formData.password,
       branch: formData.branch,
       semester: formData.semester,
       tenth_marks: parseFloat(formData.tenthMarks),
       twelfth_marks: parseFloat(formData.twelfthMarks),
       cgpa: parseFloat(formData.cgpa),
      },
  ]);

  if (insertError) throw insertError;

  setSuccess("Registration successful!");
  setTimeout(() => navigate("/login"), 2000);
} catch (err: any) {
  console.error("Supabase insert error:", err);
  setError("Registration failed. Please try again.");
} finally {
      setIsLoading(false);
    }
  };

  if (!college) {
    return <div>Loading...</div>;
  }

  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-white/20"
          disabled={isLoading}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        {/* Logo and brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Student Registration
          </h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Building2 className="w-4 h-4" />
            <span>{college.name}</span>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-black/20">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">
              Create Student Account
            </CardTitle>
            <CardDescription className="text-center">
              Register for {college.shortName} placement portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {/* College Email Info */}
            <Alert>
              <Building2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Use your {college.shortName} email:</strong> Registration requires your official college email ending with @{college.emailDomain}
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rollNumber" className="text-sm font-medium">
                      Roll Number
                    </Label>
                    <Input
                      id="rollNumber"
                      type="text"
                      placeholder="Your roll number"
                      value={formData.rollNumber}
                      onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                      className="h-11"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    College Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`your.name@${college.emailDomain}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11"
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Must be your official {college.shortName} student email
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="h-11 pr-10"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="h-11 pr-10"
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch" className="text-sm font-medium">
                      Branch
                    </Label>
                    <Select 
                      value={formData.branch} 
                      onValueChange={(value) => handleInputChange("branch", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {college.branches.map((branch) => (
                          <SelectItem key={branch} value={branch}>
                            {branch}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester" className="text-sm font-medium">
                      Current Semester
                    </Label>
                    <Select 
                      value={formData.semester} 
                      onValueChange={(value) => handleInputChange("semester", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map((sem) => (
                          <SelectItem key={sem} value={sem}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenthMarks" className="text-sm font-medium">
                      10th Marks (%)
                    </Label>
                    <Input
                      id="tenthMarks"
                      type="number"
                      placeholder="85.5"
                      value={formData.tenthMarks}
                      onChange={(e) => handleInputChange("tenthMarks", e.target.value)}
                      className="h-11"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twelfthMarks" className="text-sm font-medium">
                      12th Marks (%)
                    </Label>
                    <Input
                      id="twelfthMarks"
                      type="number"
                      placeholder="88.2"
                      value={formData.twelfthMarks}
                      onChange={(e) => handleInputChange("twelfthMarks", e.target.value)}
                      className="h-11"
                      min="0"
                      max="100"
                      step="0.1"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cgpa" className="text-sm font-medium">
                      Current CGPA
                    </Label>
                    <Input
                      id="cgpa"
                      type="number"
                      placeholder="8.5"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange("cgpa", e.target.value)}
                      className="h-11"
                      min="0"
                      max="10"
                      step="0.01"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  disabled={isLoading}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal cursor-pointer"
                >
                  I agree to the{" "}
                  <Button variant="link" className="px-0 h-auto text-sm" disabled={isLoading}>
                    Terms of Service
                  </Button>{" "}
                  and{" "}
                  <Button variant="link" className="px-0 h-auto text-sm" disabled={isLoading}>
                    Privacy Policy
                  </Button>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                disabled={!formData.agreeToTerms || isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Button
                variant="link"
                className="px-0 font-normal h-auto"
                onClick={() => navigate("/login")}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
