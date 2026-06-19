export type VolunteerIntelligenceEntry = {
  id: string;
  type: "Issue Report" | "Opponent Activity" | "Community Feedback" | "Booth Alert";
  title: string;
  detail: string;
  volunteer: string;
  location: string;
  time: string;
  priority: "Critical" | "High" | "Medium" | "Low";
};

export type VolunteerReportEntry = {
  id: string;
  volunteer: string;
  village: string;
  reportType: string;
  date: string;
  status: "Verified" | "Review" | "Escalated";
};

export const volunteerCoverage = {
  coveredBooths: 118,
  weakBooths: 9,
  uncoveredBooths: 3,
  totalBooths: 130
};

export const volunteerActivitySnapshot = {
  whatsappOutreach: 236,
  eventsSupported: 6
};

export const volunteerIntelligenceFeed: VolunteerIntelligenceEntry[] = [
  {
    id: "intel-water-devpur",
    type: "Issue Report",
    title: "Water supply interruption reported",
    detail: "Three households requested follow-up and source verification.",
    volunteer: "Sunita More",
    location: "Devpur / Booth 117",
    time: "18 min ago",
    priority: "High"
  },
  {
    id: "intel-road-musalgaon",
    type: "Community Feedback",
    title: "Road repair complaint repeated",
    detail: "Residents asked for an update on the Musalgaon approach road.",
    volunteer: "Sachin Jadhav",
    location: "Musalgaon / Booth 071",
    time: "34 min ago",
    priority: "Medium"
  },
  {
    id: "intel-meeting-wavi",
    type: "Opponent Activity",
    title: "Local opponent meeting observed",
    detail: "Attendance estimate and organizer details require verification.",
    volunteer: "Rohit Wagh",
    location: "Wavi / Booth 090",
    time: "52 min ago",
    priority: "High"
  },
  {
    id: "intel-feedback-dubere",
    type: "Community Feedback",
    title: "Women group requested healthcare camp",
    detail: "Coordinator follow-up requested before the next village meeting.",
    volunteer: "Meena Pawar",
    location: "Dubere / Booth 084",
    time: "1 hr ago",
    priority: "Medium"
  },
  {
    id: "intel-alert-pimpri",
    type: "Booth Alert",
    title: "Volunteer escalation pending",
    detail: "Booth contact list has not been updated during the current review cycle.",
    volunteer: "Ganesh Borse",
    location: "Baragaon Pimpri / Booth 134",
    time: "2 hrs ago",
    priority: "Critical"
  }
];

export const volunteerRecentReports: VolunteerReportEntry[] = [
  { id: "report-1", volunteer: "Priya Kale", village: "Sinnar Town", reportType: "Ward Sweep", date: "19 Jun, 09:20", status: "Verified" },
  { id: "report-2", volunteer: "Sachin Jadhav", village: "Musalgaon", reportType: "Issue Report", date: "19 Jun, 08:45", status: "Review" },
  { id: "report-3", volunteer: "Rohit Wagh", village: "Wavi", reportType: "Opponent Activity", date: "19 Jun, 08:18", status: "Escalated" },
  { id: "report-4", volunteer: "Meena Pawar", village: "Dubere", reportType: "Community Feedback", date: "18 Jun, 19:40", status: "Verified" },
  { id: "report-5", volunteer: "Aarti Gaikwad", village: "Nandur Shingote", reportType: "Booth Validation", date: "18 Jun, 18:05", status: "Review" }
];

export const uncoveredBoothLabels = [
  "Booth 138 / Devpur Extension",
  "Booth 142 / Industrial Rooms",
  "Booth 151 / Wavi Periphery"
];
