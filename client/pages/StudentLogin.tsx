import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, GraduationCap, ArrowLeft, Building2, AlertCircle } from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";
import { supabase } from "@shared/supabaseClient";


export default function StudentLogin() {
  const navigate = useNavigate();
  const { college, login } = useCollege();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate college email domain
    if (!college) {
      setError("College configuration not found.");
      setIsLoading(false);
      return;
    }

    if (!email.endsWith(`@${college.emailDomain}`)) {
      setError(`Please use your ${college.shortName} college email (ending with @${college.emailDomain})`);
      setIsLoading(false);
      return;
    }

    try {
  // Query Supabase to find matching user
  const { data: user, error: queryError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (queryError) {
    console.error("Supabase error:", queryError);
    setError("Login failed. Please try again later.");
  } else if (!user) {
    setError("Invalid credentials. Please check your email and password.");
  } else {
    // ✅ Successful login
    localStorage.setItem("studentEmail", user.email);
    navigate("/dashboard");
  }
} catch (err) {
  console.error(err);
  setError("Login failed. Please try again.");
} finally {
      setIsLoading(false);
    }
  };

  if (!college) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-white/20"
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
            Student Portal
          </h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Building2 className="w-4 h-4" />
            <span>{college.name}</span>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-lg dark:bg-black/20">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-semibold text-center">
              Student Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Access your placement dashboard using your college credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* College Email Info */}
            <Alert>
              <Building2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Use your {college.shortName} email:</strong> Your login email must end with @{college.emailDomain}
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  College Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`your.name@${college.emailDomain}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">
                  Use your official {college.shortName} student email address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="px-0 font-normal text-sm h-auto"
                  disabled={isLoading}
                >
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <Separator />

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Button
                variant="link"
                className="px-0 font-normal h-auto"
                onClick={() => navigate("/signup")}
                disabled={isLoading}
              >
                Register as Student
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Are you an administrator? </span>
              <Button
                variant="link"
                className="px-0 font-normal h-auto"
                onClick={() => navigate("/admin/login")}
                disabled={isLoading}
              >
                Admin Login
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="mt-6 bg-blue-50/50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p><strong>Placement Coordinator:</strong> {college.placementCell.coordinatorName}</p>
              <p><strong>Email:</strong> {college.placementCell.email}</p>
              <p><strong>Phone:</strong> {college.placementCell.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
