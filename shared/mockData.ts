import { Company, Question, Student } from "./types";

// Mock student data
export const mockStudent: Student = {
  id: "1",
  name: "Dharmesh Bhatt",
  email: "dharmesh@example.com",
  branch: "Computer Science Engineering",
  semester: "7",
  tenthMarks: 88.5,
  twelfthMarks: 91.2,
  cgpa: 8.7,
  avatar: undefined
};

// Mock companies data
export const mockCompanies: Company[] = [
  {
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
      branches: ["Computer Science Engineering", "Information Technology", "Electronics and Communication"]
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
    sampleQuestions: [],
    isEligible: true,
    priority: "high"
  },
  {
    id: 2,
    name: "Microsoft",
    role: "SDE Intern",
    package: "12-15 LPA",
    location: "Hyderabad, Pune",
    description: "Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    eligibility: {
      cgpa: 8.0,
      tenth: 85,
      twelfth: 85,
      backlogs: 0,
      branches: ["Computer Science Engineering", "Information Technology"]
    },
    status: "Open",
    applicationDeadline: "2024-02-10",
    interviewDates: "2024-02-12 to 2024-02-16",
    rounds: [
      {
        name: "Online Assessment",
        duration: "75 minutes",
        description: "Coding questions and aptitude test",
        topics: ["Programming", "Data Structures", "Problem Solving", "Logical Reasoning"]
      },
      {
        name: "Technical Interview",
        duration: "50 minutes",
        description: "Technical concepts and coding problems",
        topics: ["Algorithms", "System Design", "Programming Languages", "Database Concepts"]
      },
      {
        name: "HR Round",
        duration: "25 minutes",
        description: "Behavioral and situational questions",
        topics: ["Communication", "Leadership", "Microsoft Culture"]
      }
    ],
    previousYearData: {
      2023: { applied: 320, shortlisted: 45, selected: 8 },
      2022: { applied: 280, shortlisted: 38, selected: 6 },
      2021: { applied: 250, shortlisted: 35, selected: 7 }
    },
    tips: [
      {
        category: "Preparation",
        points: [
          "Practice coding problems on LeetCode and HackerRank",
          "Understand Microsoft's products and services",
          "Review basic computer science fundamentals",
          "Prepare for behavioral questions using STAR method"
        ]
      }
    ],
    sampleQuestions: [],
    isEligible: true,
    priority: "high"
  },
  {
    id: 3,
    name: "Amazon",
    role: "Software Development Engineer",
    package: "20-25 LPA",
    location: "Bangalore, Chennai",
    description: "Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    eligibility: {
      cgpa: 7.0,
      tenth: 75,
      twelfth: 75,
      backlogs: 1,
      branches: ["Computer Science Engineering", "Information Technology", "Electronics and Communication", "Electrical Engineering"]
    },
    status: "Registrations Open",
    applicationDeadline: "2024-02-20",
    interviewDates: "2024-02-25 to 2024-03-02",
    rounds: [
      {
        name: "Online Assessment",
        duration: "105 minutes",
        description: "Programming questions and debugging",
        topics: ["Data Structures", "Algorithms", "Problem Solving", "Code Debugging"]
      },
      {
        name: "Technical Interview 1",
        duration: "45 minutes",
        description: "Data structures and algorithms",
        topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Dynamic Programming"]
      },
      {
        name: "Technical Interview 2",
        duration: "45 minutes",
        description: "System design and architecture",
        topics: ["System Design", "Scalability", "Database Design", "APIs"]
      },
      {
        name: "Bar Raiser Round",
        duration: "45 minutes",
        description: "Amazon leadership principles and technical depth",
        topics: ["Leadership Principles", "Technical Excellence", "Problem Solving"]
      },
      {
        name: "Hiring Manager Round",
        duration: "30 minutes",
        description: "Role-specific questions and team fit",
        topics: ["Role Expectations", "Team Collaboration", "Career Goals"]
      }
    ],
    previousYearData: {
      2023: { applied: 520, shortlisted: 95, selected: 18 },
      2022: { applied: 480, shortlisted: 85, selected: 15 },
      2021: { applied: 420, shortlisted: 75, selected: 12 }
    },
    tips: [
      {
        category: "Leadership Principles",
        points: [
          "Study Amazon's 16 Leadership Principles thoroughly",
          "Prepare STAR format examples for each principle",
          "Focus on customer obsession and ownership",
          "Show examples of diving deep and delivering results"
        ]
      }
    ],
    sampleQuestions: [],
    isEligible: true,
    priority: "medium"
  },
  {
    id: 4,
    name: "Infosys",
    role: "Systems Engineer",
    package: "4-6 LPA",
    location: "Multiple Locations",
    description: "Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.",
    eligibility: {
      cgpa: 6.5,
      tenth: 70,
      twelfth: 70,
      backlogs: 2,
      branches: ["All Engineering Branches"]
    },
    status: "Upcoming",
    applicationDeadline: "2024-03-01",
    interviewDates: "2024-03-05 to 2024-03-10",
    rounds: [
      {
        name: "Online Test",
        duration: "65 minutes",
        description: "Aptitude, logical reasoning, and basic programming",
        topics: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Basic Programming"]
      },
      {
        name: "Technical Interview",
        duration: "20 minutes",
        description: "Basic technical concepts and programming",
        topics: ["Programming Basics", "Database Concepts", "Networking", "Software Engineering"]
      },
      {
        name: "HR Interview",
        duration: "15 minutes",
        description: "Communication skills and cultural fit",
        topics: ["Communication", "Company Knowledge", "Career Goals"]
      }
    ],
    previousYearData: {
      2023: { applied: 800, shortlisted: 200, selected: 120 },
      2022: { applied: 750, shortlisted: 180, selected: 100 },
      2021: { applied: 700, shortlisted: 170, selected: 95 }
    },
    tips: [
      {
        category: "Preparation",
        points: [
          "Focus on aptitude and logical reasoning",
          "Practice basic programming concepts",
          "Improve communication skills",
          "Learn about Infosys services and values"
        ]
      }
    ],
    sampleQuestions: [],
    isEligible: true,
    priority: "low"
  },
  {
    id: 5,
    name: "Goldman Sachs",
    role: "Technology Analyst",
    package: "15-20 LPA",
    location: "Mumbai, Bangalore",
    description: "The Goldman Sachs Group, Inc. is an American multinational investment bank and financial services company.",
    eligibility: {
      cgpa: 8.5,
      tenth: 90,
      twelfth: 90,
      backlogs: 0,
      branches: ["Computer Science Engineering", "Information Technology"]
    },
    status: "Closed",
    applicationDeadline: "2024-01-30",
    interviewDates: "2024-02-05 to 2024-02-08",
    rounds: [
      {
        name: "HackerRank Test",
        duration: "90 minutes",
        description: "Programming and problem solving",
        topics: ["Data Structures", "Algorithms", "Mathematics", "Problem Solving"]
      },
      {
        name: "Technical Interview 1",
        duration: "60 minutes",
        description: "Technical concepts and coding",
        topics: ["Programming", "System Design", "Database", "Finance Domain"]
      },
      {
        name: "Technical Interview 2",
        duration: "45 minutes",
        description: "Advanced technical concepts",
        topics: ["Architecture", "Scalability", "Performance", "Security"]
      },
      {
        name: "Behavioral Interview",
        duration: "30 minutes",
        description: "Cultural fit and motivation",
        topics: ["Teamwork", "Leadership", "Finance Interest", "Goldman Sachs Culture"]
      }
    ],
    previousYearData: {
      2023: { applied: 150, shortlisted: 25, selected: 5 },
      2022: { applied: 140, shortlisted: 22, selected: 4 },
      2021: { applied: 130, shortlisted: 20, selected: 3 }
    },
    tips: [
      {
        category: "Preparation",
        points: [
          "Strong mathematical and analytical skills required",
          "Understand financial markets and instruments",
          "Focus on high-quality code and optimization",
          "Demonstrate interest in finance and technology intersection"
        ]
      }
    ],
    sampleQuestions: [],
    isEligible: false,
    priority: "high"
  }
];

// Mock questions data
export const mockQuestions: Question[] = [
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
  },
  {
    id: 9,
    company: "Goldman Sachs",
    year: 2023,
    type: "Coding",
    question: "Calculate the maximum profit from stock prices array.",
    difficulty: "Medium",
    topics: ["Arrays", "Dynamic Programming", "Greedy"],
    description: "Given an array of stock prices, find the maximum profit that can be obtained by buying and selling the stock.",
    hints: ["Track minimum price seen so far", "Calculate profit at each day", "Keep track of maximum profit"],
    isFavorite: false
  },
  {
    id: 10,
    company: "Amazon",
    year: 2023,
    type: "System Design",
    question: "Design a chat application like WhatsApp.",
    difficulty: "Hard",
    topics: ["System Design", "Real-time Communication", "Database Design", "Scalability"],
    description: "Design a messaging application that supports real-time messaging, group chats, and file sharing.",
    hints: ["WebSocket for real-time communication", "Message queues", "Database sharding", "CDN for media files"],
    isFavorite: true
  }
];

// Update companies with their respective questions
mockCompanies.forEach(company => {
  company.sampleQuestions = mockQuestions.filter(q => q.company === company.name);
});
