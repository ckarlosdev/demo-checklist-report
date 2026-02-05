export type Job = {
  jobsId: number | null;
  number: string;
  type: string;
  name: string;
  address: string;
  contractor: string;
  contact: string;
  status: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
};

export type Employee = {
  employeesId: number;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  status: string;
  title: string;
};

export type ReportData = {
  demoChecklistsId: number | null;
  jobsId: number | null;
  checklistDate: string;
  buildingType: string | "";
  foreman: string | "";
  notes: string;
  signature: string | "";
  permits: string | "";
  items: ItemResponse[];
  createdBy: string;
  updatedBy: string;
};

export type ItemResponse = {
  temporalId: string;
  demoChecklistsItemsId: number | null;
  demoItemsId: number;
  response: string;
};

export type Item = {
  demoItemsId: number;
  itemGroup: string;
  itemDescription: string;
  itemType: string;
  cardPosition: string;
  itemPosition: string;
};
