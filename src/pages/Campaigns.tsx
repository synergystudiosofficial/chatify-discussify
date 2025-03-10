
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { fetchData, ApiResponse } from "@/lib/db";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface Campaign {
  id: number;
  name: string;
  brand: string;
  budget: string;
  influencers: number;
  status: string;
}

interface CampaignsData {
  campaigns: Campaign[];
}

export default function Campaigns() {
  const [campaignsData, setCampaignsData] = useState<CampaignsData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCampaignsData = async () => {
      const response = await fetchData<CampaignsData>("campaigns");
      if (response.success) {
        setCampaignsData(response.data);
      }
      setLoading(false);
    };
    
    loadCampaignsData();
  }, []);

  const handleAddCampaign = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to add new campaigns will be available soon.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Planned":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <Button onClick={handleAddCampaign}>
            <Plus className="mr-2 h-4 w-4" />
            Add Campaign
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>All Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-200 rounded"></div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Influencers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignsData?.campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.brand}</TableCell>
                      <TableCell>{campaign.budget}</TableCell>
                      <TableCell>{campaign.influencers}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => toast({
                          title: "View Campaign",
                          description: `Viewing details for ${campaign.name}`
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
