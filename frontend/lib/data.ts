// Define types for the application data structure
export interface Facility {
  id: number;
  name: string;
  type: string;
  capacity: number;
  location: string;
  status: "operational" | "under_construction" | "maintenance";
}

interface TrainingModule {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  progress: number;
}

export type BinStatus = "needs_collection" | "ok" | "overflowing";

export interface WasteBin {
  id: number;
  location: string;
  type: string;
  fillLevel: number;
  lastCollection: string;
  status: BinStatus;
}

interface Incident {
  id: number;
  type: string;
  location: string;
  status: "reported" | "in_progress" | "resolved";
  date: string;
  severity: "high" | "medium" | "low";
}

// Renamed for clarity and consistency across components
export interface GreenChampion {
  id: number;
  name: string;
  area: string;
  tasksCompleted: number;
  score: number;
  rank: number;
  wasteDiverted: number;
  trainingCompleted: number;
  city: string;
}

// FIX: Renamed from Utility to Product and EXPORTED to fix the Marketplace component error
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

export type UserRole = "citizen" | "champion" | "municipal" | "facility";

export interface UserState {
  role: UserRole;
  name: string;
  area: string;
  completedTraining: number;
}

// Data Definition
export const appData = {
  wasteStatistics: {
    dailyGeneration: 170339,
    dailyCollection: 156449,
    dailyTreatment: 91511,
    landfillDisposal: 41455,
    unaccounted: 37373,
    treatmentPercentage: 54,
    collectionEfficiency: 92,
  },
  facilities: [
    {
      id: 1,
      name: "Delhi WTE Plant",
      type: "Waste-to-Energy",
      capacity: 2000,
      location: "Delhi",
      status: "operational",
    },
    {
      id: 2,
      name: "Mumbai Biogas Plant",
      type: "Biogas",
      capacity: 500,
      location: "Mumbai",
      status: "operational",
    },
    {
      id: 3,
      name: "Bangalore Recycling Center",
      type: "Recycling",
      capacity: 1000,
      location: "Bangalore",
      status: "operational",
    },
    {
      id: 4,
      name: "Chennai Composting Plant",
      type: "Composting",
      capacity: 300,
      location: "Chennai",
      status: "under_construction",
    },
  ] as Facility[],
  trainingModules: [
    {
      id: 1,
      title: "Waste Segregation Basics",
      duration: "30 mins",
      completed: false,
      progress: 0,
    },
    {
      id: 2,
      title: "Home Composting Guide",
      duration: "45 mins",
      completed: false,
      progress: 0,
    },
    {
      id: 3,
      title: "Plastic Reuse Techniques",
      duration: "25 mins",
      completed: true,
      progress: 100,
    },
    {
      id: 4,
      title: "E-waste Management",
      duration: "35 mins",
      completed: false,
      progress: 60,
    },
  ] as TrainingModule[],
  wasteBins: [
    {
      id: 1,
      location: "Sector 15, Gurgaon",
      type: "Mixed",
      fillLevel: 85,
      lastCollection: "2025-08-26",
      status: "needs_collection",
    },
    {
      id: 2,
      location: "MG Road, Bangalore",
      type: "Dry",
      fillLevel: 45,
      lastCollection: "2025-08-27",
      status: "ok",
    },
    {
      id: 3,
      location: "Marine Drive, Mumbai",
      type: "Wet",
      fillLevel: 92,
      lastCollection: "2025-08-25",
      status: "overflowing",
    },
  ] as WasteBin[],
  incidents: [
    {
      id: 1,
      type: "Illegal Dumping",
      location: "Yamuna Bank, Delhi",
      status: "reported",
      date: "2025-08-27",
      severity: "high",
    },
    {
      id: 2,
      type: "Overflowing Bin",
      location: "Connaught Place, Delhi",
      status: "in_progress",
      date: "2025-08-26",
      severity: "medium",
    },
    {
      id: 3,
      type: "Missed Collection",
      location: "Salt Lake, Kolkata",
      status: "resolved",
      date: "2025-08-25",
      severity: "low",
    },
  ] as Incident[], // Added city, wasteDiverted, and trainingCompleted to champions for leaderboard consistency
  greenChampions: [
    {
      id: 1,
      name: "Rajesh Kumar",
      area: "Gurgaon Sector 15",
      tasksCompleted: 45,
      score: 920,
      rank: 2,
      wasteDiverted: 1500,
      trainingCompleted: 4,
      city: "Gurgaon",
    },
    {
      id: 2,
      name: "Priya Sharma",
      area: "Mumbai Bandra",
      tasksCompleted: 52,
      score: 1100,
      rank: 1,
      wasteDiverted: 2100,
      trainingCompleted: 5,
      city: "Mumbai",
    },
    {
      id: 3,
      name: "Amit Singh",
      area: "Bangalore Koramangala",
      tasksCompleted: 38,
      score: 750,
      rank: 3,
      wasteDiverted: 1200,
      trainingCompleted: 3,
      city: "Bangalore",
    },
  ] as GreenChampion[], // FIX: Renamed from 'utilities' to 'marketplace' to match Marketplace.tsx
  marketplace: [
    {
      id: 1,
      name: "3-Bin Segregation Set",
      price: 850,
      category: "Recycling",
      rating: 4.5,
      image: "/api/placeholder/100/100",
    },
    {
      id: 2,
      name: "Home Composting Kit",
      price: 1200,
      category: "Composting",
      rating: 4.8,
      image: "/api/placeholder/100/100",
    },
    {
      id: 3,
      name: "Waste Worker Safety Gear",
      price: 2500,
      category: "Sustainable",
      rating: 4.3,
      image: "/api/placeholder/100/100",
    },
    {
      id: 4,
      name: "20% off Grocery Voucher",
      price: 500,
      category: "Voucher",
      rating: 4.6,
      image: "/api/placeholder/100/100",
    },
    {
      id: 5,
      name: "Seed Starting Kit",
      price: 600,
      category: "Composting",
      rating: 4.1,
      image: "/api/placeholder/100/100",
    },
  ] as Product[],
};

export const initialUserState: UserState = {
  role: "citizen",
  name: "User",
  area: "Delhi",
  completedTraining: 2,
};
