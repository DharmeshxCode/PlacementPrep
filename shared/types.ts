// Student data types
export interface Student {
  id: string;
  name: string;
  email: string;
  branch: string;
  semester: string;
  tenthMarks: number;
  twelfthMarks: number;
  cgpa: number;
  avatar?: string;
}

// Company data types
export interface Company {
  id: number;
  name: string;
  role: string;
  package: string;
  location: string;
  description: string;
  eligibility: {
    cgpa: number;
    tenth: number;
    twelfth: number;
    backlogs: number;
    branches: string[];
  };
  status: "Open" | "Upcoming" | "Closed" | "Registrations Open";
  applicationDeadline: string;
  interviewDates: string;
  rounds: Round[];
  previousYearData: {
    [year: number]: {
      applied: number;
      shortlisted: number;
      selected: number;
    };
  };
  tips: TipCategory[];
  sampleQuestions: Question[];
  isEligible: boolean;
  priority: "high" | "medium" | "low";
}

export interface Round {
  name: string;
  duration: string;
  description: string;
  topics: string[];
}

export interface TipCategory {
  category: string;
  points: string[];
}

// Question data types
export interface Question {
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

// API Response types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  branch: string;
  semester: string;
  tenthMarks: number;
  twelfthMarks: number;
  cgpa: number;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Student;
  token?: string;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
}

export interface QuestionsResponse {
  questions: Question[];
  total: number;
}
