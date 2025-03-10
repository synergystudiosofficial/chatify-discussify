
// Define response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Function to fetch data - returns mock data
export async function fetchData<T>(collectionName: string): Promise<ApiResponse<T>> {
  console.log(`Fetching mock data for: ${collectionName}`);
  
  // Simulate a small delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { success: true, data: getMockData(collectionName) as T };
}

// Function to insert data - simulates successful insert
export async function insertData<T>(collectionName: string, data: any): Promise<ApiResponse<T>> {
  console.log(`Inserting mock data into: ${collectionName}`, data);
  
  // Simulate a small delay to mimic network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return { success: true, data: { ...data, _id: 'mock-id-' + Date.now() } as unknown as T };
}

// Mock data for UI development
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
