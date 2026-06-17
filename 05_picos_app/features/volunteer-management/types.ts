export type VolunteerStatus = "Active" | "Inactive" | "On Ground" | "On Leave" | "New";
export type WorkloadStatus = "Stable" | "Busy" | "Overloaded" | "Needs Follow-up";
export type VolunteerRole =
  | "Campaign Manager"
  | "Constituency Coordinator"
  | "Ward Coordinator"
  | "Village Coordinator"
  | "Booth Coordinator"
  | "Volunteer"
  | "Data Volunteer"
  | "Field Volunteer"
  | "Youth Volunteer"
  | "Women Outreach Volunteer";

export type Volunteer = {
  id: string;
  name: string;
  role: VolunteerRole;
  status: VolunteerStatus;
  workloadStatus: WorkloadStatus;
  phone: string;
  whatsapp: string;
  village: string;
  ward: string;
  booth: string;
  zone: string;
  coordinator: string;
  reportsToId?: string;
  skills: string[];
  assignedCampaigns: string[];
  activeTasks: number;
  completedTasks: number;
  verifiedTasks: number;
  overdueTasks: number;
  capacity: number;
  performanceScore: number;
  attendanceScore: number;
  activityScore: number;
  reportQualityScore: number;
  lastActivity: string;
  nextDeadline: string;
  reportsSubmitted: number;
  doorVisits: number;
  callsMade: number;
  meetingsAttended: number;
  issuesReported: number;
  opponentActivityReported: number;
};

export type VolunteerTab =
  | "overview"
  | "directory"
  | "workload"
  | "command-structure"
  | "tasks"
  | "reports"
  | "attendance"
  | "performance"
  | "settings";

export type VolunteerFiltersState = {
  zone: string;
  role: string;
  status: string;
  booth: string;
  coordinator: string;
  search: string;
  includeInactive: boolean;
};
