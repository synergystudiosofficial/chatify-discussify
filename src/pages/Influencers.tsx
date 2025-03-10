
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { fetchData } from "@/lib/db";
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

export default function Influencers() {
  const [influencersData, setInfluencersData] = useState<InfluencersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadInfluencersData = async () => {
      const response = await fetchData("influencers");
      if (response.success) {
        setInfluencersData(response.data as InfluencersData);
      }
      setLoading(false);
    };
    
    loadInfluencersData();
  }, []);

  const filteredInfluencers = influencersData?.influencers.filter(
    (influencer) => influencer.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddInfluencer = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new influencers will be available soon.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Influencers</h1>
          <Button onClick={handleAddInfluencer}>
            <Plus className="mr-2 h-4 w-4" />
            Add Influencer
          </Button>
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
