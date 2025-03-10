
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { fetchData, ApiResponse } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Influencer {
  id: number;
  name: string;
  category: string;
  followers: string;
  engagement: string;
  status: string;
}

interface InfluencersData {
  influencers: Influencer[];
}

// Define form schema using Zod
const influencerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  mobile: z.string().min(10, { message: "Please enter a valid mobile number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  instagramId: z.string().min(1, { message: "Instagram ID is required" }),
  category: z.string().min(1, { message: "Category is required" }),
});

type InfluencerFormValues = z.infer<typeof influencerFormSchema>;

export default function Influencers() {
  const [influencersData, setInfluencersData] = useState<InfluencersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<InfluencerFormValues>({
    resolver: zodResolver(influencerFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      instagramId: "",
      category: "Lifestyle",
    },
  });

  useEffect(() => {
    const loadInfluencersData = async () => {
      const response = await fetchData<InfluencersData>("influencers");
      if (response.success) {
        setInfluencersData(response.data);
      }
      setLoading(false);
    };
    
    loadInfluencersData();
  }, []);

  const filteredInfluencers = influencersData?.influencers.filter(
    (influencer) => influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddInfluencer = (data: InfluencerFormValues) => {
    // In a real app, this would send the data to your API
    console.log("New influencer data:", data);
    
    // Simulate adding a new influencer to the list
    if (influencersData) {
      const newInfluencer: Influencer = {
        id: influencersData.influencers.length + 1,
        name: data.name,
        category: data.category,
        followers: "0", // New influencers start with 0 followers
        engagement: "0%", // New influencers start with 0% engagement
        status: "Active",
      };
      
      setInfluencersData({
        influencers: [...influencersData.influencers, newInfluencer]
      });
    }
    
    // Show success message
    toast({
      title: "Influencer Added",
      description: `${data.name} has been added successfully.`,
    });
    
    // Close the sheet and reset the form
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Influencers</h1>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Influencer
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Add New Influencer</SheetTitle>
                <SheetDescription>
                  Fill out the form below to add a new influencer to your network.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddInfluencer)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="instagramId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Instagram handle (without @)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Lifestyle, Fashion, Tech" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <SheetFooter className="pt-4">
                      <Button type="submit">Add Influencer</Button>
                    </SheetFooter>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex items-center space-x-2 max-w-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search influencers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9"
          />
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Influencer Directory</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInfluencers.map((influencer) => (
                    <TableRow key={influencer.id}>
                      <TableCell className="font-medium">{influencer.name}</TableCell>
                      <TableCell>{influencer.category}</TableCell>
                      <TableCell>{influencer.followers}</TableCell>
                      <TableCell>{influencer.engagement}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          influencer.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {influencer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast({
                          title: "View Profile",
                          description: `Viewing ${influencer.name}'s profile`
                        })}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
