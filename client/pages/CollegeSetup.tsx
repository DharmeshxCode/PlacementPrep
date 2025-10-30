import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Plus, 
  Trash2, 
  Save, 
  Settings,
  AlertCircle,
  CheckCircle,
  Palette,
  Mail,
  Phone,
  Globe
} from "lucide-react";
import { useCollege } from "@/contexts/CollegeContext";
import { CollegeConfig } from "@shared/collegeTypes";

export default function CollegeSetup() {
  const navigate = useNavigate();
  const { college, updateCollege } = useCollege();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<CollegeConfig>(
    college || {
      id: "college-001",
      name: "",
      shortName: "",
      emailDomain: "",
      adminEmails: [""],
      address: "",
      website: "",
      theme: {
        primaryColor: "#6366f1",
        secondaryColor: "#8b5cf6",
        accentColor: "#06b6d4"
      },
      placementCell: {
        email: "",
        phone: "",
        coordinatorName: ""
      },
      branches: [""],
      activeYear: new Date().getFullYear()
    }
  );

  const [newBranch, setNewBranch] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const handleThemeChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        [field]: value
      }
    }));
  };

  const handlePlacementCellChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      placementCell: {
        ...prev.placementCell,
        [field]: value
      }
    }));
  };

  const addBranch = () => {
    if (newBranch.trim() && !formData.branches.includes(newBranch.trim())) {
      setFormData(prev => ({
        ...prev,
        branches: [...prev.branches.filter(b => b.trim()), newBranch.trim()]
      }));
      setNewBranch("");
    }
  };

  const removeBranch = (index: number) => {
    setFormData(prev => ({
      ...prev,
      branches: prev.branches.filter((_, i) => i !== index)
    }));
  };

  const addAdminEmail = () => {
    if (newAdminEmail.trim() && !formData.adminEmails.includes(newAdminEmail.trim())) {
      setFormData(prev => ({
        ...prev,
        adminEmails: [...prev.adminEmails.filter(e => e.trim()), newAdminEmail.trim()]
      }));
      setNewAdminEmail("");
    }
  };

  const removeAdminEmail = (index: number) => {
    if (formData.adminEmails.length > 1) {
      setFormData(prev => ({
        ...prev,
        adminEmails: prev.adminEmails.filter((_, i) => i !== index)
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("College name is required");
      return false;
    }

    if (!formData.shortName.trim()) {
      setError("College short name is required");
      return false;
    }

    if (!formData.emailDomain.trim()) {
      setError("Email domain is required (e.g., student.college.edu)");
      return false;
    }

    if (!formData.placementCell.coordinatorName.trim()) {
      setError("Placement coordinator name is required");
      return false;
    }

    if (!formData.placementCell.email.trim()) {
      setError("Placement cell email is required");
      return false;
    }

    if (formData.branches.filter(b => b.trim()).length === 0) {
      setError("At least one branch is required");
      return false;
    }

    if (formData.adminEmails.filter(e => e.trim()).length === 0) {
      setError("At least one admin email is required");
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
      // Clean up empty entries
      const cleanedData = {
        ...formData,
        branches: formData.branches.filter(b => b.trim()),
        adminEmails: formData.adminEmails.filter(e => e.trim())
      };

      updateCollege(cleanedData);
      setSuccess("College configuration saved successfully!");
      
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError("Failed to save college configuration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ background: `linear-gradient(135deg, ${formData.theme.primaryColor}, ${formData.theme.secondaryColor})` }}
            >
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">College Configuration</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Set up your college placement portal
              </p>
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
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Essential details about your college
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">College Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="ABC Institute of Technology"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortName">Short Name *</Label>
                    <Input
                      id="shortName"
                      placeholder="AIT"
                      value={formData.shortName}
                      onChange={(e) => handleInputChange("shortName", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emailDomain">Student Email Domain *</Label>
                  <Input
                    id="emailDomain"
                    placeholder="student.college.edu"
                    value={formData.emailDomain}
                    onChange={(e) => handleInputChange("emailDomain", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-sm text-gray-500">
                    Students will use emails ending with @{formData.emailDomain || "your-domain"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="College address..."
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={3}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.college.edu"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activeYear">Active Academic Year</Label>
                    <Input
                      id="activeYear"
                      type="number"
                      value={formData.activeYear}
                      onChange={(e) => handleInputChange("activeYear", parseInt(e.target.value))}
                      min="2020"
                      max="2030"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5" />
                  <span>Theme Colors</span>
                </CardTitle>
                <CardDescription>
                  Customize the appearance of your portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.theme.primaryColor}
                        onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                        className="w-16 h-10"
                        disabled={isLoading}
                      />
                      <Input
                        value={formData.theme.primaryColor}
                        onChange={(e) => handleThemeChange("primaryColor", e.target.value)}
                        placeholder="#6366f1"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={formData.theme.secondaryColor}
                        onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                        className="w-16 h-10"
                        disabled={isLoading}
                      />
                      <Input
                        value={formData.theme.secondaryColor}
                        onChange={(e) => handleThemeChange("secondaryColor", e.target.value)}
                        placeholder="#8b5cf6"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={formData.theme.accentColor}
                        onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                        className="w-16 h-10"
                        disabled={isLoading}
                      />
                      <Input
                        value={formData.theme.accentColor}
                        onChange={(e) => handleThemeChange("accentColor", e.target.value)}
                        placeholder="#06b6d4"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">Preview</h4>
                  <div className="flex space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: formData.theme.primaryColor }}
                    >
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div 
                      className="w-12 h-12 rounded-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${formData.theme.primaryColor}, ${formData.theme.secondaryColor})` 
                      }}
                    ></div>
                    <div 
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: formData.theme.accentColor }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Placement Cell Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Placement Cell Information</span>
                </CardTitle>
                <CardDescription>
                  Contact details for the placement coordinator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="coordinatorName">Coordinator Name *</Label>
                  <Input
                    id="coordinatorName"
                    placeholder="Dr. John Doe"
                    value={formData.placementCell.coordinatorName}
                    onChange={(e) => handlePlacementCellChange("coordinatorName", e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="placementEmail">Placement Cell Email *</Label>
                    <Input
                      id="placementEmail"
                      type="email"
                      placeholder="placement@college.edu"
                      value={formData.placementCell.email}
                      onChange={(e) => handlePlacementCellChange("email", e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="placementPhone">Phone Number</Label>
                    <Input
                      id="placementPhone"
                      placeholder="+91-XXXX-XXXX"
                      value={formData.placementCell.phone}
                      onChange={(e) => handlePlacementCellChange("phone", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Emails */}
            <Card>
              <CardHeader>
                <CardTitle>Administrator Emails</CardTitle>
                <CardDescription>
                  Email addresses that can access admin portal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="admin@college.edu"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAdminEmail())}
                    disabled={isLoading}
                  />
                  <Button type="button" onClick={addAdminEmail} disabled={isLoading}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.adminEmails.filter(email => email.trim()).map((email, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => removeAdminEmail(index)}
                        className="ml-1 hover:text-red-500"
                        disabled={isLoading || formData.adminEmails.length <= 1}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Branches */}
            <Card>
              <CardHeader>
                <CardTitle>Academic Branches</CardTitle>
                <CardDescription>
                  Engineering branches available in your college
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Computer Science Engineering"
                    value={newBranch}
                    onChange={(e) => setNewBranch(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBranch())}
                    disabled={isLoading}
                  />
                  <Button type="button" onClick={addBranch} disabled={isLoading}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {formData.branches.filter(branch => branch.trim()).map((branch, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>{branch}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBranch(index)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                style={{ 
                  background: `linear-gradient(135deg, ${formData.theme.primaryColor}, ${formData.theme.secondaryColor})`,
                  color: 'white'
                }}
                className="hover:opacity-90"
              >
                {isLoading ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
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
