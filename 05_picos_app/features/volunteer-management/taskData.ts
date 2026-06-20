import type { Volunteer } from "./types";

export type VolunteerTaskCategory =
  | "Field Outreach"
  | "Booth Operations"
  | "Intelligence Gathering"
  | "Event Support"
  | "Volunteer Recruitment"
  | "Voter Verification"
  | "Community Engagement"
  | "Opponent Monitoring"
  | "Administrative"
  | "Custom";

export type VolunteerTaskPriority = "Critical" | "High" | "Medium" | "Low";
export type VolunteerTaskStatus =
  | "Created"
  | "Assigned"
  | "Accepted"
  | "In Progress"
  | "Submitted"
  | "Verified"
  | "Completed"
  | "Rejected"
  | "Returned For Rework"
  | "Escalated"
  | "Archived";
export type VolunteerTaskAssigneeType = "Individual Volunteer" | "Booth Coordinator" | "Ward Coordinator" | "Multiple Volunteers" | "Volunteer Team";
export type VolunteerTaskLocationType = "Constituency" | "Zone" | "Ward" | "Village" | "Booth";
export type VolunteerTaskEvidence = "Photo" | "Video" | "Audio" | "Notes" | "Survey Form" | "Attendance Confirmation" | "No Evidence Required";
export type VolunteerTaskRelatedModule = "" | "Booth Intelligence" | "Issue Mapping" | "Political Intelligence" | "Event Management" | "Voter Intelligence";

export type VolunteerTask = {
  id: string;
  title: string;
  category: VolunteerTaskCategory;
  description: string;
  assigneeType: VolunteerTaskAssigneeType;
  assigneeIds: string[];
  locationType: VolunteerTaskLocationType;
  location: string;
  priority: VolunteerTaskPriority;
  dueDate: string;
  dueTime: string;
  expectedOutcome: string;
  evidenceRequired: VolunteerTaskEvidence[];
  relatedModule: VolunteerTaskRelatedModule;
  status: VolunteerTaskStatus;
  overdue: boolean;
  createdAt: string;
  completedAt?: string;
};

export const volunteerTaskData: VolunteerTask[] = [
  {
    id: "task-booth-102",
    title: "Booth Verification",
    category: "Booth Operations",
    description: "Visit Booth 102 and verify volunteer availability before field deployment.",
    assigneeType: "Booth Coordinator",
    assigneeIds: ["vol-priya-kale"],
    locationType: "Booth",
    location: "Booth 102",
    priority: "High",
    dueDate: "2026-06-21",
    dueTime: "17:00",
    expectedOutcome: "Verify all volunteer contacts and identify coverage gaps.",
    evidenceRequired: ["Photo", "Notes"],
    relatedModule: "Booth Intelligence",
    status: "In Progress",
    overdue: false,
    createdAt: "2026-06-19"
  },
  {
    id: "task-water-musalgaon",
    title: "Issue Collection",
    category: "Intelligence Gathering",
    description: "Collect household statements about the current water supply disruption.",
    assigneeType: "Ward Coordinator",
    assigneeIds: ["vol-sachin-jadhav"],
    locationType: "Village",
    location: "Musalgaon",
    priority: "Critical",
    dueDate: "2026-06-20",
    dueTime: "14:00",
    expectedOutcome: "Document impact, affected lanes, and escalation contacts.",
    evidenceRequired: ["Photo", "Notes", "Survey Form"],
    relatedModule: "Issue Mapping",
    status: "Submitted",
    overdue: false,
    createdAt: "2026-06-19"
  },
  {
    id: "task-wavi-monitoring",
    title: "Opponent Activity Monitoring",
    category: "Opponent Monitoring",
    description: "Validate door-to-door activity reported near Wavi Ward 4.",
    assigneeType: "Volunteer Team",
    assigneeIds: ["vol-rohit-wagh", "vol-nilesh-kale"],
    locationType: "Ward",
    location: "Wavi Ward",
    priority: "High",
    dueDate: "2026-06-19",
    dueTime: "19:30",
    expectedOutcome: "Confirm activity scale without confrontation and submit notes.",
    evidenceRequired: ["Notes"],
    relatedModule: "Political Intelligence",
    status: "Escalated",
    overdue: true,
    createdAt: "2026-06-18"
  },
  {
    id: "task-shg-meeting",
    title: "Ward Meeting",
    category: "Community Engagement",
    description: "Coordinate the women SHG listening meeting and record attendance.",
    assigneeType: "Individual Volunteer",
    assigneeIds: ["vol-meena-pawar"],
    locationType: "Village",
    location: "Dubere",
    priority: "Medium",
    dueDate: "2026-06-22",
    dueTime: "11:00",
    expectedOutcome: "Capture three priority concerns and named follow-up owners.",
    evidenceRequired: ["Attendance Confirmation", "Notes"],
    relatedModule: "Event Management",
    status: "Accepted",
    overdue: false,
    createdAt: "2026-06-19"
  },
  {
    id: "task-voter-list",
    title: "Voter List Validation",
    category: "Voter Verification",
    description: "Validate flagged voter records and update household notes.",
    assigneeType: "Multiple Volunteers",
    assigneeIds: ["vol-aarti-gaikwad", "vol-sunita-more"],
    locationType: "Zone",
    location: "Nandur Belt",
    priority: "Medium",
    dueDate: "2026-06-23",
    dueTime: "16:00",
    expectedOutcome: "Resolve all flagged records with source notes.",
    evidenceRequired: ["Survey Form"],
    relatedModule: "Voter Intelligence",
    status: "Assigned",
    overdue: false,
    createdAt: "2026-06-20"
  },
  {
    id: "task-recruitment",
    title: "Volunteer Recruitment",
    category: "Volunteer Recruitment",
    description: "Identify and onboard booth-level volunteers for uncovered areas.",
    assigneeType: "Booth Coordinator",
    assigneeIds: ["vol-ganesh-borse"],
    locationType: "Zone",
    location: "Baragaon Belt",
    priority: "Low",
    dueDate: "2026-06-24",
    dueTime: "",
    expectedOutcome: "Confirm five available volunteers with contact details.",
    evidenceRequired: ["Notes"],
    relatedModule: "",
    status: "Completed",
    overdue: false,
    createdAt: "2026-06-15",
    completedAt: "2026-06-19"
  }
];

export const volunteerTaskCategories: VolunteerTaskCategory[] = ["Field Outreach", "Booth Operations", "Intelligence Gathering", "Event Support", "Volunteer Recruitment", "Voter Verification", "Community Engagement", "Opponent Monitoring", "Administrative", "Custom"];
export const volunteerTaskPriorities: VolunteerTaskPriority[] = ["Critical", "High", "Medium", "Low"];
export const volunteerTaskAssigneeTypes: VolunteerTaskAssigneeType[] = ["Individual Volunteer", "Booth Coordinator", "Ward Coordinator", "Multiple Volunteers", "Volunteer Team"];
export const volunteerTaskLocationTypes: VolunteerTaskLocationType[] = ["Constituency", "Zone", "Ward", "Village", "Booth"];
export const volunteerTaskEvidenceOptions: VolunteerTaskEvidence[] = ["Photo", "Video", "Audio", "Notes", "Survey Form", "Attendance Confirmation", "No Evidence Required"];
export const volunteerTaskRelatedModules: VolunteerTaskRelatedModule[] = ["", "Booth Intelligence", "Issue Mapping", "Political Intelligence", "Event Management", "Voter Intelligence"];

export function getVolunteerCompletedTaskHistory(volunteer: Volunteer): VolunteerTask[] {
  const templates: Array<Pick<VolunteerTask, "title" | "category" | "description" | "expectedOutcome" | "evidenceRequired" | "relatedModule">> = [
    { title: "Household Contact Verification", category: "Field Outreach", description: "Verify assigned household contacts and record field notes.", expectedOutcome: "Complete the assigned contact list with verified notes.", evidenceRequired: ["Notes"], relatedModule: "Voter Intelligence" },
    { title: "Booth Volunteer Check", category: "Booth Operations", description: "Confirm volunteer availability and escalation contacts.", expectedOutcome: "Submit an updated booth availability record.", evidenceRequired: ["Attendance Confirmation"], relatedModule: "Booth Intelligence" },
    { title: "Community Issue Follow-up", category: "Community Engagement", description: "Follow up on previously reported community concerns.", expectedOutcome: "Confirm issue status and responsible follow-up owner.", evidenceRequired: ["Photo", "Notes"], relatedModule: "Issue Mapping" },
    { title: "Voter Record Validation", category: "Voter Verification", description: "Validate flagged voter records with household sources.", expectedOutcome: "Resolve flagged records with source confirmation.", evidenceRequired: ["Survey Form"], relatedModule: "Voter Intelligence" },
    { title: "Field Meeting Support", category: "Event Support", description: "Support meeting mobilization and confirm attendance.", expectedOutcome: "Submit attendance and key discussion notes.", evidenceRequired: ["Attendance Confirmation", "Notes"], relatedModule: "Event Management" }
  ];

  return templates.map((template, index) => ({
    ...template,
    id: `history-${volunteer.id}-${index + 1}`,
    assigneeType: "Individual Volunteer",
    assigneeIds: [volunteer.id],
    locationType: volunteer.booth === "Command Desk" ? "Constituency" : "Booth",
    location: volunteer.booth === "Command Desk" ? "Sinnar" : volunteer.booth,
    priority: index === 2 ? "High" : index === 4 ? "Low" : "Medium",
    dueDate: `2026-06-${String(14 + index).padStart(2, "0")}`,
    dueTime: "",
    status: index % 2 === 0 ? "Verified" : "Completed",
    overdue: false,
    createdAt: `2026-06-${String(10 + index).padStart(2, "0")}`,
    completedAt: `2026-06-${String(13 + index).padStart(2, "0")}`
  }));
}
