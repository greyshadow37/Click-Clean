// Define types for the application data structure
export type IssueStatus = "pending" | "in_progress" | "resolved";

export interface Department {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "operational" | "under_maintenance" | "closed";
  latitude: number | null;
  longitude: number | null;
}

export interface CivicIssue {
  id: string;
  location: string;
  type: string;
  status: IssueStatus;
  description: string;
  date_reported: string;
  last_update: string;
  priority: "high" | "medium" | "low";
  latitude: number | null;
  longitude: number | null;
  reported_by: string | null;
  assigned_to: string | null;
}

interface Complaint {
  id: number;
  type: string;
  location: string;
  status: "reported" | "in_progress" | "resolved";
  date: string;
  priority: "high" | "medium" | "low";
}

// DEPRECATED: CommunityReporter interface should be removed as its data comes from
// combining profiles and aggregate queries on civic_issues, not a direct database table
// Keeping for backward compatibility but should be replaced with database queries
export interface CommunityReporter {
  id: string;
  name: string;
  area: string;
  reportsSubmitted: number;
  score: number;
  rank: number;
  issuesResolved: number;
  trainingCompleted: number;
  city: string;
}

// Reward interface - frontend model, no corresponding Supabase table yet
// ID changed to string for future Supabase compatibility
export interface Reward {
  id: string;
  name: string;
  points: number;
  category: string;
  description: string;
  image: string;
}

// TrainingModule interface - frontend model for training content
// ID changed to string for future Supabase compatibility
export interface TrainingModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
}

export type UserRole = "citizen" | "reporter" | "municipal" | "admin";

export interface UserState {
  role: UserRole;
  name: string;
  area: string;
  completedTraining: number;
}

// Data Definition
export const appData = {
  civicStatistics: {
    dailyReports: 1250,
    resolvedIssues: 980,
    pendingIssues: 270,
    averageResolutionTime: 7,
    citizenSatisfaction: 85,
  },
  departments: [
    {
      id: "1",
      name: "Delhi Municipal Corporation",
      type: "Public Works",
      location: "Delhi",
      status: "operational",
      latitude: 28.6139,
      longitude: 77.2090,
    },
    {
      id: "2",
      name: "Mumbai Civic Services",
      type: "Infrastructure",
      location: "Mumbai",
      status: "operational",
      latitude: 19.0760,
      longitude: 72.8777,
    },
    {
      id: "3",
      name: "Bangalore City Council",
      type: "Utilities",
      location: "Bangalore",
      status: "operational",
      latitude: 12.9716,
      longitude: 77.5946,
    },
    {
      id: "4",
      name: "Chennai Corporation",
      type: "Maintenance",
      location: "Chennai",
      status: "under_maintenance",
      latitude: 13.0827,
      longitude: 80.2707,
    },
  ] as Department[],
  trainingModules: [
    {
      id: "1",
      title: "How to Report Civic Issues",
      duration: "15 mins",
      completed: false,
      progress: 0,
    },
    {
      id: "2",
      title: "Understanding Local Government",
      duration: "25 mins",
      completed: false,
      progress: 30,
    },
    {
      id: "3",
      title: "Community Engagement Best Practices",
      duration: "20 mins",
      completed: true,
      progress: 100,
    },
    {
      id: "4",
      title: "Digital Tools for City Improvement",
      duration: "30 mins",
      completed: false,
      progress: 60,
    },
  ] as TrainingModule[],
  civicIssues: [
    {
      id: "1",
      location: "Sector 15, Gurgaon",
      type: "Pothole",
      status: "pending",
      description: "Large pothole causing traffic issues",
      date_reported: "2025-10-20",
      last_update: "2025-10-20",
      priority: "high",
      latitude: 28.4595,
      longitude: 77.0266,
      reported_by: null,
      assigned_to: null,
    },
    {
      id: "2",
      location: "MG Road, Bangalore",
      type: "Streetlight",
      status: "in_progress",
      description: "Streetlight not working for 3 days",
      date_reported: "2025-10-21",
      last_update: "2025-10-22",
      priority: "medium",
      latitude: 12.9716,
      longitude: 77.5946,
      reported_by: null,
      assigned_to: null,
    },
    {
      id: "3",
      location: "Marine Drive, Mumbai",
      type: "Garbage",
      status: "resolved",
      description: "Overflowing garbage bin",
      date_reported: "2025-10-19",
      last_update: "2025-10-23",
      priority: "high",
      latitude: 18.9440,
      longitude: 72.8236,
      reported_by: null,
      assigned_to: null,
    },
  ] as CivicIssue[],
  complaints: [
    {
      id: 1,
      type: "Illegal Dumping",
      location: "Yamuna Bank, Delhi",
      status: "reported",
      date: "2025-10-25",
      priority: "high",
    },
    {
      id: 2,
      type: "Broken Streetlight",
      location: "Connaught Place, Delhi",
      status: "in_progress",
      date: "2025-10-24",
      priority: "medium",
    },
    {
      id: 3,
      type: "Pothole Repair",
      location: "Salt Lake, Kolkata",
      status: "resolved",
      date: "2025-10-23",
      priority: "low",
    },
  ] as Complaint[], // Added city, wasteDiverted, and trainingCompleted to champions for leaderboard consistency
  communityReporters: [
    {
      id: "1",
      name: "Rajesh Kumar",
      area: "Gurgaon Sector 15",
      reportsSubmitted: 45,
      score: 920,
      rank: 2,
      issuesResolved: 35,
      trainingCompleted: 4,
      city: "Gurgaon",
    },
    {
      id: "2",
      name: "Priya Sharma",
      area: "Mumbai Bandra",
      reportsSubmitted: 52,
      score: 1100,
      rank: 1,
      issuesResolved: 48,
      trainingCompleted: 5,
      city: "Mumbai",
    },
    {
      id: "3",
      name: "Amit Singh",
      area: "Bangalore Koramangala",
      reportsSubmitted: 38,
      score: 750,
      rank: 3,
      issuesResolved: 30,
      trainingCompleted: 3,
      city: "Bangalore",
    },
  ] as CommunityReporter[], // FIX: Renamed from 'utilities' to 'marketplace' to match Marketplace.tsx
  rewards: [
    {
      id: "1",
      name: "Community Service Certificate",
      points: 100,
      category: "Recognition",
      description: "Certificate for active community reporting",
      image: "/api/placeholder/100/100",
    },
    {
      id: "2",
      name: "City Hero Badge",
      points: 250,
      category: "Achievement",
      description: "Special badge for resolving major issues",
      image: "/api/placeholder/100/100",
    },
    {
      id: "3",
      name: "Priority Response",
      points: 50,
      category: "Service",
      description: "Faster response to your future reports",
      image: "/api/placeholder/100/100",
    },
    {
      id: "4",
      name: "Local Event Invitation",
      points: 150,
      category: "Social",
      description: "Invitation to city improvement events",
      image: "/api/placeholder/100/100",
    },
    {
      id: "5",
      name: "Eco-Friendly Kit",
      points: 200,
      category: "Utility",
      description: "Kit with reusable bags and water bottles",
      image: "/api/placeholder/100/100",
    },
  ] as Reward[],
};

export const initialUserState: UserState = {
  role: "citizen",
  name: "User",
  area: "Delhi",
  completedTraining: 2,
};
