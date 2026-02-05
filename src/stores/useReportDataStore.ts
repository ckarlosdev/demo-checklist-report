import { persist } from "zustand/middleware";
import type { ReportData } from "../types";
import { create } from "zustand";

type reportDataStore = {
  demoReport: ReportData;
  setDemoReport: <K extends keyof ReportData>(
    key: K,
    value: ReportData[K],
  ) => void;
  setItemResponse: (itemId: number, response: string) => void;
  reset: () => void;
  setFullDailyReportData: (data: ReportData) => void;
};

const getTodayDate = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
  return localISOTime;
};

const initialData: ReportData = {
  demoChecklistsId: null,
  jobsId: null,
  checklistDate: getTodayDate(),
  buildingType: "",
  foreman: "",
  notes: "",
  signature: "",
  permits: "",
  items: [],
  createdBy: "",
  updatedBy: "",
};

const useReportDataStore = create<reportDataStore>()(
  persist(
    (set) => ({
      demoReport: initialData,
      setDemoReport: (key, value) =>
        set((state) => ({
          demoReport: {
            ...state.demoReport,
            [key]: value,
          },
        })),
      setItemResponse: (itemId, response) =>
        set((state) => {
          const currentItems = state.demoReport.items ?? [];
          const existingIndex = currentItems.findIndex(
            (i) => i.demoItemsId === itemId,
          );

          let newItems;
          if (existingIndex > -1) {
            // Clonamos y actualizamos el item existente
            newItems = [...currentItems];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              response,
            };
          } else {
            // Agregamos un nuevo item al array
            newItems = [
              ...currentItems,
              {
                temporalId: crypto.randomUUID(),
                demoChecklistsItemsId: null,
                demoItemsId: itemId,
                response,
              },
            ];
          }

          return {
            demoReport: {
              ...state.demoReport,
              items: newItems,
            },
          };
        }),
      reset: () =>
        set(() => ({
          demoReport: initialData,
        })),

      setFullDailyReportData: (data) =>
        set(() => ({
          demoReport: data,
        })),
    }),
    {
      name: "demo-checklist-storage",
    },
  ),
);

export default useReportDataStore;
