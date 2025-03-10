
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully."
      });
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="api">API Integration</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Manage your platform settings and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="platform-name">Platform Name</FormLabel>
                  <Input id="platform-name" defaultValue="OyeCreators" />
                  <FormDescription>
                    This is the name of your influencer platform.
                  </FormDescription>
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="support-email">Support Email</FormLabel>
                  <Input id="support-email" type="email" defaultValue="support@oyecreators.com" />
                  <FormDescription>
                    This email will be used for customer support inquiries.
                  </FormDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure your MongoDB connection and API settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel htmlFor="connection-string">MongoDB Connection String</FormLabel>
                  <Input 
                    id="connection-string" 
                    defaultValue="mongodb+srv://dev-user:******@oyecreators-8d327e59.mongo.ondigitalocean.com/oyecreators-lovable"
                    type="password"
                  />
                  <FormDescription>
                    Your database connection string (hidden for security).
                  </FormDescription>
                </div>
                
                <div className="space-y-2">
                  <FormLabel htmlFor="api-key">API Key</FormLabel>
                  <Input 
                    id="api-key" 
                    defaultValue="oye_api_9a8b7c6d5e4f3g2h1i"
                    type="password"
                  />
                  <FormDescription>
                    API key for external integrations.
                  </FormDescription>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Email Notifications</FormLabel>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="new-influencer" defaultChecked />
                    <label htmlFor="new-influencer">New influencer registrations</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="campaign-updates" defaultChecked />
                    <label htmlFor="campaign-updates">Campaign status updates</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="payment-reports" defaultChecked />
                    <label htmlFor="payment-reports">Payment reports</label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
