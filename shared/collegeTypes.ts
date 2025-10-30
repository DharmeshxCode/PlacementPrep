// College configuration types
export interface CollegeConfig {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  emailDomain: string; // e.g., "student.college.edu"
  adminEmails: string[];
  address: string;
  website?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  placementCell: {
    email: string;
    phone: string;
    coordinatorName: string;
  };
  branches: string[];
  activeYear: number;
}

// Enhanced user types with roles
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "student";
  collegeId: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminUser extends User {
  role: "admin";
  permissions: AdminPermission[];
}

export interface StudentUser extends User {
  role: "student";
  branch: string;
  semester: string;
  rollNumber: string;
  tenthMarks: number;
  twelfthMarks: number;
  cgpa: number;
  avatar?: string;
  isEligible: boolean;
}

export type AdminPermission = 
  | "manage_companies" 
  | "manage_students" 
  | "manage_questions" 
  | "view_analytics" 
  | "manage_settings"
  | "manage_admins";

// Enhanced Company types for college-specific data
export interface CollegeCompany {
  id: string;
  name: string;
  role: string;
  package: string;
  location: string;
  description: string;
  logo?: string;
  website?: string;
  
  // College-specific data
  collegeId: string;
  visitYear: number;
  visitDate?: string;
  lastVisitYear?: number;
  
  eligibility: {
    cgpa: number;
    tenth: number;
    twelfth: number;
    backlogs: number;
    branches: string[];
    specialRequirements?: string[];
  };
  
  status: "upcoming" | "open" | "closed" | "postponed" | "cancelled";
  applicationDeadline: string;
  interviewDates: string;
  
  rounds: CompanyRound[];
  tips: TipCategory[];
  previousYearData: {
    [year: number]: {
      applied: number;
      shortlisted: number;
      selected: number;
      studentsSelected?: StudentSelection[];
    };
  };
  
  // Admin data
  addedBy: string; // Admin user ID
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CompanyRound {
  id: string;
  name: string;
  type: "online_test" | "technical_interview" | "hr_interview" | "group_discussion" | "aptitude_test";
  duration: string;
  description: string;
  topics: string[];
  isElimination: boolean;
  order: number;
}

export interface TipCategory {
  category: string;
  points: string[];
}

export interface StudentSelection {
  studentId: string;
  studentName: string;
  branch: string;
  cgpa: number;
  package: string;
}

// Question types for college-specific questions
export interface CollegeQuestion {
  id: string;
  companyId: string;
  companyName: string;
  collegeId: string;
  year: number;
  type: "coding" | "hr" | "aptitude" | "system_design" | "technical" | "group_discussion";
  round: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
  description?: string;
  hints?: string[];
  solution?: string;
  
  // Admin data
  addedBy: string;
  createdAt: string;
  isVerified: boolean;
  votes: number;
  reports: number;
}

// Analytics types
export interface PlacementStats {
  collegeId: string;
  year: number;
  totalStudents: number;
  placedStudents: number;
  averagePackage: number;
  highestPackage: number;
  companiesVisited: number;
  placementPercentage: number;
  branchWiseStats: BranchStats[];
  companyWiseStats: CompanyStats[];
}

export interface BranchStats {
  branch: string;
  totalStudents: number;
  placedStudents: number;
  averagePackage: number;
  placementPercentage: number;
}

export interface CompanyStats {
  companyId: string;
  companyName: string;
  studentsApplied: number;
  studentsSelected: number;
  averagePackage: number;
  selectionRate: number;
}

// API Request/Response types
export interface CreateCompanyRequest {
  name: string;
  role: string;
  package: string;
  location: string;
  description: string;
  eligibility: CollegeCompany['eligibility'];
  applicationDeadline: string;
  interviewDates: string;
  rounds: Omit<CompanyRound, 'id'>[];
}

export interface UpdateCompanyRequest extends Partial<CreateCompanyRequest> {
  id: string;
  status?: CollegeCompany['status'];
}

export interface CreateQuestionRequest {
  companyId: string;
  type: CollegeQuestion['type'];
  round: string;
  question: string;
  difficulty: CollegeQuestion['difficulty'];
  topics: string[];
  description?: string;
  hints?: string[];
  solution?: string;
}

export interface RegisterStudentRequest {
  name: string;
  email: string;
  password: string;
  branch: string;
  semester: string;
  rollNumber: string;
  tenthMarks: number;
  twelfthMarks: number;
  cgpa: number;
}

export interface RegisterAdminRequest {
  name: string;
  email: string;
  password: string;
  permissions: AdminPermission[];
  isSuper?: boolean;
}
