import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CollegeConfig, User, AdminUser, StudentUser } from '@shared/collegeTypes';

interface CollegeContextType {
  college: CollegeConfig | null;
  user: User | null;
  isAdmin: boolean;
  isStudent: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCollege: (config: CollegeConfig) => void;
  updateUser: (user: User) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

// Default college configuration (you can customize this)
const defaultCollegeConfig: CollegeConfig = {
  id: "college-001",
  name: "Your College Name",
  shortName: "YCN",
  emailDomain: "student.college.edu", // Change this to your college domain
  adminEmails: ["admin@college.edu", "placement@college.edu"],
  address: "College Address, City, State, PIN",
  website: "https://www.college.edu",
  theme: {
    primaryColor: "#6366f1", // Indigo
    secondaryColor: "#8b5cf6", // Purple
    accentColor: "#06b6d4"     // Cyan
  },
  placementCell: {
    email: "placement@college.edu",
    phone: "+91-XXXX-XXXX",
    coordinatorName: "Dr. Placement Coordinator"
  },
  branches: [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering"
  ],
  activeYear: 2024
};

export function CollegeProvider({ children }: { children: ReactNode }) {
  const [college, setCollege] = useState<CollegeConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load college config from localStorage or API
    const savedConfig = localStorage.getItem('collegeConfig');
    if (savedConfig) {
      setCollege(JSON.parse(savedConfig));
    } else {
      setCollege(defaultCollegeConfig);
      localStorage.setItem('collegeConfig', JSON.stringify(defaultCollegeConfig));
    }

    // Check for existing authentication
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock login logic - in real app, this would call your API
      
      // Check if it's an admin email
      if (college?.adminEmails.includes(email)) {
        const adminUser: AdminUser = {
          id: 'admin-1',
          email,
          name: 'Admin User',
          role: 'admin',
          collegeId: college.id,
          isVerified: true,
          createdAt: new Date().toISOString(),
          permissions: ['manage_companies', 'manage_students', 'manage_questions', 'view_analytics', 'manage_settings']
        };
        setUser(adminUser);
        localStorage.setItem('currentUser', JSON.stringify(adminUser));
        return true;
      }
      
      // Check if it's a student email with correct domain
      if (college && email.endsWith(`@${college.emailDomain}`)) {
        const studentUser: StudentUser = {
          id: 'student-1',
          email,
          name: email.split('@')[0].replace(/\./g, ' ').replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          ),
          role: 'student',
          collegeId: college.id,
          isVerified: true,
          createdAt: new Date().toISOString(),
          branch: 'Computer Science Engineering',
          semester: '7',
          rollNumber: 'CS2021001',
          tenthMarks: 88.5,
          twelfthMarks: 91.2,
          cgpa: 8.7,
          isEligible: true
        };
        setUser(studentUser);
        localStorage.setItem('currentUser', JSON.stringify(studentUser));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateCollege = (config: CollegeConfig) => {
    setCollege(config);
    localStorage.setItem('collegeConfig', JSON.stringify(config));
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  return (
    <CollegeContext.Provider value={{
      college,
      user,
      isAdmin,
      isStudent,
      isAuthenticated,
      login,
      logout,
      updateCollege,
      updateUser
    }}>
      {children}
    </CollegeContext.Provider>
  );
}

export function useCollege() {
  const context = useContext(CollegeContext);
  if (context === undefined) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
}
