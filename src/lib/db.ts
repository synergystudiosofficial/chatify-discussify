
import { toast } from "@/components/ui/use-toast";

// Define response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// This is a frontend placeholder that would normally be in a backend service
// In a production app, NEVER expose MongoDB connection strings in frontend code
const CONNECTION_STRING = "mongodb+srv://dev-user:m9P0sg4D2d6M538J@oyecreators-8d327e59.mongo.ondigitalocean.com/oyecreators-lovable?tls=true&authSource=admin&replicaSet=oyecreators";

export async function fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    // Simulating API fetch - in a real app, this would call a secure backend API
    // that handles the actual database operations
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: getMockData(endpoint) as T
        });
      }, 800);
    });
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch data. Please try again.",
      variant: "destructive",
    });
    return { success: false, data: [] as unknown as T };
  }
}

// Mock data for UI development purposes
function getMockData(endpoint: string) {
  switch (endpoint) {
    case "dashboard":
      return {
        totalInfluencers: 128,
        activeCampaigns: 12,
        pendingRequests: 26,
        revenueGenerated: 15400,
        recentActivity: [
          { id: 1, action: "Campaign Started", name: "Summer Collection Launch", date: "2 hours ago" },
          { id: 2, action: "New Influencer", name: "Sarah Johnson", date: "5 hours ago" },
          { id: 3, action: "Payment Processed", name: "James Wilson", date: "1 day ago" },
          { id: 4, action: "Campaign Ended", name: "Spring Promotion", date: "2 days ago" },
        ]
      };
    case "influencers":
      return {
        influencers: [
          { id: 1, name: "Alex Cooper", category: "Lifestyle", followers: "2.5M", engagement: "4.2%", status: "Active" },
          { id: 2, name: "Emma Roberts", category: "Fashion", followers: "1.8M", engagement: "3.7%", status: "Active" },
          { id: 3, name: "Ryan Mitchell", category: "Tech", followers: "950K", engagement: "5.1%", status: "Inactive" },
          { id: 4, name: "Olivia Wang", category: "Beauty", followers: "3.2M", engagement: "4.8%", status: "Active" },
          { id: 5, name: "Daniel Smith", category: "Fitness", followers: "1.2M", engagement: "6.3%", status: "Active" }
        ]
      };
    case "campaigns":
      return {
        campaigns: [
          { id: 1, name: "Summer Collection", brand: "FashionX", budget: "$45,000", influencers: 12, status: "Active" },
          { id: 2, name: "Product Launch", brand: "TechGadgets", budget: "$65,000", influencers: 8, status: "Planned" },
          { id: 3, name: "Holiday Special", brand: "HomeDecor", budget: "$32,000", influencers: 15, status: "Completed" },
          { id: 4, name: "App Promotion", brand: "GameStudios", budget: "$28,000", influencers: 6, status: "Active" }
        ]
      };
    default:
      return [];
  }
}
