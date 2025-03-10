
import { useState, useEffect } from "react";
import { fetchData, ApiResponse } from "@/lib/db";
import { useToast } from "@/components/ui/use-toast";

export function useAdminData<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetchData<T>(endpoint);
      if (response.success) {
        setData(response.data);
        setError(null);
      } else {
        setError("Failed to fetch data");
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [endpoint]);

  return { data, loading, error, refetch: loadData };
}
