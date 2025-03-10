import { MongoClient, Collection, Db } from "mongodb";
import { toast } from "@/components/ui/use-toast";

// Define response interface
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Connection string - in a production environment, this should be in a secure backend
const CONNECTION_STRING = "mongodb+srv://dev-user:m9P0sg4D2d6M538J@oyecreators-8d327e59.mongo.ondigitalocean.com/oyecreators-lovable?tls=true&authSource=admin&replicaSet=oyecreators";

// Create MongoDB client
let client: MongoClient | null = null;
let db: Db | null = null;

// Initialize MongoDB connection
async function connectToDatabase(): Promise<{ client: MongoClient; db: Db } | null> {
  if (client && db) {
    return { client, db };
  }
  
  try {
    if (!client) {
      client = new MongoClient(CONNECTION_STRING);
      await client.connect();
      console.log("Connected to MongoDB successfully");
    }
    
    db = client.db("oyecreators-lovable");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    toast({
      title: "Database Error",
      description: "Failed to connect to the database. Please try again.",
      variant: "destructive",
    });
    return null;
  }
}

// Function to fetch data from MongoDB
export async function fetchData<T>(collectionName: string): Promise<ApiResponse<T>> {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return { success: false, data: [] as unknown as T, error: "Failed to connect to database" };
    }
    
    const { db } = connection;
    const collection: Collection = db.collection(collectionName);
    
    console.log(`Fetching data from collection: ${collectionName}`);
    
    // Use try-catch to handle potential MongoDB query errors
    try {
      let result;
      
      // For demonstration, we're using different queries based on collection name
      // In a real app, you might want to make this more flexible
      if (collectionName === "influencers") {
        result = await collection.find({}).toArray();
        
        // If the collection is empty, use mock data for demonstration
        if (result.length === 0) {
          console.log("Collection is empty, using mock data");
          return { success: true, data: getMockData(collectionName) as T };
        }
        
        return { success: true, data: { influencers: result } as unknown as T };
      } 
      else if (collectionName === "dashboard") {
        // For dashboard, we'd typically aggregate data from multiple collections
        // For now, we'll use mock data for simplicity
        return { success: true, data: getMockData(collectionName) as T };
      } 
      else if (collectionName === "campaigns") {
        result = await collection.find({}).toArray();
        
        // If the collection is empty, use mock data for demonstration
        if (result.length === 0) {
          console.log("Collection is empty, using mock data");
          return { success: true, data: getMockData(collectionName) as T };
        }
        
        return { success: true, data: { campaigns: result } as unknown as T };
      }
      else {
        // Default case
        result = await collection.find({}).toArray();
        return { success: true, data: result as unknown as T };
      }
    } catch (dbError) {
      console.error(`Error querying MongoDB collection ${collectionName}:`, dbError);
      return { 
        success: false, 
        data: [] as unknown as T, 
        error: `Error querying collection: ${(dbError as Error).message}` 
      };
    }
  } catch (error) {
    console.error("Error in fetchData:", error);
    toast({
      title: "Database Error",
      description: "Failed to fetch data from database. Please try again.",
      variant: "destructive",
    });
    return { success: false, data: [] as unknown as T, error: (error as Error).message };
  }
}

// Function to insert a new document to MongoDB
export async function insertData<T>(collectionName: string, data: any): Promise<ApiResponse<T>> {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return { success: false, data: {} as T, error: "Failed to connect to database" };
    }
    
    const { db } = connection;
    const collection: Collection = db.collection(collectionName);
    
    console.log(`Inserting data into collection: ${collectionName}`);
    
    const result = await collection.insertOne(data);
    
    if (result.acknowledged) {
      return { success: true, data: { ...data, _id: result.insertedId } as unknown as T };
    } else {
      return { success: false, data: {} as T, error: "Failed to insert document" };
    }
  } catch (error) {
    console.error("Error in insertData:", error);
    toast({
      title: "Database Error",
      description: "Failed to add data to database. Please try again.",
      variant: "destructive",
    });
    return { success: false, data: {} as T, error: (error as Error).message };
  }
}

// Mock data for UI development or when collections are empty
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

// Function to close the MongoDB connection
export async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("MongoDB connection closed");
  }
}
