import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ReportData } from "../types";
import { api } from "./apiConfig";
import useReportDataStore from "../stores/useReportDataStore";

const queryDemoChecklist = async (
  demoChecklist: number,
): Promise<ReportData> => {
  const { data } = await api.get(`/v1/demoChecklist/${demoChecklist}`);
  return data;
};

export function useDemoChecklist(demoChecklist: number) {
  return useQuery({
    queryKey: ["demoChecklist", demoChecklist],
    queryFn: () => queryDemoChecklist(demoChecklist),
    enabled: !!demoChecklist,
    retry: false,
  });
}

const createDemoChecklist = async ({
  reportData,
}: {
  reportData: ReportData;
}) => {
  if (!reportData.demoChecklistsId) {
    return api.post(`/v1/demoChecklist`, reportData);
  }
  return api.put(`/v1/demoChecklist`, reportData);
};

export function useSaveDemoChecklist() {
  const queryClient = useQueryClient();
  const { setFullDailyReportData } = useReportDataStore();

  return useMutation({
    mutationKey: ["save-report"],
    mutationFn: createDemoChecklist,
    onSuccess: (response) => {
      const savedData = response.data;
      const newId = response.data.demoChecklistsId;

      setFullDailyReportData(savedData);
      queryClient.invalidateQueries({ queryKey: ["demoChecklist", newId] });
      alert("Demo Checklist saved successfully.");
    },
    onError: () => {
      alert("Error saving Demo Checklist. Please try again.");
    },
  });
}
