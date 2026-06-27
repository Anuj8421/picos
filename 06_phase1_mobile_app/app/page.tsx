"use client";

import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Eye,
  EyeOff,
  FileSpreadsheet,
  Filter,
  History,
  Home,
  Languages,
  LockKeyhole,
  LogOut,
  Menu,
  MessageSquare,
  Mic,
  Paperclip,
  Plus,
  Route,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Smartphone,
  SortAsc,
  Upload,
  UserPlus,
  UserCog,
  UserRound,
  Users,
  Vote,
  type LucideIcon
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Lang = "en" | "hi" | "mr";
type Copy = Record<Lang, string>;
type FieldType = "text" | "number" | "tel" | "date" | "time" | "textarea" | "password" | "select";
type View = "dashboard" | "list" | "new" | "import" | "detail" | "more";
type ScreenKind = "record" | "profile" | "settings" | "notifications";
type PriorityTone = "high" | "medium" | "low";
type CalendarMode = "day" | "week" | "month";
type CustomFieldType = Exclude<FieldType, "password" | "select">;
type ModuleId =
  | "profile"
  | "settings"
  | "notifications"
  | "tasks"
  | "user-management"
  | "calendar"
  | "voters"
  | "daily-schedule"
  | "meetings"
  | "complaints"
  | "issues"
  | "events"
  | "schemes"
  | "visitors";

type FieldDef = {
  key: string;
  label: Copy;
  type: FieldType;
  required?: boolean;
  category: Copy;
  options?: Copy[];
  custom?: boolean;
};

type ModuleDef = {
  id: ModuleId;
  title: Copy;
  description: Copy;
  icon: LucideIcon;
  fields: FieldDef[];
  importable: boolean;
  screenKind: ScreenKind;
  primary?: boolean;
  source?: Copy;
};

type RecordEntry = {
  id: string;
  values: Record<string, string>;
};

type WorkItem = {
  id: string;
  title: Copy;
  who: Copy;
  when: Copy;
  priority: PriorityTone;
  status: Copy;
  nextAction: Copy;
  relation: Copy;
  ai: Copy;
  sourceRecord?: RecordEntry;
};

type CustomFieldsState = Partial<Record<ModuleId, FieldDef[]>>;
type CustomFieldModuleId = Extract<ModuleId, "voters" | "daily-schedule" | "complaints" | "issues" | "events" | "schemes" | "visitors">;

const LANG_KEY = "phase1-mobile-language";
const AUTH_KEY = "phase1-mobile-authenticated";
const RECORD_KEY_PREFIX = "phase1-mobile-records:";
const CUSTOM_FIELD_KEY = "phase1-mobile-custom-fields";

const L = (en: string, hi: string, mr: string): Copy => ({ en, hi, mr });

const languages: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "हि" },
  { code: "mr", label: "मराठी", short: "म" }
];

const common = {
  appName: L("PICOS", "PICOS", "PICOS"),
  desk: L("Sinnar Campaign Desk", "सिन्नर अभियान डेस्क", "सिन्नर प्रचार डेस्क"),
  phase: L("Phase 1 Field App", "फेज 1 फील्ड ऐप", "फेज 1 फील्ड ऐप"),
  loginTitle: L("Welcome back", "फिर से स्वागत है", "पुन्हा स्वागत आहे"),
  loginSubtitle: L("Sign in to continue to assigned campaign work.", "सौंपे गए अभियान काम के लिए लॉग इन करें.", "दिलेल्या प्रचार कामासाठी लॉग इन करा."),
  mobile: L("Mobile number", "मोबाइल नंबर", "मोबाइल नंबर"),
  password: L("Password", "पासवर्ड", "पासवर्ड"),
  enterPassword: L("Enter password", "पासवर्ड दर्ज करें", "पासवर्ड टाका"),
  remember: L("Remember me", "मुझे याद रखें", "मला लक्षात ठेवा"),
  forgot: L("Forgot password?", "पासवर्ड भूल गए?", "पासवर्ड विसरलात?"),
  logIn: L("Log in", "लॉग इन", "लॉग इन"),
  home: L("Home", "होम", "होम"),
  dashboard: L("Dashboard", "डैशबोर्ड", "डॅशबोर्ड"),
  search: L("Search", "खोजें", "शोधा"),
  addNew: L("Add New", "नया जोड़ें", "नवीन जोडा"),
  manualEntry: L("Manual Entry", "मैनुअल एंट्री", "मॅन्युअल एंट्री"),
  bulkImport: L("Bulk Import", "बल्क इंपोर्ट", "बल्क इंपोर्ट"),
  save: L("Save", "सेव करें", "सेव्ह करा"),
  cancel: L("Cancel", "रद्द करें", "रद्द करा"),
  listView: L("List View", "लिस्ट व्यू", "लिस्ट दृश्य"),
  more: L("More", "अधिक", "अधिक"),
  records: L("Records", "रिकॉर्ड", "नोंदी"),
  select: L("Select", "चुनें", "निवडा"),
  chooseFile: L("Choose Excel or CSV file", "Excel या CSV फाइल चुनें", "Excel किंवा CSV फाइल निवडा"),
  noFileSelected: L("No file selected", "कोई फाइल नहीं चुनी", "फाइल निवडलेली नाही"),
  saveImportDraft: L("Save Import Draft", "इंपोर्ट ड्राफ्ट सेव करें", "इंपोर्ट ड्राफ्ट सेव्ह करा"),
  source: L("Source", "स्रोत", "स्रोत"),
  officeWorkbook: L("Office Election workbook schema", "ऑफिस इलेक्शन वर्कबुक स्कीमा", "ऑफिस इलेक्शन वर्कबुक स्कीमा"),
  visitorsWorkbook: L("Visitors workbook schema", "विजिटर्स वर्कबुक स्कीमा", "व्हिजिटर्स वर्कबुक स्कीमा"),
  manualSchema: L("Manual Phase 1 schema", "मैनुअल फेज 1 स्कीमा", "मॅन्युअल फेज 1 स्कीमा"),
  quickActions: L("Quick Actions", "त्वरित क्रियाएं", "त्वरित कृती"),
  modules: L("Phase 1 Modules", "फेज 1 मॉड्यूल", "फेज 1 मॉड्यूल"),
  open: L("Open", "खोलें", "उघडा"),
  accountProfile: L("Account Profile", "अकाउंट प्रोफाइल", "अकाउंट प्रोफाइल"),
  appPreferences: L("App Preferences", "ऐप पसंद", "अ‍ॅप प्राधान्ये"),
  notificationInbox: L("Notification Inbox", "सूचना इनबॉक्स", "सूचना इनबॉक्स"),
  saveProfile: L("Save Profile", "प्रोफाइल सेव करें", "प्रोफाइल सेव्ह करा"),
  saveSettings: L("Save Settings", "सेटिंग्स सेव करें", "सेटिंग्स सेव्ह करा"),
  assignment: L("Assignment", "असाइनमेंट", "नेमणूक"),
  secureAccount: L("Secure account", "सुरक्षित अकाउंट", "सुरक्षित खाते"),
  appMode: L("App mode", "ऐप मोड", "अ‍ॅप मोड"),
  activeSession: L("Active session", "सक्रिय सेशन", "सक्रिय सेशन"),
  fieldWorker: L("Field worker", "फील्ड वर्कर", "फील्ड कार्यकर्ता"),
  unread: L("Unread", "अपठित", "न वाचलेले"),
  read: L("Read", "पढ़ा गया", "वाचलेले"),
  goodMorning: L("Good Morning, Uday", "सुप्रभात, उदय", "सुप्रभात, उदय"),
  todaySchedule: L("Today's Schedule", "आज का कार्यक्रम", "आजचे वेळापत्रक"),
  todaysPriorities: L("Today's Priorities", "आज की प्राथमिकताएं", "आजचे प्राधान्य"),
  quickStatistics: L("Quick Statistics", "त्वरित आंकड़े", "त्वरित आकडे"),
  recentActivity: L("Recent Activity", "हाल की गतिविधि", "अलीकडील हालचाल"),
  followUps: L("Follow-ups", "फॉलो-अप", "फॉलो-अप"),
  aiRecommendations: L("AI Recommendations", "AI सुझाव", "AI शिफारसी"),
  viewDay: L("View Day", "दिन देखें", "दिवस पाहा"),
  startVisit: L("Start Visit", "भेट शुरू करें", "भेट सुरू करा"),
  nextMeeting: L("Next Meeting", "अगली बैठक", "पुढील बैठक"),
  today: L("Today", "आज", "आज"),
  meetingsToday: L("Meetings", "बैठकें", "बैठका"),
  villageVisitsToday: L("Village Visits", "गांव भेट", "गाव भेटी"),
  eventsToday: L("Events", "कार्यक्रम", "कार्यक्रम"),
  visitorsToday: L("Visitors", "आगंतुक", "भेट देणारे"),
  followUpsToday: L("Follow-ups", "फॉलो-अप", "फॉलो-अप"),
  officeOperations: L("Office Operations", "ऑफिस ऑपरेशन", "ऑफिस ऑपरेशन्स"),
  administration: L("Administration", "प्रशासन", "प्रशासन"),
  account: L("Account", "अकाउंट", "खाते"),
  addVoter: L("Add Voter", "मतदाता जोड़ें", "मतदार जोडा"),
  addComplaint: L("Add Complaint", "शिकायत जोड़ें", "तक्रार जोडा"),
  addMeeting: L("Add Meeting", "बैठक जोड़ें", "बैठक जोडा"),
  addVisitor: L("Add Visitor", "आगंतुक जोड़ें", "भेट नोंदवा"),
  addIssue: L("Add Issue", "मुद्दा जोड़ें", "समस्या जोडा"),
  addEvent: L("Add Event", "कार्यक्रम जोड़ें", "कार्यक्रम जोडा"),
  addSchemeBeneficiary: L("Add Scheme Beneficiary", "योजना लाभार्थी जोड़ें", "योजना लाभार्थी जोडा"),
  createTask: L("Create Task", "कार्य बनाएं", "काम तयार करा"),
  logout: L("Logout", "लॉग आउट", "लॉगआउट"),
  filter: L("Filter", "फिल्टर", "फिल्टर"),
  sort: L("Sort", "सॉर्ट", "क्रम लावा"),
  quickAdd: L("Quick Add", "त्वरित जोड़ें", "त्वरित जोडा"),
  createRecord: L("Create Record", "रिकॉर्ड बनाएं", "नोंद तयार करा"),
  importCsv: L("Import CSV", "CSV इंपोर्ट", "CSV इंपोर्ट"),
  voiceEntry: L("Voice Entry", "वॉयस एंट्री", "व्हॉइस एंट्री"),
  scanDocument: L("Scan Document", "दस्तावेज स्कैन करें", "दस्तऐवज स्कॅन करा"),
  noPendingToday: L("Everything important is handled for now.", "अभी जरूरी काम संभाल लिया गया है.", "आत्तासाठी महत्त्वाचे काम हाताळले आहे."),
  titleAndDescription: L("Title & Description", "शीर्षक और विवरण", "शीर्षक आणि वर्णन"),
  assignmentAndTiming: L("Assignment & Timing", "असाइनमेंट और समय", "नेमणूक आणि वेळ"),
  relatedRecords: L("Related Records", "संबंधित रिकॉर्ड", "संबंधित नोंदी"),
  attachments: L("Attachments", "अटैचमेंट", "जोडपत्रे"),
  saveDraft: L("Save Draft", "ड्राफ्ट सेव करें", "ड्राफ्ट सेव्ह करा"),
  saveAndAssign: L("Save & Assign", "सेव और असाइन", "सेव्ह आणि नेमून द्या"),
  saveAndNotify: L("Save & Notify", "सेव और सूचित करें", "सेव्ह आणि कळवा"),
  reminder: L("Reminder", "रिमाइंडर", "स्मरणपत्र"),
  voter: L("Voter", "मतदाता", "मतदार"),
  issue: L("Issue", "मुद्दा", "समस्या"),
  complaint: L("Complaint", "शिकायत", "तक्रार"),
  meeting: L("Meeting", "बैठक", "बैठक"),
  visitor: L("Visitor", "आगंतुक", "भेट देणारे"),
  event: L("Event", "कार्यक्रम", "कार्यक्रम"),
  photo: L("Photo", "फोटो", "फोटो"),
  document: L("Document", "दस्तावेज", "दस्तऐवज"),
  voiceNote: L("Voice Note", "वॉयस नोट", "व्हॉइस नोट"),
  overview: L("Overview", "ओवरव्यू", "आढावा"),
  timeline: L("Timeline", "टाइमलाइन", "कालरेषा"),
  activity: L("Activity", "गतिविधि", "हालचाल"),
  comments: L("Comments", "कमेंट्स", "टिप्पण्या"),
  history: L("History", "इतिहास", "इतिहास"),
  aiSuggestions: L("AI Suggestions", "AI सुझाव", "AI सूचना"),
  nextAction: L("Next Action", "अगला कदम", "पुढील कृती"),
  who: L("Who", "कौन", "कोण"),
  when: L("When", "कब", "कधी"),
  status: L("Status", "स्थिति", "स्थिती")
};

const category = {
  personal: L("Personal Details", "व्यक्तिगत विवरण", "वैयक्तिक तपशील"),
  voterIdentity: L("Voter Identity", "मतदाता पहचान", "मतदार ओळख"),
  contact: L("Contact Details", "संपर्क विवरण", "संपर्क तपशील"),
  address: L("Address Details", "पता विवरण", "पत्ता तपशील"),
  electionArea: L("Election Area", "चुनाव क्षेत्र", "निवडणूक क्षेत्र"),
  assignment: L("Assignment & Status", "असाइनमेंट और स्थिति", "नेमणूक आणि स्थिती"),
  demographics: L("Demographics", "जनसांख्यिकी", "लोकसंख्या तपशील"),
  schedule: L("Schedule Details", "कार्यक्रम विवरण", "वेळापत्रक तपशील"),
  reference: L("Reference Details", "संदर्भ विवरण", "संदर्भ तपशील"),
  meeting: L("Meeting Details", "बैठक विवरण", "बैठक तपशील"),
  issue: L("Issue Details", "मुद्दा विवरण", "समस्या तपशील"),
  tracking: L("Tracking", "ट्रैकिंग", "ट्रॅकिंग"),
  program: L("Program Details", "कार्यक्रम विवरण", "कार्यक्रम तपशील"),
  scheme: L("Scheme Details", "योजना विवरण", "योजना तपशील"),
  benefit: L("Benefit & Eligibility", "लाभ और पात्रता", "लाभ आणि पात्रता"),
  dates: L("Dates", "तारीखें", "तारखा"),
  visitor: L("Visitor Details", "आगंतुक विवरण", "भेट देणारे तपशील"),
  task: L("Task Details", "कार्य विवरण", "कामाचे तपशील"),
  notification: L("Notification Details", "सूचना विवरण", "सूचना तपशील"),
  access: L("Access Details", "एक्सेस विवरण", "प्रवेश तपशील"),
  preferences: L("Preferences", "पसंद", "प्राधान्ये"),
  custom: L("Custom Fields", "कस्टम फ़ील्ड", "कस्टम फील्ड")
};

const F = {
  srNo: L("Sr. No.", "अनुक्रमांक", "अनुक्रमांक"),
  booth: L("Booth", "बूथ", "बूथ"),
  houseNo: L("House No.", "मकान नंबर", "घर क्रमांक"),
  firstName: L("First Name", "पहला नाम", "नाव"),
  middleName: L("Middle Name", "मध्य नाम", "मधले नाव"),
  surname: L("Surname", "उपनाम", "आडनाव"),
  relativesName: L("Relative Name", "रिश्तेदार का नाम", "नातेवाईकाचे नाव"),
  gender: L("Gender", "लिंग", "लिंग"),
  age: L("Age", "उम्र", "वय"),
  mobileNo: L("Mobile No.", "मोबाइल नंबर", "मोबाइल नंबर"),
  caste: L("Caste", "जाति", "जात"),
  addressLine: L("Address Line", "पता पंक्ति", "पत्ता ओळ"),
  buildingName: L("Building / House Name", "बिल्डिंग / मकान नाम", "इमारत / घराचे नाव"),
  streetName: L("Street / Lane", "सड़क / गली", "रस्ता / गल्ली"),
  areaName: L("Area / Locality", "क्षेत्र / मोहल्ला", "भाग / परिसर"),
  landmark: L("Landmark", "लैंडमार्क", "ओळख ठिकाण"),
  village: L("Village", "गांव", "गाव"),
  taluka: L("Taluka", "तालुका", "तालुका"),
  district: L("District", "जिला", "जिल्हा"),
  pinCode: L("PIN Code", "पिन कोड", "पिन कोड"),
  assignedVolunteer: L("Assigned Volunteer", "नियुक्त स्वयंसेवक", "नियुक्त स्वयंसेवक"),
  deadAlive: L("Dead / Alive", "मृत / जीवित", "मृत / जिवंत"),
  profession: L("Profession", "पेशा", "व्यवसाय"),
  bloodGroup: L("Blood Group", "रक्त समूह", "रक्तगट"),
  birthDate: L("Birth Date", "जन्म तिथि", "जन्मतारीख"),
  colourCode: L("Colour Code", "रंग कोड", "रंग कोड"),
  ward: L("Ward", "वार्ड", "प्रभाग"),
  supportsWho: L("Supports Who", "किसका समर्थन", "कोणाला समर्थन"),
  voterId: L("Voter ID / EPIC No.", "मतदाता ID / EPIC नंबर", "मतदार ID / EPIC क्रमांक"),
  date: L("Date", "तारीख", "तारीख"),
  day: L("Day", "दिन", "वार"),
  time: L("Time", "समय", "वेळ"),
  designation: L("Designation", "पदनाम", "पद"),
  referenceName: L("Reference Name", "संदर्भ नाम", "संदर्भ नाव"),
  referenceNumber: L("Reference Number", "संदर्भ नंबर", "संदर्भ नंबर"),
  program: L("Program", "कार्यक्रम", "कार्यक्रम"),
  programHost: L("Program Host", "कार्यक्रम होस्ट", "कार्यक्रम आयोजक"),
  hostNumber: L("Host Number", "होस्ट नंबर", "आयोजक नंबर"),
  location: L("Location", "स्थान", "ठिकाण"),
  meetingTitle: L("Meeting Title", "बैठक शीर्षक", "बैठकीचे शीर्षक"),
  meetingCategory: L("Meeting Category", "बैठक श्रेणी", "बैठक वर्ग"),
  duration: L("Duration", "अवधि", "कालावधी"),
  participants: L("Participants", "सहभागी", "सहभागी"),
  meetingMode: L("Meeting Mode", "बैठक पद्धति", "बैठक पद्धत"),
  priority: L("Priority", "प्राथमिकता", "प्राधान्य"),
  host: L("Host", "आयोजक", "आयोजक"),
  status: L("Status", "स्थिति", "स्थिती"),
  postponed: L("Postponed", "स्थगित", "पुढे ढकलले"),
  notes: L("Notes", "नोट्स", "नोंदी"),
  actionItems: L("Action Items", "कार्य बिंदु", "कृती मुद्दे"),
  complaintSource: L("Complaint Source", "शिकायत स्रोत", "तक्रार स्रोत"),
  complaintType: L("Complaint Type", "शिकायत प्रकार", "तक्रार प्रकार"),
  issueSource: L("Issue Source", "मुद्दा स्रोत", "समस्या स्रोत"),
  issueType: L("Issue Type", "मुद्दा प्रकार", "समस्या प्रकार"),
  lastName: L("Last Name", "अंतिम नाम", "आडनाव"),
  description: L("Description", "विवरण", "वर्णन"),
  locationOfIssue: L("Location of Issue", "समस्या का स्थान", "समस्येचे ठिकाण"),
  number: L("Number", "नंबर", "नंबर"),
  attendance: L("Attendance", "उपस्थिति", "उपस्थिती"),
  name: L("Name", "नाम", "नाव"),
  type: L("Type", "प्रकार", "प्रकार"),
  schemeName: L("Scheme Name", "योजना नाम", "योजनेचे नाव"),
  schemeCode: L("Scheme Code", "योजना कोड", "योजना कोड"),
  centralState: L("Central/State", "केंद्र/राज्य", "केंद्र/राज्य"),
  department: L("Department", "विभाग", "विभाग"),
  category: L("Category", "श्रेणी", "वर्ग"),
  benefitType: L("Benefit Type", "लाभ प्रकार", "लाभ प्रकार"),
  benefitAmount: L("Benefit Amount", "लाभ राशि", "लाभ रक्कम"),
  eligibilityRules: L("Eligibility Rules", "पात्रता नियम", "पात्रता नियम"),
  requiredDocuments: L("Required Documents", "आवश्यक दस्तावेज", "आवश्यक कागदपत्रे"),
  applicationMode: L("Application Mode", "आवेदन पद्धति", "अर्ज पद्धत"),
  officialDate: L("Official Date", "आधिकारिक तारीख", "अधिकृत तारीख"),
  startDate: L("Start Date", "शुरू तारीख", "सुरू तारीख"),
  endDate: L("End Date", "अंतिम तारीख", "समाप्त तारीख"),
  active: L("Active", "सक्रिय", "सक्रिय"),
  visitorType: L("Visitor Type", "आगंतुक प्रकार", "भेट देणाऱ्याचा प्रकार"),
  visitorName: L("Visitor Name", "आगंतुक नाम", "भेट देणाऱ्याचे नाव"),
  mobileNumber: L("Mobile Number", "मोबाइल नंबर", "मोबाइल नंबर"),
  purpose: L("Purpose", "उद्देश्य", "उद्देश"),
  issue: L("Issue", "मुद्दा", "समस्या"),
  assignedTo: L("Assigned to", "सौंपा गया", "नेमलेले"),
  title: L("Title", "शीर्षक", "शीर्षक"),
  message: L("Message", "संदेश", "संदेश"),
  role: L("Role", "भूमिका", "भूमिका"),
  accessLevel: L("Access Level", "एक्सेस स्तर", "प्रवेश स्तर"),
  language: L("Language", "भाषा", "भाषा"),
  password: L("Password", "पासवर्ड", "पासवर्ड"),
  notifications: L("Notifications", "सूचनाएं", "सूचना"),
  theme: L("Theme", "थीम", "थीम"),
  syncMode: L("Sync Mode", "सिंक मोड", "सिंक मोड"),
  defaultView: L("Default View", "डिफॉल्ट व्यू", "डिफॉल्ट दृश्य"),
  relatedModule: L("Related Module", "संबंधित मॉड्यूल", "संबंधित मॉड्यूल"),
  dueDate: L("Due Date", "नियत तारीख", "नियत तारीख"),
  readStatus: L("Read Status", "रीड स्थिति", "वाचन स्थिती")
};

const optionSets = {
  gender: [L("Male", "पुरुष", "पुरुष"), L("Female", "महिला", "महिला"), L("Other", "अन्य", "इतर")],
  deadAlive: [L("Alive", "जीवित", "जिवंत"), L("Dead", "मृत", "मृत")],
  priority: [L("High", "उच्च", "उच्च"), L("Medium", "मध्यम", "मध्यम"), L("Low", "कम", "कमी")],
  status: [L("Open", "खुला", "उघडे"), L("In Progress", "प्रगति में", "प्रगतीत"), L("Closed", "बंद", "बंद"), L("Completed", "पूर्ण", "पूर्ण")],
  yesNo: [L("Yes", "हां", "होय"), L("No", "नहीं", "नाही")],
  meetingMode: [L("In Person", "प्रत्यक्ष", "प्रत्यक्ष"), L("Phone", "फोन", "फोन"), L("Video", "वीडियो", "व्हिडिओ")],
  centralState: [L("Central", "केंद्र", "केंद्र"), L("State", "राज्य", "राज्य"), L("Local", "स्थानीय", "स्थानिक")],
  active: [L("Active", "सक्रिय", "सक्रिय"), L("Inactive", "निष्क्रिय", "निष्क्रिय")],
  readStatus: [L("Unread", "अपठित", "न वाचलेले"), L("Read", "पढ़ा गया", "वाचलेले")],
  language: [L("Marathi", "मराठी", "मराठी"), L("Hindi", "हिंदी", "हिंदी"), L("English", "English", "English")],
  notifications: [L("On", "चालू", "चालू"), L("Off", "बंद", "बंद")],
  theme: [L("Dark", "डार्क", "डार्क"), L("System", "सिस्टम", "सिस्टम")],
  syncMode: [L("Auto", "ऑटो", "ऑटो"), L("Manual", "मैनुअल", "मॅन्युअल")],
  defaultView: [common.dashboard, common.modules, L("Voters", "मतदाता", "मतदार")]
};

const field = (key: string, label: Copy, type: FieldType = "text", required = false, fieldCategory: Copy = category.personal, options?: Copy[]): FieldDef => ({
  key,
  label,
  type,
  required,
  category: fieldCategory,
  options
});

const voterFields: FieldDef[] = [
  field("firstName", F.firstName, "text", true, category.personal),
  field("middleName", F.middleName, "text", false, category.personal),
  field("surname", F.surname, "text", false, category.personal),
  field("relativesName", F.relativesName, "text", false, category.personal),
  field("voterId", F.voterId, "text", true, category.voterIdentity),
  field("srNo", F.srNo, "text", false, category.voterIdentity),
  field("mobileNo", F.mobileNo, "tel", false, category.contact),
  field("houseNo", F.houseNo, "text", false, category.address),
  field("buildingName", F.buildingName, "text", false, category.address),
  field("streetName", F.streetName, "text", false, category.address),
  field("areaName", F.areaName, "text", false, category.address),
  field("landmark", F.landmark, "text", false, category.address),
  field("village", F.village, "text", false, category.address),
  field("taluka", F.taluka, "text", false, category.address),
  field("district", F.district, "text", false, category.address),
  field("pinCode", F.pinCode, "text", false, category.address),
  field("booth", F.booth, "number", true, category.electionArea),
  field("ward", F.ward, "text", false, category.electionArea),
  field("assignedVolunteer", F.assignedVolunteer, "text", false, category.assignment),
  field("deadAlive", F.deadAlive, "select", false, category.assignment, optionSets.deadAlive),
  field("colourCode", F.colourCode, "text", false, category.assignment),
  field("supportsWho", F.supportsWho, "text", false, category.assignment),
  field("gender", F.gender, "select", false, category.demographics, optionSets.gender),
  field("age", F.age, "number", false, category.demographics),
  field("birthDate", F.birthDate, "date", false, category.demographics),
  field("caste", F.caste, "text", false, category.demographics),
  field("profession", F.profession, "text", false, category.demographics),
  field("bloodGroup", F.bloodGroup, "text", false, category.demographics)
];

const dailyScheduleFields: FieldDef[] = [
  field("date", F.date, "date", true, category.schedule),
  field("day", F.day, "text", false, category.schedule),
  field("time", F.time, "time", true, category.schedule),
  field("designation", F.designation, "text", false, category.schedule),
  field("program", F.program, "textarea", true, category.program),
  field("addressLine", F.addressLine, "textarea", false, category.address),
  field("landmark", F.landmark, "text", false, category.address),
  field("village", F.village, "text", false, category.address),
  field("ward", F.ward, "text", false, category.address),
  field("taluka", F.taluka, "text", false, category.address),
  field("district", F.district, "text", false, category.address),
  field("referenceName", F.referenceName, "text", false, category.reference),
  field("referenceNumber", F.referenceNumber, "tel", false, category.reference),
  field("programHost", F.programHost, "text", false, category.reference),
  field("hostNumber", F.hostNumber, "tel", false, category.reference)
];

const meetingFields: FieldDef[] = [
  field("meetingTitle", F.meetingTitle, "text", true, category.meeting),
  field("meetingCategory", F.meetingCategory, "text", false, category.meeting),
  field("date", F.date, "date", true, category.schedule),
  field("day", F.day, "text", false, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("duration", F.duration, "text", false, category.schedule),
  field("location", F.location, "text", false, category.address),
  field("participants", F.participants, "textarea", false, category.meeting),
  field("meetingMode", F.meetingMode, "select", false, category.meeting, optionSets.meetingMode),
  field("host", F.host, "text", false, category.reference),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status),
  field("postponed", F.postponed, "select", false, category.tracking, optionSets.yesNo),
  field("notes", F.notes, "textarea", false, category.tracking),
  field("actionItems", F.actionItems, "textarea", false, category.tracking)
];

const complaintFields: FieldDef[] = [
  field("date", F.date, "date", true, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("complaintSource", F.complaintSource, "text", false, category.issue),
  field("complaintType", F.complaintType, "text", false, category.issue),
  field("description", F.description, "textarea", true, category.issue),
  field("firstName", F.firstName, "text", false, category.personal),
  field("middleName", F.middleName, "text", false, category.personal),
  field("lastName", F.lastName, "text", false, category.personal),
  field("number", F.number, "tel", false, category.contact),
  field("voterId", F.voterId, "text", false, category.voterIdentity),
  field("locationOfIssue", F.locationOfIssue, "text", false, category.address),
  field("addressLine", F.addressLine, "textarea", false, category.address),
  field("areaName", F.areaName, "text", false, category.address),
  field("landmark", F.landmark, "text", false, category.address),
  field("village", F.village, "text", false, category.address),
  field("ward", F.ward, "text", false, category.electionArea),
  field("boothNumber", F.booth, "text", false, category.electionArea),
  field("taluka", F.taluka, "text", false, category.address),
  field("district", F.district, "text", false, category.address),
  field("pinCode", F.pinCode, "text", false, category.address),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status)
];

const issueFields: FieldDef[] = [
  field("date", F.date, "date", true, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("issueSource", F.issueSource, "text", false, category.issue),
  field("issueType", F.issueType, "text", false, category.issue),
  field("description", F.description, "textarea", true, category.issue),
  field("firstName", F.firstName, "text", false, category.personal),
  field("middleName", F.middleName, "text", false, category.personal),
  field("lastName", F.lastName, "text", false, category.personal),
  field("number", F.number, "tel", false, category.contact),
  field("voterId", F.voterId, "text", false, category.voterIdentity),
  field("locationOfIssue", F.locationOfIssue, "text", false, category.address),
  field("addressLine", F.addressLine, "textarea", false, category.address),
  field("areaName", F.areaName, "text", false, category.address),
  field("landmark", F.landmark, "text", false, category.address),
  field("village", F.village, "text", false, category.address),
  field("ward", F.ward, "text", false, category.electionArea),
  field("boothNumber", F.booth, "text", false, category.electionArea),
  field("taluka", F.taluka, "text", false, category.address),
  field("district", F.district, "text", false, category.address),
  field("pinCode", F.pinCode, "text", false, category.address),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status)
];

const eventFields: FieldDef[] = [
  field("name", F.name, "text", true, category.program),
  field("type", F.type, "text", false, category.program),
  field("program", F.program, "textarea", false, category.program),
  field("date", F.date, "date", true, category.schedule),
  field("day", F.day, "text", false, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("attendance", F.attendance, "number", false, category.program),
  field("addressLine", F.addressLine, "textarea", false, category.address),
  field("landmark", F.landmark, "text", false, category.address),
  field("village", F.village, "text", false, category.address),
  field("ward", F.ward, "text", false, category.electionArea),
  field("booth", F.booth, "text", false, category.electionArea),
  field("taluka", F.taluka, "text", false, category.address),
  field("district", F.district, "text", false, category.address),
  field("designation", F.designation, "text", false, category.reference),
  field("referenceName", F.referenceName, "text", false, category.reference),
  field("referenceNumber", F.referenceNumber, "tel", false, category.reference),
  field("programHost", F.programHost, "text", false, category.reference),
  field("hostNumber", F.hostNumber, "tel", false, category.reference),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority)
];

const schemeFields: FieldDef[] = [
  field("schemeName", F.schemeName, "text", true, category.scheme),
  field("schemeCode", F.schemeCode, "text", false, category.scheme),
  field("centralState", F.centralState, "select", false, category.scheme, optionSets.centralState),
  field("department", F.department, "text", false, category.scheme),
  field("category", F.category, "text", false, category.scheme),
  field("description", F.description, "textarea", false, category.scheme),
  field("benefitType", F.benefitType, "text", false, category.benefit),
  field("benefitAmount", F.benefitAmount, "number", false, category.benefit),
  field("eligibilityRules", F.eligibilityRules, "textarea", false, category.benefit),
  field("requiredDocuments", F.requiredDocuments, "textarea", false, category.benefit),
  field("applicationMode", F.applicationMode, "text", false, category.benefit),
  field("officialDate", F.officialDate, "date", false, category.dates),
  field("startDate", F.startDate, "date", false, category.dates),
  field("endDate", F.endDate, "date", false, category.dates),
  field("active", F.active, "select", false, category.tracking, optionSets.active)
];

const visitorFields: FieldDef[] = [
  field("visitorName", F.visitorName, "text", true, category.visitor),
  field("visitorType", F.visitorType, "text", false, category.visitor),
  field("mobileNumber", F.mobileNumber, "tel", false, category.contact),
  field("voterId", F.voterId, "text", false, category.voterIdentity),
  field("village", F.village, "text", false, category.address),
  field("ward", F.ward, "text", false, category.electionArea),
  field("boothNumber", F.booth, "text", false, category.electionArea),
  field("date", F.date, "date", true, category.schedule),
  field("day", F.day, "text", false, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("purpose", F.purpose, "textarea", false, category.issue),
  field("issue", F.issue, "textarea", false, category.issue),
  field("assignedTo", F.assignedTo, "text", false, category.assignment),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status)
];

const taskFields: FieldDef[] = [
  field("title", L("Task Title", "कार्य शीर्षक", "कामाचे शीर्षक"), "text", true, category.task),
  field("type", F.type, "text", false, category.task),
  field("assignedTo", F.assignedTo, "text", false, category.assignment),
  field("dueDate", F.dueDate, "date", false, category.schedule),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status),
  field("relatedModule", F.relatedModule, "text", false, category.task),
  field("notes", F.notes, "textarea", false, category.task)
];

const notificationFields: FieldDef[] = [
  field("title", F.title, "text", true, category.notification),
  field("message", F.message, "textarea", true, category.notification),
  field("category", F.category, "text", false, category.notification),
  field("date", F.date, "date", false, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("readStatus", F.readStatus, "select", false, category.tracking, optionSets.readStatus)
];

const userFields: FieldDef[] = [
  field("name", L("Full Name", "पूरा नाम", "पूर्ण नाव"), "text", true, category.personal),
  field("mobileNumber", F.mobileNumber, "tel", false, category.contact),
  field("role", F.role, "text", false, category.access),
  field("accessLevel", F.accessLevel, "text", false, category.access),
  field("village", F.village, "text", false, category.address),
  field("booth", F.booth, "text", false, category.electionArea),
  field("status", F.status, "select", false, category.tracking, optionSets.status)
];

const profileFields: FieldDef[] = [
  field("name", L("Full Name", "पूरा नाम", "पूर्ण नाव"), "text", true, category.personal),
  field("mobileNumber", F.mobileNumber, "tel", false, category.contact),
  field("role", F.role, "text", false, category.access),
  field("village", F.village, "text", false, category.address),
  field("booth", F.booth, "text", false, category.electionArea),
  field("language", F.language, "select", false, category.preferences, optionSets.language),
  field("password", F.password, "password", false, category.access)
];

const settingsFields: FieldDef[] = [
  field("language", F.language, "select", false, category.preferences, optionSets.language),
  field("notifications", F.notifications, "select", false, category.preferences, optionSets.notifications),
  field("theme", F.theme, "select", false, category.preferences, optionSets.theme),
  field("syncMode", F.syncMode, "select", false, category.preferences, optionSets.syncMode),
  field("defaultView", F.defaultView, "select", false, category.preferences, optionSets.defaultView)
];

const calendarFields: FieldDef[] = [
  field("title", F.title, "text", true, category.schedule),
  field("category", F.category, "text", false, category.schedule),
  field("date", F.date, "date", true, category.schedule),
  field("day", F.day, "text", false, category.schedule),
  field("time", F.time, "time", false, category.schedule),
  field("location", F.location, "text", false, category.address),
  field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
  field("status", F.status, "select", false, category.tracking, optionSets.status)
];

const modules: ModuleDef[] = [
  { id: "profile", title: L("Profile", "प्रोफाइल", "प्रोफाइल"), description: L("User profile and assignment", "यूजर प्रोफाइल और असाइनमेंट", "यूजर प्रोफाइल आणि नेमणूक"), icon: UserRound, fields: profileFields, importable: false, screenKind: "profile" },
  { id: "settings", title: L("Settings", "सेटिंग्स", "सेटिंग्स"), description: L("App preferences", "ऐप सेटिंग्स", "ऐप सेटिंग्स"), icon: Settings, fields: settingsFields, importable: false, screenKind: "settings" },
  { id: "notifications", title: L("Notifications", "सूचनाएं", "सूचना"), description: L("Alerts and updates", "अलर्ट और अपडेट", "अलर्ट आणि अपडेट"), icon: Bell, fields: [], importable: false, screenKind: "notifications" },
  { id: "tasks", title: L("Tasks", "कार्य", "कामे"), description: L("Assignments and follow-ups", "असाइनमेंट और फॉलो-अप", "नेमणुका आणि फॉलो-अप"), icon: ClipboardList, fields: taskFields, importable: false, screenKind: "record", primary: true },
  { id: "user-management", title: L("User Management", "यूजर मैनेजमेंट", "यूजर मॅनेजमेंट"), description: L("Roles and access", "भूमिका और एक्सेस", "भूमिका आणि प्रवेश"), icon: UserCog, fields: userFields, importable: true, screenKind: "record" },
  { id: "calendar", title: L("Calendar", "कैलेंडर", "कॅलेंडर"), description: L("Dates and reminders", "तारीखें और रिमाइंडर", "तारखा आणि स्मरणपत्रे"), icon: CalendarDays, fields: calendarFields, importable: false, screenKind: "record", primary: true },
  { id: "voters", title: L("Voters", "मतदाता", "मतदार"), description: L("Voter records", "मतदाता रिकॉर्ड", "मतदार नोंदी"), icon: Vote, fields: voterFields, importable: true, screenKind: "record", source: common.officeWorkbook, primary: true },
  { id: "daily-schedule", title: L("Daily Schedule", "दैनिक कार्यक्रम", "दैनंदिन कार्यक्रम"), description: L("Daily route and program plan", "दैनिक रूट और कार्यक्रम", "दैनंदिन मार्ग आणि कार्यक्रम"), icon: CalendarDays, fields: dailyScheduleFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "meetings", title: L("Meetings", "बैठकें", "बैठका"), description: L("Meeting planning", "बैठक योजना", "बैठक नियोजन"), icon: Users, fields: meetingFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "complaints", title: L("Complaints", "शिकायतें", "तक्रारी"), description: L("Complaint tracking", "शिकायत ट्रैकिंग", "तक्रार ट्रॅकिंग"), icon: ShieldCheck, fields: complaintFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "issues", title: L("Issues", "मुद्दे", "मुद्दे"), description: L("Local issue tracking", "स्थानीय मुद्दे ट्रैकिंग", "स्थानिक मुद्दे ट्रॅकिंग"), icon: ShieldCheck, fields: issueFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "events", title: L("Events", "कार्यक्रम", "कार्यक्रम"), description: L("Program and event records", "कार्यक्रम रिकॉर्ड", "कार्यक्रम नोंदी"), icon: CalendarDays, fields: eventFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "schemes", title: L("Schemes", "योजनाएं", "योजना"), description: L("Government scheme library", "सरकारी योजना लाइब्रेरी", "शासकीय योजना लायब्ररी"), icon: FileSpreadsheet, fields: schemeFields, importable: true, screenKind: "record", source: common.officeWorkbook },
  { id: "visitors", title: L("Visitors", "आगंतुक", "भेट देणारे"), description: L("Office visitor tracking", "ऑफिस विजिटर ट्रैकिंग", "ऑफिस भेट नोंदी"), icon: Users, fields: visitorFields, importable: true, screenKind: "record", source: common.visitorsWorkbook, primary: true }
];

const moduleMap = new Map(modules.map((module) => [module.id, module]));

const customFieldModuleIds: CustomFieldModuleId[] = ["voters", "daily-schedule", "complaints", "issues", "events", "schemes", "visitors"];

const customFieldTypeOptions: { value: CustomFieldType; label: Copy }[] = [
  { value: "text", label: L("Text", "टेक्स्ट", "टेक्स्ट") },
  { value: "number", label: L("Number", "नंबर", "नंबर") },
  { value: "tel", label: L("Phone", "फोन", "फोन") },
  { value: "date", label: L("Date", "तारीख", "तारीख") },
  { value: "time", label: L("Time", "समय", "वेळ") },
  { value: "textarea", label: L("Long Text", "लंबा टेक्स्ट", "लांब टेक्स्ट") }
];

function getModuleWithCustomFields(module: ModuleDef, customFields: CustomFieldsState): ModuleDef {
  const additions = customFields[module.id] ?? [];
  return additions.length ? { ...module, fields: [...module.fields, ...additions] } : module;
}

export default function PhaseOneMobileApp() {
  const [language, setLanguageState] = useState<Lang>("mr");
  const [todayLabel, setTodayLabel] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>("voters");
  const [view, setView] = useState<View>("dashboard");
  const [records, setRecords] = useState<Partial<Record<ModuleId, RecordEntry[]>>>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(null);
  const [actionSheetModule, setActionSheetModule] = useState<ModuleId | null>(null);
  const [calendarMode, setCalendarMode] = useState<CalendarMode>("day");
  const [customFields, setCustomFields] = useState<CustomFieldsState>({});
  const baseActiveModule = moduleMap.get(activeModuleId) ?? modules[0];
  const activeModule = getModuleWithCustomFields(baseActiveModule, customFields);
  const t = (value: Copy) => value[language] || value.en;

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem(LANG_KEY);
    if (savedLanguage === "en" || savedLanguage === "hi" || savedLanguage === "mr") setLanguageState(savedLanguage);
    setAuthenticated(window.localStorage.getItem(AUTH_KEY) === "true");
    const loaded: Partial<Record<ModuleId, RecordEntry[]>> = {};
    modules.forEach((module) => {
      const raw = window.localStorage.getItem(RECORD_KEY_PREFIX + module.id);
      if (!raw) return;
      try {
        loaded[module.id] = JSON.parse(raw) as RecordEntry[];
      } catch {
        loaded[module.id] = [];
      }
    });
    setRecords(loaded);
    const rawCustomFields = window.localStorage.getItem(CUSTOM_FIELD_KEY);
    if (rawCustomFields) {
      try {
        setCustomFields(JSON.parse(rawCustomFields) as CustomFieldsState);
      } catch {
        setCustomFields({});
      }
    }
  }, []);

  useEffect(() => {
    setTodayLabel(formatToday(language));
  }, [language]);

  const setLanguage = (nextLanguage: Lang) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(LANG_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const openModule = (moduleId: ModuleId, nextView: View = "list") => {
    const targetModule = moduleMap.get(moduleId);
    setActiveModuleId(moduleId);
    setView(targetModule?.screenKind === "record" ? nextView : "list");
    setSelectedWorkItem(null);
    setActionSheetModule(null);
    setSelectedFileName("");
  };

  const openDetail = (moduleId: ModuleId, item: WorkItem) => {
    setActiveModuleId(moduleId);
    setSelectedWorkItem(item);
    setView("detail");
    setActionSheetModule(null);
  };

  const saveRecord = (moduleId: ModuleId, values: Record<string, string>) => {
    const nextRecord = { id: `${moduleId}-${Date.now()}`, values };
    setRecords((current) => {
      const next = { ...current, [moduleId]: [nextRecord, ...(current[moduleId] ?? [])] };
      window.localStorage.setItem(RECORD_KEY_PREFIX + moduleId, JSON.stringify(next[moduleId]));
      return next;
    });
    openModule(moduleId, "list");
  };

  const addCustomField = (moduleId: CustomFieldModuleId, label: string, type: CustomFieldType) => {
    const fieldLabel = label.trim();
    if (!fieldLabel) return;
    const nextField: FieldDef = {
      key: `custom_${moduleId}_${Date.now()}`,
      label: L(fieldLabel, fieldLabel, fieldLabel),
      type,
      required: false,
      category: category.custom,
      custom: true
    };
    setCustomFields((current) => {
      const next = {
        ...current,
        [moduleId]: [...(current[moduleId] ?? []), nextField]
      };
      window.localStorage.setItem(CUSTOM_FIELD_KEY, JSON.stringify(next));
      return next;
    });
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setView("dashboard");
  };

  if (!authenticated) {
    return (
      <main className="mobile-stage">
        <PhoneFrame>
          <LoginScreen
            language={language}
            t={t}
            onLanguageChange={setLanguage}
            passwordVisible={passwordVisible}
            onTogglePassword={() => setPasswordVisible((current) => !current)}
            onLogin={() => {
              window.localStorage.setItem(AUTH_KEY, "true");
              setAuthenticated(true);
              setView("dashboard");
            }}
          />
        </PhoneFrame>
      </main>
    );
  }

  return (
    <main className="mobile-stage">
      <PhoneFrame>
        <AppHeader
          title={view === "dashboard" ? t(common.dashboard) : view === "more" ? t(common.more) : t(activeModule.title)}
          subtitle={getHeaderSubtitle(view, activeModule, t)}
          language={language}
          onLanguageChange={setLanguage}
          t={t}
          onProfile={() => openModule("profile")}
        />
        <section className="app-content">
          {view === "dashboard" ? (
            <Dashboard t={t} todayLabel={todayLabel} records={records} openModule={openModule} />
          ) : view === "more" ? (
            <MoreView t={t} openModule={openModule} onLogout={logout} />
          ) : activeModule.screenKind === "profile" ? (
            <ProfileScreen module={activeModule} t={t} />
          ) : activeModule.screenKind === "settings" ? (
            <SettingsScreen t={t} language={language} onLanguageChange={setLanguage} customFields={customFields} onAddCustomField={addCustomField} />
          ) : activeModule.screenKind === "notifications" ? (
            <NotificationsScreen t={t} />
          ) : view === "new" ? (
            <RecordForm key={`${activeModule.id}-form-${selectedWorkItem?.id ?? "new"}`} module={activeModule} initialItem={selectedWorkItem} t={t} onCancel={() => openModule(activeModule.id)} onSave={(values) => saveRecord(activeModule.id, values)} />
          ) : view === "import" && activeModule.importable ? (
            <ImportView
              module={activeModule}
              t={t}
              selectedFileName={selectedFileName}
              onSelectFile={setSelectedFileName}
              onCancel={() => openModule(activeModule.id)}
            />
          ) : view === "detail" && selectedWorkItem ? (
            <RecordDetail module={activeModule} item={selectedWorkItem} t={t} onEdit={() => setView("new")} onBack={() => openModule(activeModule.id)} />
          ) : activeModule.id === "calendar" ? (
            <CalendarScreen t={t} records={records.calendar ?? []} mode={calendarMode} onModeChange={setCalendarMode} onOpenDetail={openDetail} />
          ) : (
            <ModuleList module={activeModule} t={t} records={records[activeModule.id] ?? []} openModule={openModule} onOpenDetail={openDetail} onOpenActions={() => setActionSheetModule(activeModule.id)} />
          )}
        </section>
        {activeModule.screenKind === "record" && view === "list" ? (
          <button className="floating-action-button" type="button" aria-label={t(common.quickAdd)} onClick={() => setActionSheetModule(activeModule.id)}>
            <Plus size={22} aria-hidden="true" />
          </button>
        ) : null}
        {actionSheetModule ? (
          <ActionSheet
            module={getModuleWithCustomFields(moduleMap.get(actionSheetModule) ?? activeModule, customFields)}
            t={t}
            onClose={() => setActionSheetModule(null)}
            onCreate={() => openModule(actionSheetModule, "new")}
            onImport={() => openModule(actionSheetModule, "import")}
          />
        ) : null}
        <BottomNav t={t} active={getBottomNavActive(view, activeModuleId)} onDashboard={() => setView("dashboard")} openModule={openModule} onMore={() => setView("more")} />
      </PhoneFrame>
    </main>
  );
}

function formatToday(language: Lang) {
  const locale = language === "mr" ? "mr-IN" : language === "hi" ? "hi-IN" : "en-IN";
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}

function getHeaderSubtitle(view: View, module: ModuleDef, t: (value: Copy) => string) {
  if (view === "dashboard" || view === "more") return t(common.desk);
  if (module.screenKind === "profile") return t(common.accountProfile);
  if (module.screenKind === "settings") return t(common.appPreferences);
  if (module.screenKind === "notifications") return t(common.notificationInbox);
  if (view === "new") return t(common.manualEntry);
  if (view === "import") return t(common.bulkImport);
  return t(common.listView);
}

function getBottomNavActive(view: View, activeModuleId: ModuleId): ModuleId | "dashboard" | "more" {
  if (view === "dashboard") return "dashboard";
  if (view === "more") return "more";
  if (activeModuleId === "tasks" || activeModuleId === "voters" || activeModuleId === "calendar") return activeModuleId;
  return "more";
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame">
      <div className="status-bar">
        <strong>9:41</strong>
        <span>
          <i />
          <i />
          <i />
        </span>
      </div>
      {children}
    </div>
  );
}

function LanguageToggle({ language, onLanguageChange, t }: { language: Lang; onLanguageChange: (language: Lang) => void; t: (value: Copy) => string }) {
  return (
    <div className="language-toggle" aria-label={t(F.language)}>
      <Languages size={15} aria-hidden="true" />
      {languages.map((item) => (
        <button className={language === item.code ? "is-active" : ""} type="button" onClick={() => onLanguageChange(item.code)} key={item.code}>
          {item.short}
        </button>
      ))}
    </div>
  );
}

function LoginScreen({
  language,
  t,
  onLanguageChange,
  passwordVisible,
  onTogglePassword,
  onLogin
}: {
  language: Lang;
  t: (value: Copy) => string;
  onLanguageChange: (language: Lang) => void;
  passwordVisible: boolean;
  onTogglePassword: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="login-screen">
      <div className="brand-row">
        <div className="brand-mark">PI</div>
        <div>
          <strong>{t(common.appName)}</strong>
          <span>{t(common.phase)}</span>
        </div>
      </div>
      <LanguageToggle language={language} onLanguageChange={onLanguageChange} t={t} />
      <div className="login-title">
        <h1>{t(common.loginTitle)}</h1>
        <p>{t(common.loginSubtitle)}</p>
      </div>
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          onLogin();
        }}
      >
        <label className="field-shell">
          <span>
            <Smartphone size={15} aria-hidden="true" />
            {t(common.mobile)}
          </span>
          <input inputMode="tel" placeholder="+91 98765 43210" required type="tel" />
        </label>
        <label className="field-shell">
          <span>
            <LockKeyhole size={15} aria-hidden="true" />
            {t(common.password)}
          </span>
          <div className="password-field">
            <input placeholder={t(common.enterPassword)} required type={passwordVisible ? "text" : "password"} />
            <button aria-label={passwordVisible ? "Hide password" : "Show password"} type="button" onClick={onTogglePassword}>
              {passwordVisible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
            </button>
          </div>
        </label>
        <div className="login-meta">
          <label>
            <input type="checkbox" />
            <span>{t(common.remember)}</span>
          </label>
          <button type="button">{t(common.forgot)}</button>
        </div>
        <button className="primary-button" type="submit">
          <ShieldCheck size={18} aria-hidden="true" />
          {t(common.logIn)}
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}

function AppHeader({
  title,
  subtitle,
  language,
  onLanguageChange,
  t,
  onProfile
}: {
  title: string;
  subtitle: string;
  language: Lang;
  onLanguageChange: (language: Lang) => void;
  t: (value: Copy) => string;
  onProfile: () => void;
}) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-title">
          <span>{subtitle}</span>
          <h1>{title}</h1>
        </div>
        <button className="avatar-button" type="button" onClick={onProfile} aria-label={t(L("Profile", "प्रोफाइल", "प्रोफाइल"))}>
          AA
        </button>
      </div>
      <LanguageToggle language={language} onLanguageChange={onLanguageChange} t={t} />
    </header>
  );
}

function Dashboard({
  t,
  todayLabel,
  records,
  openModule
}: {
  t: (value: Copy) => string;
  todayLabel: string;
  records: Partial<Record<ModuleId, RecordEntry[]>>;
  openModule: (moduleId: ModuleId, view?: View) => void;
}) {
  const todayStats = [
    { label: modules.find((module) => module.id === "tasks")?.title ?? common.records, value: Math.max(records.tasks?.length ?? 0, 5) },
    { label: modules.find((module) => module.id === "meetings")?.title ?? common.records, value: Math.max(records.meetings?.length ?? 0, 3) },
    { label: modules.find((module) => module.id === "complaints")?.title ?? common.records, value: Math.max(records.complaints?.length ?? 0, 2) },
    { label: modules.find((module) => module.id === "visitors")?.title ?? common.records, value: Math.max(records.visitors?.length ?? 0, 4) },
    { label: modules.find((module) => module.id === "events")?.title ?? common.records, value: Math.max(records.events?.length ?? 0, 1) }
  ];

  const scheduleItems = [
    { label: common.meetingsToday, value: "3", detail: L("Next at 11:30 AM", "अगली 11:30 AM", "पुढील 11:30 AM") },
    { label: common.villageVisitsToday, value: "2", detail: L("Pangri, Musalgaon", "पांगरी, मुसलगांव", "पांगरी, मुसळगाव") },
    { label: common.eventsToday, value: "1", detail: L("Evening youth event", "शाम युवा कार्यक्रम", "सायंकाळी युवा कार्यक्रम") },
    { label: common.visitorsToday, value: "4", detail: L("Office desk pending", "ऑफिस डेस्क लंबित", "ऑफिस डेस्क प्रलंबित") },
    { label: common.followUpsToday, value: "5", detail: L("Calls and evidence", "कॉल और प्रमाण", "कॉल आणि पुरावे") }
  ];

  const priorities = [
    { tone: "high", text: L("Meet Pangri farmer group", "पांगरी किसान समूह से मिलें", "पांगरी शेतकरी गटाला भेटा") },
    { tone: "high", text: L("Resolve water complaint", "पानी शिकायत हल करें", "पाणी तक्रार सोडवा") },
    { tone: "medium", text: L("Review scheme applications", "योजना आवेदन देखें", "योजना अर्ज तपासा") },
    { tone: "low", text: L("Call Village Coordinator", "गांव समन्वयक को कॉल करें", "गाव समन्वयकाला कॉल करा") },
    { tone: "low", text: L("Approve meeting notes", "बैठक नोट्स मंजूर करें", "बैठक नोंदी मंजूर करा") }
  ];

  const recentActivity = [
    { time: "09:10", text: L("Complaint resolved", "शिकायत हल हुई", "तक्रार सोडवली") },
    { time: "09:35", text: L("New voter added", "नया मतदाता जोड़ा", "नवीन मतदार जोडला") },
    { time: "10:05", text: L("Meeting completed", "बैठक पूर्ण हुई", "बैठक पूर्ण झाली") },
    { time: "10:40", text: L("Visitor recorded", "आगंतुक दर्ज हुआ", "भेट नोंदली") }
  ];

  const followUps = [
    L("Call Village Head", "गांव प्रमुख को कॉल करें", "गाव प्रमुखांना कॉल करा"),
    L("Visit Musalgaon", "मुसलगांव भेट करें", "मुसळगावला भेट द्या"),
    L("Submit complaint evidence", "शिकायत प्रमाण जमा करें", "तक्रार पुरावे जमा करा")
  ];

  const quickActions = [
    { label: common.addVoter, moduleId: "voters" as ModuleId, icon: UserPlus },
    { label: common.addComplaint, moduleId: "complaints" as ModuleId, icon: ShieldCheck },
    { label: common.addMeeting, moduleId: "meetings" as ModuleId, icon: Users },
    { label: common.addVisitor, moduleId: "visitors" as ModuleId, icon: UserRound },
    { label: common.addIssue, moduleId: "issues" as ModuleId, icon: ShieldCheck },
    { label: common.addEvent, moduleId: "events" as ModuleId, icon: CalendarDays },
    { label: common.addSchemeBeneficiary, moduleId: "schemes" as ModuleId, icon: FileSpreadsheet },
    { label: common.createTask, moduleId: "tasks" as ModuleId, icon: ClipboardList }
  ];

  const moduleGroups = [
    { title: common.officeOperations, ids: ["voters", "daily-schedule", "meetings", "complaints", "issues", "events", "schemes", "visitors"] as ModuleId[] },
    { title: common.administration, ids: ["tasks", "calendar", "notifications", "user-management"] as ModuleId[] },
    { title: common.account, ids: ["profile", "settings"] as ModuleId[] }
  ];

  return (
    <>
      <section className="dashboard-greeting">
        <span>{t(common.goodMorning)}</span>
        <strong>{todayLabel || t(common.today)}</strong>
      </section>

      <section className="today-schedule-card">
        <div className="section-head">
          <h2>{t(common.todaySchedule)}</h2>
          <span>{scheduleItems.length}</span>
        </div>
        <div className="schedule-summary-grid">
          {scheduleItems.map((item) => (
            <article key={t(item.label)}>
              <strong>{item.value}</strong>
              <span>{t(item.label)}</span>
              <small>{t(item.detail)}</small>
            </article>
          ))}
        </div>
        <div className="schedule-action-row">
          <button className="secondary-button" type="button" onClick={() => openModule("daily-schedule")}>
            <CalendarDays size={17} aria-hidden="true" />
            {t(common.viewDay)}
          </button>
          <button className="primary-button" type="button" onClick={() => openModule("daily-schedule", "new")}>
            <Route size={17} aria-hidden="true" />
            {t(common.startVisit)}
          </button>
          <button className="ghost-button" type="button" onClick={() => openModule("meetings")}>
            <Clock size={17} aria-hidden="true" />
            {t(common.nextMeeting)}
          </button>
        </div>
      </section>

      <section className="section-block action-section">
        <div className="section-head">
          <h2>{t(common.todaysPriorities)}</h2>
          <span>5</span>
        </div>
        <div className="priority-list">
          {priorities.map((priority) => (
            <button className={`priority-item tone-${priority.tone}`} type="button" key={t(priority.text)}>
              <i aria-hidden="true" />
              <span>{t(priority.text)}</span>
              <ChevronRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="section-block compact-section">
        <div className="section-head">
          <h2>{t(common.quickStatistics)}</h2>
        </div>
        <div className="kpi-chip-row">
          {todayStats.map((stat) => (
            <article className="kpi-chip" key={t(stat.label)}>
              <strong>{stat.value}</strong>
              <span>{t(stat.label)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block action-section">
        <div className="section-head">
          <h2>{t(common.quickActions)}</h2>
        </div>
        <div className="dashboard-action-grid">
          {quickActions.map((action) => (
            <button className="dashboard-action" type="button" onClick={() => openModule(action.moduleId, "new")} key={t(action.label)}>
              <action.icon size={18} aria-hidden="true" />
              <span>{t(action.label)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section-block timeline-section">
        <div className="section-head">
          <h2>{t(common.recentActivity)}</h2>
        </div>
        <div className="activity-timeline">
          {recentActivity.map((item) => (
            <article key={`${item.time}-${t(item.text)}`}>
              <time>{item.time}</time>
              <span>{t(item.text)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block action-section">
        <div className="section-head">
          <h2>{t(common.followUps)}</h2>
          <span>{followUps.length}</span>
        </div>
        <div className="followup-list">
          {followUps.map((item) => (
            <button className="followup-item" type="button" key={t(item)}>
              <Check size={15} aria-hidden="true" />
              <span>{t(item)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ai-recommendation-card">
        <Sparkles size={18} aria-hidden="true" />
        <div>
          <span>{t(common.aiRecommendations)}</span>
          <p>{t(L("Visit Pangri today. Meet the farmer leader first, then prioritize the water complaint before the evening program.", "आज पांगरी जाएं. पहले किसान नेता से मिलें, फिर शाम के कार्यक्रम से पहले पानी शिकायत को प्राथमिकता दें.", "आज पांगरीला जा. आधी शेतकरी नेत्याला भेटा, मग सायंकाळच्या कार्यक्रमापूर्वी पाणी तक्रारीला प्राधान्य द्या."))}</p>
        </div>
      </section>

      <section className="section-block module-groups-section">
        <div className="section-head">
          <h2>{t(common.modules)}</h2>
        </div>
        <div className="module-group-stack">
          {moduleGroups.map((group) => (
            <ModuleGroup key={t(group.title)} title={group.title} modulesToShow={group.ids.map((id) => moduleMap.get(id)).filter(Boolean) as ModuleDef[]} t={t} openModule={openModule} />
          ))}
        </div>
      </section>
    </>
  );
}

function MoreView({ t, openModule, onLogout }: { t: (value: Copy) => string; openModule: (moduleId: ModuleId, view?: View) => void; onLogout: () => void }) {
  const moreModules = ["profile", "settings", "notifications", "visitors", "meetings", "complaints", "issues", "events", "schemes", "user-management"] as ModuleId[];
  return (
    <section className="section-block more-menu-section">
      <div className="more-menu-list">
        {moreModules.map((id) => {
          const module = moduleMap.get(id);
          if (!module) return null;
          return (
            <button className="more-menu-item" type="button" onClick={() => openModule(id)} key={id}>
              <span className="module-icon">
                <module.icon size={17} aria-hidden="true" />
              </span>
              <span>
                <strong>{t(module.title)}</strong>
                <small>{t(module.description)}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          );
        })}
        <button className="more-menu-item danger" type="button" onClick={onLogout}>
          <span className="module-icon">
            <LogOut size={17} aria-hidden="true" />
          </span>
          <span>
            <strong>{t(common.logout)}</strong>
            <small>{t(L("End this app session", "यह ऐप सेशन समाप्त करें", "हे अ‍ॅप सेशन समाप्त करा"))}</small>
          </span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function ModuleGroup({ title, modulesToShow, t, openModule }: { title: Copy; modulesToShow: ModuleDef[]; t: (value: Copy) => string; openModule: (moduleId: ModuleId, view?: View) => void }) {
  return (
    <details className="module-group">
      <summary>
        <span>{t(title)}</span>
        <small>{modulesToShow.length}</small>
        <ChevronDown size={16} aria-hidden="true" />
      </summary>
      <ModuleGrid t={t} modulesToShow={modulesToShow} openModule={openModule} />
    </details>
  );
}

function ProfileScreen({ module, t }: { module: ModuleDef; t: (value: Copy) => string }) {
  const groups = groupFields(module.fields);
  const getProfileValue = (fieldItem: FieldDef) => {
    if (fieldItem.key === "password") return "********";
    return getUtilityDefaultValue(fieldItem, t) || t(L("Not set", "सेट नहीं", "सेट नाही"));
  };

  return (
    <>
      <section className="profile-identity-card">
        <div className="large-avatar">AA</div>
        <div>
          <span>{t(common.activeSession)}</span>
          <h2>Anuj Avhad</h2>
          <p>{t(common.desk)}</p>
        </div>
      </section>
      <section className="utility-grid">
        <article>
          <span>{t(F.role)}</span>
          <strong>{t(common.fieldWorker)}</strong>
        </article>
        <article>
          <span>{t(F.village)}</span>
          <strong>Sinnar</strong>
        </article>
        <article>
          <span>{t(F.booth)}</span>
          <strong>{t(common.assignment)}</strong>
        </article>
      </section>
      {groups.map((groupItem) => (
        <section className="profile-attribute-section" key={t(groupItem.category)}>
          <div className="section-head">
            <h2>{t(groupItem.category)}</h2>
            <span>{groupItem.fields.length}</span>
          </div>
          <div className="profile-attribute-list">
            {groupItem.fields.map((fieldItem) => (
              <article className="profile-attribute-row" key={fieldItem.key}>
                <span>{t(fieldItem.label)}</span>
                <strong>{getProfileValue(fieldItem)}</strong>
              </article>
            ))}
          </div>
        </section>
      ))}
      <section className="ai-inline-card">
        <ShieldCheck size={17} aria-hidden="true" />
        <p>{t(L("Profile access is tied to the Sinnar campaign desk and should be updated by authorized admins only.", "प्रोफ़ाइल एक्सेस सिन्नर अभियान डेस्क से जुड़ा है और केवल अधिकृत एडमिन द्वारा अपडेट होना चाहिए.", "प्रोफाइल प्रवेश सिन्नर प्रचार डेस्कशी जोडलेला आहे आणि फक्त अधिकृत अॅडमिनने अपडेट करावा."))}</p>
      </section>
    </>
  );
}

function SettingsScreen({
  t,
  language,
  onLanguageChange,
  customFields,
  onAddCustomField
}: {
  t: (value: Copy) => string;
  language: Lang;
  onLanguageChange: (language: Lang) => void;
  customFields: CustomFieldsState;
  onAddCustomField: (moduleId: CustomFieldModuleId, label: string, type: CustomFieldType) => void;
}) {
  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];
  const officeModules = ["voters", "meetings", "complaints", "issues", "events", "schemes", "visitors"].map((moduleId) => moduleMap.get(moduleId as ModuleId)).filter(Boolean) as ModuleDef[];
  const customFieldModules = customFieldModuleIds.map((moduleId) => moduleMap.get(moduleId)).filter(Boolean) as ModuleDef[];
  const [customModuleId, setCustomModuleId] = useState<CustomFieldModuleId>("voters");
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldType, setCustomFieldType] = useState<CustomFieldType>("text");
  const selectedCustomModule = moduleMap.get(customModuleId);
  const selectedCustomFields = customFields[customModuleId] ?? [];
  const totalCustomFields = customFieldModuleIds.reduce((total, moduleId) => total + (customFields[moduleId]?.length ?? 0), 0);
  const navModules = [
    common.home,
    modules.find((entry) => entry.id === "tasks")?.title ?? common.createTask,
    modules.find((entry) => entry.id === "voters")?.title ?? common.voter,
    modules.find((entry) => entry.id === "calendar")?.title ?? L("Calendar", "कैलेंडर", "कॅलेंडर"),
    common.more
  ];
  const submitCustomField = () => {
    onAddCustomField(customModuleId, customFieldLabel, customFieldType);
    setCustomFieldLabel("");
  };

  return (
    <>
      <section className="settings-hero">
        <div className="module-icon">
          <Settings size={18} aria-hidden="true" />
        </div>
        <div>
          <span>{t(common.phase)}</span>
          <h2>{t(L("App Settings", "ऐप सेटिंग्स", "अ‍ॅप सेटिंग्स"))}</h2>
          <p>{t(L("Controls for language, alerts, modules, sync, and secure field use.", "भाषा, अलर्ट, मॉड्यूल, सिंक और सुरक्षित फील्ड उपयोग के नियंत्रण.", "भाषा, अलर्ट, मॉड्यूल, सिंक आणि सुरक्षित फील्ड वापरासाठी नियंत्रण."))}</p>
        </div>
      </section>

      <section className="settings-section">
        <div className="section-head">
          <h2>{t(L("App Controls", "ऐप नियंत्रण", "अ‍ॅप नियंत्रण"))}</h2>
        </div>
        <div className="settings-list">
          <article className="settings-row">
            <Languages size={17} aria-hidden="true" />
            <div>
              <strong>{t(F.language)}</strong>
              <span>{currentLanguage.label}</span>
            </div>
            <div className="settings-language-control" aria-label={t(F.language)}>
              {languages.map((item) => (
                <button className={item.code === language ? "is-active" : ""} type="button" onClick={() => onLanguageChange(item.code)} key={item.code}>
                  {item.short}
                </button>
              ))}
            </div>
          </article>

          <article className="settings-row">
            <Bell size={17} aria-hidden="true" />
            <div>
              <strong>{t(F.notifications)}</strong>
              <span>{t(L("Urgent alerts, meetings, complaints", "तत्काल अलर्ट, बैठकें, शिकायतें", "तातडीचे अलर्ट, बैठका, तक्रारी"))}</span>
            </div>
            <span className="settings-status-pill">{t(L("On", "चालू", "चालू"))}</span>
          </article>

          <article className="settings-row">
            <Route size={17} aria-hidden="true" />
            <div>
              <strong>{t(F.defaultView)}</strong>
              <span>{t(common.dashboard)}</span>
            </div>
            <span className="settings-status-pill">{t(L("Chief of Staff", "चीफ ऑफ स्टाफ", "चीफ ऑफ स्टाफ"))}</span>
          </article>

          <article className="settings-row">
            <ShieldCheck size={17} aria-hidden="true" />
            <div>
              <strong>{t(F.syncMode)}</strong>
              <span>{t(L("Field safe sync for campaign work", "अभियान कार्य के लिए फील्ड सुरक्षित सिंक", "प्रचार कामासाठी फील्ड सुरक्षित सिंक"))}</span>
            </div>
            <span className="settings-status-pill">{t(L("Auto", "ऑटो", "ऑटो"))}</span>
          </article>
        </div>
      </section>

      <section className="settings-section">
        <div className="section-head">
          <h2>{t(L("Navigation", "नेविगेशन", "नेव्हिगेशन"))}</h2>
        </div>
        <div className="settings-chip-row">
          {navModules.map((label) => (
            <span key={t(label)}>{t(label)}</span>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <div className="section-head">
          <h2>{t(common.officeOperations)}</h2>
        </div>
        <div className="settings-module-list">
          {officeModules.map((moduleItem) => (
            <article className="settings-module-row" key={moduleItem.id}>
              <span className="module-icon">
                <moduleItem.icon size={16} aria-hidden="true" />
              </span>
              <div>
                <strong>{t(moduleItem.title)}</strong>
                <span>{t(moduleItem.description)}</span>
              </div>
              <Check size={16} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="settings-section custom-field-builder">
        <div className="section-head">
          <h2>{t(L("Custom Data Fields", "कस्टम डेटा फ़ील्ड", "कस्टम डेटा फील्ड"))}</h2>
          <span>{totalCustomFields}</span>
        </div>
        <p>{t(L("Add extra fields only where field teams need more local context.", "अतिरिक्त फ़ील्ड केवल वहां जोड़ें जहां फील्ड टीम को अधिक स्थानीय संदर्भ चाहिए.", "फील्ड टीमला अधिक स्थानिक संदर्भ हवा असेल तेव्हाच अतिरिक्त फील्ड जोडा."))}</p>
        <div className="custom-field-module-strip">
          {customFieldModules.map((moduleItem) => (
            <button className={customModuleId === moduleItem.id ? "is-active" : ""} type="button" onClick={() => setCustomModuleId(moduleItem.id as CustomFieldModuleId)} key={moduleItem.id}>
              <moduleItem.icon size={15} aria-hidden="true" />
              <span>{t(moduleItem.title)}</span>
            </button>
          ))}
        </div>
        <div className="custom-field-form">
          <label className="field-shell">
            <span>{t(L("Field Label", "फ़ील्ड लेबल", "फील्ड लेबल"))}</span>
            <input value={customFieldLabel} placeholder={t(L("Enter field name", "फ़ील्ड नाम दर्ज करें", "फील्ड नाव टाका"))} onChange={(event) => setCustomFieldLabel(event.target.value)} />
          </label>
          <div className="custom-field-type-grid" aria-label={t(L("Field Type", "फ़ील्ड प्रकार", "फील्ड प्रकार"))}>
            {customFieldTypeOptions.map((item) => (
              <button className={customFieldType === item.value ? "is-active" : ""} type="button" onClick={() => setCustomFieldType(item.value)} key={item.value}>
                {t(item.label)}
              </button>
            ))}
          </div>
          <button className="primary-button" type="button" disabled={!customFieldLabel.trim()} onClick={submitCustomField}>
            <Plus size={17} aria-hidden="true" />
            {t(L("Add Field", "फ़ील्ड जोड़ें", "फील्ड जोडा"))}
          </button>
        </div>
        <div className="custom-field-list">
          <strong>{t(selectedCustomModule?.title ?? category.custom)} - {t(L("Added Fields", "जोड़े गए फ़ील्ड", "जोडलेले फील्ड"))}</strong>
          {selectedCustomFields.length ? (
            <div className="settings-chip-row">
              {selectedCustomFields.map((fieldItem) => (
                <span key={fieldItem.key}>{t(fieldItem.label)}</span>
              ))}
            </div>
          ) : (
            <span>{t(L("No custom fields yet", "अभी कोई कस्टम फ़ील्ड नहीं", "अजून कस्टम फील्ड नाहीत"))}</span>
          )}
        </div>
      </section>

      <section className="ai-inline-card">
        <Sparkles size={17} aria-hidden="true" />
        <p>{t(L("Recommended: keep Dashboard as the default opening screen so urgent Sinnar work appears first.", "सुझाव: डैशबोर्ड को डिफ़ॉल्ट ओपनिंग स्क्रीन रखें ताकि सिन्नर का तत्काल काम पहले दिखे.", "शिफारस: डॅशबोर्ड डिफॉल्ट उघडणारा स्क्रीन ठेवा म्हणजे सिन्नरचे तातडीचे काम आधी दिसेल."))}</p>
      </section>

      <section className="settings-section">
        <div className="section-head">
          <h2>{t(L("Privacy & Access", "गोपनीयता और प्रवेश", "गोपनीयता आणि प्रवेश"))}</h2>
        </div>
        <div className="settings-list">
          <article className="settings-row">
            <LockKeyhole size={17} aria-hidden="true" />
            <div>
              <strong>{t(common.secureAccount)}</strong>
              <span>{t(L("Private campaign and voter data", "निजी अभियान और मतदाता डेटा", "खाजगी प्रचार आणि मतदार डेटा"))}</span>
            </div>
            <span className="settings-status-pill">{t(common.activeSession)}</span>
          </article>
        </div>
      </section>
    </>
  );
}

function NotificationsScreen({ t }: { t: (value: Copy) => string }) {
  const notifications = [
    {
      title: L("New voter follow-up assigned", "नया मतदाता फॉलो-अप सौंपा गया", "नवीन मतदार फॉलो-अप नेमले"),
      message: L("Review the booth contact list before the evening round.", "शाम के राउंड से पहले बूथ संपर्क सूची देखें.", "सायंकाळच्या फेरीपूर्वी बूथ संपर्क यादी तपासा."),
      status: common.unread,
      action: L("Open voter follow-up", "मतदाता फॉलो-अप खोलें", "मतदार फॉलो-अप उघडा"),
      tone: "unread"
    },
    {
      title: L("Meeting reminder", "बैठक रिमाइंडर", "बैठक स्मरणपत्र"),
      message: L("Village coordinator meeting is scheduled today.", "गांव समन्वयक बैठक आज निर्धारित है.", "गाव समन्वयक बैठक आज नियोजित आहे."),
      status: common.unread,
      action: L("Prepare talking points", "बातचीत बिंदु तैयार करें", "बोलण्याचे मुद्दे तयार करा"),
      tone: "unread"
    },
    {
      title: L("Complaint status updated", "शिकायत स्थिति अपडेट", "तक्रार स्थिती अपडेट"),
      message: L("A water supply complaint moved to in-progress.", "पानी सप्लाई शिकायत प्रगति में गई.", "पाणीपुरवठा तक्रार प्रगतीत गेली."),
      status: common.read,
      action: L("Check evidence", "प्रमाण जांचें", "पुरावे तपासा"),
      tone: "read"
    }
  ];

  return (
    <>
      <section className="notification-summary">
        <article>
          <span>{t(common.unread)}</span>
          <strong>2</strong>
        </article>
        <article>
          <span>{t(common.read)}</span>
          <strong>1</strong>
        </article>
        <article>
          <span>{t(L("Needs Action", "कार्रवाई चाहिए", "कृती हवी"))}</span>
          <strong>2</strong>
        </article>
      </section>
      <section className="notification-list">
        {notifications.map((item) => (
          <article className={`notification-card ${item.tone === "unread" ? "is-unread" : ""}`} key={t(item.title)}>
            <div>
              <strong>{t(item.title)}</strong>
              <span>{t(item.message)}</span>
            </div>
            <em>{t(item.status)}</em>
            <div className="notification-next-action">
              <span>{t(common.nextAction)}</span>
              <strong>{t(item.action)}</strong>
              <ChevronRight size={15} aria-hidden="true" />
            </div>
          </article>
        ))}
      </section>
      <section className="ai-inline-card">
        <Sparkles size={17} aria-hidden="true" />
        <p>{t(L("Handle unread voter and meeting alerts before the next field visit.", "अगली फील्ड भेट से पहले अपठित मतदाता और बैठक अलर्ट संभालें.", "पुढील फील्ड भेटीपूर्वी न वाचलेले मतदार आणि बैठक अलर्ट हाताळा."))}</p>
      </section>
    </>
  );
}

function UtilityForm({ fields, t, submitLabel }: { fields: FieldDef[]; t: (value: Copy) => string; submitLabel: Copy }) {
  const initialValues = useMemo(() => Object.fromEntries(fields.map((fieldItem) => [fieldItem.key, getUtilityDefaultValue(fieldItem, t)])), [fields, t]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const groups = groupFields(fields);

  return (
    <form
      className="entry-form utility-form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {groups.map((groupItem) => (
        <section className="form-group" key={t(groupItem.category)}>
          <h2>{t(groupItem.category)}</h2>
          <div className="form-fields">
            {groupItem.fields.map((fieldItem) => (
              <FieldControl
                key={fieldItem.key}
                field={fieldItem}
                value={values[fieldItem.key] ?? ""}
                t={t}
                onChange={(value) => setValues((current) => ({ ...current, [fieldItem.key]: value }))}
              />
            ))}
          </div>
        </section>
      ))}
      <button className="primary-button utility-submit" type="submit">
        <Check size={17} aria-hidden="true" />
        {t(submitLabel)}
      </button>
    </form>
  );
}

function getUtilityDefaultValue(fieldItem: FieldDef, t: (value: Copy) => string) {
  const defaults: Record<string, Copy> = {
    name: L("Anuj Avhad", "अनुज अव्हाड", "अनुज अव्हाड"),
    mobileNumber: L("+91 98765 43210", "+91 98765 43210", "+91 98765 43210"),
    role: common.fieldWorker,
    village: L("Sinnar", "सिन्नर", "सिन्नर"),
    booth: common.assignment,
    language: L("Marathi", "मराठी", "मराठी"),
    notifications: L("On", "चालू", "चालू"),
    theme: L("Dark", "डार्क", "डार्क"),
    syncMode: L("Auto", "ऑटो", "ऑटो"),
    defaultView: common.dashboard
  };
  return defaults[fieldItem.key] ? t(defaults[fieldItem.key]) : "";
}

function ModuleGrid({ t, modulesToShow, openModule }: { t: (value: Copy) => string; modulesToShow: ModuleDef[]; openModule: (moduleId: ModuleId, view?: View) => void }) {
  return (
    <div className="module-grid">
      {modulesToShow.map((module) => (
        <button className="module-card" type="button" onClick={() => openModule(module.id)} key={module.id}>
          <span className="module-icon">
            <module.icon size={17} aria-hidden="true" />
          </span>
          <span>
            <strong>{t(module.title)}</strong>
            <small>{t(module.description)}</small>
          </span>
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}

function CalendarScreen({
  t,
  records,
  mode,
  onModeChange,
  onOpenDetail
}: {
  t: (value: Copy) => string;
  records: RecordEntry[];
  mode: CalendarMode;
  onModeChange: (mode: CalendarMode) => void;
  onOpenDetail: (moduleId: ModuleId, item: WorkItem) => void;
}) {
  const calendarModule = moduleMap.get("calendar") ?? modules[0];
  const agendaItems = getModuleWorkItems(calendarModule, records).slice(0, 5);
  const modeOptions: { value: CalendarMode; label: Copy }[] = [
    { value: "day", label: L("Day", "दिन", "दिवस") },
    { value: "week", label: L("Week", "सप्ताह", "आठवडा") },
    { value: "month", label: L("Month", "महीना", "महिना") }
  ];
  const weekDays = [
    { day: L("Mon", "सोम", "सोम"), date: "22", tone: "low" },
    { day: L("Tue", "मंगल", "मंगळ"), date: "23", tone: "medium" },
    { day: L("Wed", "बुध", "बुध"), date: "24", tone: "low" },
    { day: L("Thu", "गुरु", "गुरु"), date: "25", tone: "high" },
    { day: L("Fri", "शुक्र", "शुक्र"), date: "26", tone: "high" },
    { day: L("Sat", "शनि", "शनि"), date: "27", tone: "medium" },
    { day: L("Sun", "रवि", "रवि"), date: "28", tone: "low" }
  ];
  const monthDays = Array.from({ length: 35 }, (_, index) => {
    const date = index - 1;
    const active = date > 0 && date <= 30;
    return {
      date: active ? String(date) : "",
      hasWork: [3, 7, 12, 18, 22, 26, 27].includes(date),
      isToday: date === 26
    };
  });

  return (
    <>
      <section className="calendar-control-panel">
        <div>
          <span>{t(L("Sinnar Field Calendar", "सिन्नर फील्ड कैलेंडर", "सिन्नर फील्ड कॅलेंडर"))}</span>
          <h2>{t(L("Today’s route and commitments", "आज का रूट और प्रतिबद्धताएं", "आजचा मार्ग आणि बांधिलकी"))}</h2>
        </div>
        <div className="calendar-mode-switch" aria-label={t(L("Calendar View", "कैलेंडर दृश्य", "कॅलेंडर दृश्य"))}>
          {modeOptions.map((item) => (
            <button className={mode === item.value ? "is-active" : ""} type="button" onClick={() => onModeChange(item.value)} key={item.value}>
              {t(item.label)}
            </button>
          ))}
        </div>
      </section>

      {mode === "day" ? (
        <section className="calendar-day-view">
          {agendaItems.slice(0, 4).map((item, index) => (
            <button className={`calendar-event-row priority-${item.priority}`} type="button" onClick={() => onOpenDetail("calendar", item)} key={item.id}>
              <time>{["09:30", "11:00", "14:30", "17:00"][index] ?? "18:30"}</time>
              <div>
                <strong>{t(item.title)}</strong>
                <span>{t(item.relation)} · {t(item.who)}</span>
              </div>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </section>
      ) : null}

      {mode === "week" ? (
        <section className="calendar-week-view">
          {weekDays.map((item) => (
            <article className={`calendar-week-day tone-${item.tone}`} key={item.date}>
              <span>{t(item.day)}</span>
              <strong>{item.date}</strong>
              <i aria-hidden="true" />
            </article>
          ))}
        </section>
      ) : null}

      {mode === "month" ? (
        <section className="calendar-month-view">
          {monthDays.map((item, index) => (
            <article className={item.isToday ? "is-today" : ""} key={`${item.date}-${index}`}>
              <span>{item.date}</span>
              {item.hasWork ? <i aria-hidden="true" /> : null}
            </article>
          ))}
        </section>
      ) : null}

      <section className="calendar-agenda-section">
        <div className="section-head">
          <h2>{t(L("Agenda", "एजेंडा", "अजेंडा"))}</h2>
          <span>{agendaItems.length}</span>
        </div>
        <div className="calendar-agenda-list">
          {agendaItems.map((item) => (
            <button className="calendar-agenda-item" type="button" onClick={() => onOpenDetail("calendar", item)} key={item.id}>
              <span className={`priority-dot priority-${item.priority}`} aria-hidden="true" />
              <div>
                <strong>{t(item.title)}</strong>
                <small>{t(common.nextAction)}: {t(item.nextAction)}</small>
              </div>
              <span>{t(item.when)}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ai-inline-card">
        <Sparkles size={17} aria-hidden="true" />
        <p>{t(getModuleAiSuggestion("calendar"))}</p>
      </section>
    </>
  );
}

function ModuleList({
  module,
  t,
  records,
  openModule,
  onOpenDetail,
  onOpenActions
}: {
  module: ModuleDef;
  t: (value: Copy) => string;
  records: RecordEntry[];
  openModule: (moduleId: ModuleId, view?: View) => void;
  onOpenDetail: (moduleId: ModuleId, item: WorkItem) => void;
  onOpenActions: () => void;
}) {
  const workItems = getModuleWorkItems(module, records);
  const summary = getSmartSummary(module, records);

  return (
    <>
      <section className="section-block compact-section">
        <div className="section-head">
          <h2>{t(L("Smart Summary", "स्मार्ट सारांश", "स्मार्ट सारांश"))}</h2>
        </div>
        <div className="smart-summary-row">
          {summary.map((item) => (
            <article className={`smart-summary-chip tone-${item.tone}`} key={t(item.label)}>
              <strong>{item.value}</strong>
              <span>{t(item.label)}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="productivity-toolbar">
        <label className="search-shell">
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder={t(common.search)} />
        </label>
        <div className="toolbar-actions">
          <button className="icon-action-button" type="button" aria-label={t(common.filter)}>
            <Filter size={17} aria-hidden="true" />
            <span>{t(common.filter)}</span>
          </button>
          <button className="icon-action-button" type="button" aria-label={t(common.sort)}>
            <SortAsc size={17} aria-hidden="true" />
            <span>{t(common.sort)}</span>
          </button>
          <button className="icon-action-button is-primary" type="button" aria-label={t(common.quickAdd)} onClick={onOpenActions}>
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <section className="work-list-section">
        {workItems.length ? (
          <div className="work-card-list">
            {workItems.map((item) => (
              <WorkCard key={item.id} item={item} t={t} onOpen={() => onOpenDetail(module.id, item)} />
            ))}
          </div>
        ) : (
          <article className="action-empty-state">
            <strong>{t(getEmptyStateTitle(module))}</strong>
            <p>{t(common.noPendingToday)}</p>
            <button className="primary-button" type="button" onClick={() => openModule(module.id, "new")}>
              <Plus size={17} aria-hidden="true" />
              {t(getCreateLabel(module))}
            </button>
          </article>
        )}
      </section>
    </>
  );
}

function WorkCard({ item, t, onOpen }: { item: WorkItem; t: (value: Copy) => string; onOpen: () => void }) {
  return (
    <button className={`work-card priority-${item.priority}`} type="button" onClick={onOpen}>
      <div className="work-card-main">
        <span className="priority-dot" aria-hidden="true" />
        <div>
          <strong>{t(item.title)}</strong>
          <small>{t(item.relation)}</small>
        </div>
      </div>
      <div className="work-card-meta">
        <span>{t(common.who)}: {t(item.who)}</span>
        <span>{t(common.when)}: {t(item.when)}</span>
        <span>{t(F.priority)}: {t(getPriorityLabel(item.priority))}</span>
        <span>{t(common.status)}: {t(item.status)}</span>
      </div>
      <div className="work-next-action">
        <span>{t(common.nextAction)}</span>
        <strong>{t(item.nextAction)}</strong>
        <ChevronRight size={16} aria-hidden="true" />
      </div>
    </button>
  );
}

function getSmartSummary(module: ModuleDef, records: RecordEntry[]) {
  const base = records.length;
  const summaryByModule: Partial<Record<ModuleId, { label: Copy; value: string; tone: PriorityTone }[]>> = {
    tasks: [
      { label: L("Today's Tasks", "आज के कार्य", "आजची कामे"), value: String(Math.max(base, 5)), tone: "high" },
      { label: L("Overdue", "ओवरड्यू", "मुदत उलटलेली"), value: "2", tone: "high" },
      { label: L("Due Tomorrow", "कल देय", "उद्या देय"), value: "3", tone: "medium" },
      { label: L("Completed Today", "आज पूर्ण", "आज पूर्ण"), value: "4", tone: "low" }
    ],
    voters: [
      { label: L("To Contact", "संपर्क करने हैं", "संपर्क करायचे"), value: String(Math.max(base, 12)), tone: "high" },
      { label: L("High Support", "उच्च समर्थन", "जास्त समर्थन"), value: "8", tone: "low" },
      { label: L("Needs Visit", "भेट चाहिए", "भेट हवी"), value: "5", tone: "medium" },
      { label: L("Updated Today", "आज अपडेट", "आज अपडेट"), value: "6", tone: "low" }
    ],
    meetings: [
      { label: L("Today", "आज", "आज"), value: String(Math.max(base, 3)), tone: "high" },
      { label: L("Prep Needed", "तैयारी चाहिए", "तयारी हवी"), value: "2", tone: "medium" },
      { label: L("Notes Pending", "नोट्स लंबित", "नोंदी बाकी"), value: "1", tone: "medium" },
      { label: L("Completed", "पूर्ण", "पूर्ण"), value: "2", tone: "low" }
    ],
    complaints: [
      { label: L("Urgent", "तत्काल", "तातडीचे"), value: String(Math.max(base, 2)), tone: "high" },
      { label: L("Evidence Needed", "प्रमाण चाहिए", "पुरावे हवेत"), value: "3", tone: "medium" },
      { label: L("Department Pending", "विभाग लंबित", "विभागाकडे बाकी"), value: "4", tone: "medium" },
      { label: L("Resolved Today", "आज हल", "आज सोडवले"), value: "1", tone: "low" }
    ],
    issues: [
      { label: L("High Impact", "उच्च प्रभाव", "जास्त परिणाम"), value: String(Math.max(base, 3)), tone: "high" },
      { label: L("Needs Visit", "भेट चाहिए", "भेट हवी"), value: "4", tone: "medium" },
      { label: L("Leader Follow-up", "नेता फॉलो-अप", "नेता फॉलो-अप"), value: "2", tone: "medium" },
      { label: L("Updated", "अपडेट", "अपडेट"), value: "5", tone: "low" }
    ],
    visitors: [
      { label: L("Waiting", "प्रतीक्षा", "प्रतीक्षेत"), value: String(Math.max(base, 4)), tone: "high" },
      { label: L("Follow-up", "फॉलो-अप", "फॉलो-अप"), value: "3", tone: "medium" },
      { label: L("VIP", "VIP", "VIP"), value: "1", tone: "high" },
      { label: L("Completed", "पूर्ण", "पूर्ण"), value: "6", tone: "low" }
    ],
    events: [
      { label: L("Today", "आज", "आज"), value: String(Math.max(base, 1)), tone: "high" },
      { label: L("Invitees Pending", "आमंत्रित लंबित", "आमंत्रित बाकी"), value: "18", tone: "medium" },
      { label: L("Logistics", "लॉजिस्टिक्स", "व्यवस्था"), value: "3", tone: "medium" },
      { label: L("Completed", "पूर्ण", "पूर्ण"), value: "2", tone: "low" }
    ],
    schemes: [
      { label: L("Applications", "आवेदन", "अर्ज"), value: String(Math.max(base, 9)), tone: "medium" },
      { label: L("Documents Missing", "दस्तावेज बाकी", "कागदपत्रे बाकी"), value: "4", tone: "high" },
      { label: L("Eligible", "पात्र", "पात्र"), value: "11", tone: "low" },
      { label: L("Submitted", "जमा", "जमा"), value: "5", tone: "low" }
    ],
    calendar: [
      { label: L("Today", "आज", "आज"), value: String(Math.max(base, 6)), tone: "high" },
      { label: L("Conflicts", "टकराव", "संघर्ष"), value: "1", tone: "high" },
      { label: L("Tomorrow", "कल", "उद्या"), value: "4", tone: "medium" },
      { label: L("Done", "पूर्ण", "पूर्ण"), value: "3", tone: "low" }
    ]
  };

  return summaryByModule[module.id] ?? [
    { label: L("Today", "आज", "आज"), value: String(Math.max(base, 3)), tone: "high" },
    { label: L("Urgent", "तत्काल", "तातडीचे"), value: "2", tone: "high" },
    { label: L("Tomorrow", "कल", "उद्या"), value: "2", tone: "medium" },
    { label: L("Completed", "पूर्ण", "पूर्ण"), value: "4", tone: "low" }
  ];
}

function getModuleWorkItems(module: ModuleDef, records: RecordEntry[]) {
  const saved = records.map((record, index) => mapRecordToWorkItem(module, record, index));
  return [...saved, ...getSampleWorkItems(module.id)].slice(0, 8);
}

function mapRecordToWorkItem(module: ModuleDef, record: RecordEntry, index: number): WorkItem {
  const primary = module.fields.find((fieldItem) => record.values[fieldItem.key]) ?? module.fields[0];
  const title = record.values[primary?.key] || `${module.id} ${index + 1}`;
  return {
    id: record.id,
    title: L(title, title, title),
    who: L(record.values.assignedTo || record.values.assignedVolunteer || record.values.visitorName || "Campaign team", record.values.assignedTo || record.values.assignedVolunteer || record.values.visitorName || "अभियान टीम", record.values.assignedTo || record.values.assignedVolunteer || record.values.visitorName || "प्रचार टीम"),
    when: L(record.values.date || record.values.dueDate || "Today", record.values.date || record.values.dueDate || "आज", record.values.date || record.values.dueDate || "आज"),
    priority: normalizePriority(record.values.priority),
    status: L(record.values.status || "Open", record.values.status || "खुला", record.values.status || "उघडे"),
    nextAction: getModuleNextAction(module.id),
    relation: getModuleRelation(module.id),
    ai: getModuleAiSuggestion(module.id)
  };
}

function getSampleWorkItems(moduleId: ModuleId): WorkItem[] {
  const shared = {
    today: L("Today", "आज", "आज"),
    tomorrow: L("Tomorrow", "कल", "उद्या"),
    rahul: L("Rahul", "राहुल", "राहुल"),
    coordinator: L("Village Coordinator", "गांव समन्वयक", "गाव समन्वयक"),
    open: L("Open", "खुला", "उघडे"),
    inProgress: L("In Progress", "प्रगति में", "प्रगतीत"),
    completed: L("Completed", "पूर्ण", "पूर्ण")
  };

  const items: Partial<Record<ModuleId, WorkItem[]>> = {
    tasks: [
      work("task-1", L("Visit Pangri", "पांगरी भेट", "पांगरी भेट"), shared.rahul, shared.today, "high", shared.open, L("Start visit", "भेट शुरू करें", "भेट सुरू करा"), L("Related Issue: Water", "संबंधित मुद्दा: पानी", "संबंधित समस्या: पाणी"), getModuleAiSuggestion("tasks")),
      work("task-2", L("Call Village Head", "गांव प्रमुख को कॉल", "गाव प्रमुखांना कॉल"), shared.coordinator, shared.tomorrow, "medium", shared.open, L("Make call", "कॉल करें", "कॉल करा"), L("Village: Musalgaon", "गांव: मुसलगांव", "गाव: मुसळगाव"), getModuleAiSuggestion("tasks")),
      work("task-3", L("Approve complaint note", "शिकायत नोट मंजूर", "तक्रार नोंद मंजूर"), L("Office Desk", "ऑफिस डेस्क", "ऑफिस डेस्क"), L("Completed", "पूर्ण", "पूर्ण"), "low", shared.completed, L("Review history", "इतिहास देखें", "इतिहास पाहा"), L("Complaint: Road repair", "शिकायत: सड़क मरम्मत", "तक्रार: रस्ता दुरुस्ती"), getModuleAiSuggestion("tasks"))
    ],
    voters: [
      work("voter-1", L("Meet Kisan Jadhav family", "किसन जाधव परिवार से मिलें", "किसन जाधव कुटुंबाला भेटा"), shared.rahul, shared.today, "high", shared.open, L("Confirm support", "समर्थन पुष्टि करें", "समर्थन निश्चित करा"), L("Booth 42 · Pangri", "बूथ 42 · पांगरी", "बूथ 42 · पांगरी"), getModuleAiSuggestion("voters")),
      work("voter-2", L("Call neutral voters list", "न्यूट्रल मतदाता सूची कॉल", "तटस्थ मतदार यादी कॉल"), shared.coordinator, shared.tomorrow, "medium", shared.inProgress, L("Log sentiment", "भावना दर्ज करें", "भावना नोंदवा"), L("Ward 8", "वार्ड 8", "प्रभाग 8"), getModuleAiSuggestion("voters"))
    ],
    meetings: [
      work("meeting-1", L("Farmer group meeting", "किसान समूह बैठक", "शेतकरी गट बैठक"), L("Pangri group", "पांगरी समूह", "पांगरी गट"), shared.today, "high", shared.open, L("Prepare talking points", "बातचीत बिंदु तैयार करें", "बोलण्याचे मुद्दे तयार करा"), L("Topic: Water and crop prices", "विषय: पानी और फसल भाव", "विषय: पाणी आणि पीक भाव"), getModuleAiSuggestion("meetings")),
      work("meeting-2", L("Coordinator review", "समन्वयक समीक्षा", "समन्वयक आढावा"), shared.coordinator, shared.tomorrow, "medium", shared.open, L("Collect booth notes", "बूथ नोट्स लें", "बूथ नोंदी घ्या"), L("Village desk", "गांव डेस्क", "गाव डेस्क"), getModuleAiSuggestion("meetings"))
    ],
    complaints: [
      work("complaint-1", L("Resolve water complaint", "पानी शिकायत हल करें", "पाणी तक्रार सोडवा"), L("Water department", "पानी विभाग", "पाणी विभाग"), shared.today, "high", shared.inProgress, L("Upload evidence", "प्रमाण अपलोड करें", "पुरावे अपलोड करा"), L("Village: Pangri", "गांव: पांगरी", "गाव: पांगरी"), getModuleAiSuggestion("complaints")),
      work("complaint-2", L("Road repair follow-up", "सड़क मरम्मत फॉलो-अप", "रस्ता दुरुस्ती फॉलो-अप"), shared.rahul, shared.tomorrow, "medium", shared.open, L("Call engineer", "इंजीनियर को कॉल", "इंजिनियरला कॉल"), L("Ward 5", "वार्ड 5", "प्रभाग 5"), getModuleAiSuggestion("complaints"))
    ],
    issues: [
      work("issue-1", L("Water scarcity cluster", "पानी कमी क्लस्टर", "पाणी टंचाई क्लस्टर"), shared.coordinator, shared.today, "high", shared.open, L("Map affected booths", "प्रभावित बूथ मैप करें", "प्रभावित बूथ मॅप करा"), L("Political impact: High", "राजनीतिक प्रभाव: उच्च", "राजकीय परिणाम: जास्त"), getModuleAiSuggestion("issues"))
    ],
    visitors: [
      work("visitor-1", L("Meet farmer delegation", "किसान प्रतिनिधिमंडल से मिलें", "शेतकरी प्रतिनिधींना भेटा"), L("Office Desk", "ऑफिस डेस्क", "ऑफिस डेस्क"), shared.today, "high", shared.open, L("Record request", "अनुरोध दर्ज करें", "मागणी नोंदवा"), L("Purpose: Irrigation", "उद्देश्य: सिंचाई", "उद्देश: सिंचन"), getModuleAiSuggestion("visitors"))
    ],
    events: [
      work("event-1", L("Youth sports evening", "युवा खेल संध्या", "युवा क्रीडा संध्याकाळ"), L("Youth team", "युवा टीम", "युवा टीम"), shared.today, "medium", shared.open, L("Confirm invitees", "आमंत्रित पुष्टि करें", "आमंत्रित निश्चित करा"), L("Expected: 120", "अपेक्षित: 120", "अपेक्षित: 120"), getModuleAiSuggestion("events"))
    ],
    schemes: [
      work("scheme-1", L("Review PM-Kisan applications", "PM-Kisan आवेदन देखें", "PM-Kisan अर्ज तपासा"), L("Scheme desk", "योजना डेस्क", "योजना डेस्क"), shared.today, "medium", shared.open, L("Check documents", "दस्तावेज जांचें", "कागदपत्रे तपासा"), L("Beneficiaries: 18", "लाभार्थी: 18", "लाभार्थी: 18"), getModuleAiSuggestion("schemes"))
    ],
    calendar: [
      work("calendar-1", L("Route planning block", "रूट प्लानिंग ब्लॉक", "मार्ग नियोजन ब्लॉक"), L("Campaign desk", "अभियान डेस्क", "प्रचार डेस्क"), shared.today, "high", shared.open, L("Resolve conflict", "टकराव हल करें", "संघर्ष सोडवा"), L("Conflicts with meeting", "बैठक से टकराव", "बैठकीशी संघर्ष"), getModuleAiSuggestion("calendar")),
      work("calendar-2", L("Pangri village visit", "पांगरी गांव भेट", "पांगरी गाव भेट"), shared.rahul, shared.today, "high", shared.open, L("Start visit", "भेट शुरू करें", "भेट सुरू करा"), L("Village route", "गांव रूट", "गाव मार्ग"), getModuleAiSuggestion("calendar")),
      work("calendar-3", L("Coordinator call window", "समन्वयक कॉल विंडो", "समन्वयक कॉल वेळ"), shared.coordinator, shared.today, "medium", shared.open, L("Confirm booth notes", "बूथ नोट्स पुष्टि करें", "बूथ नोंदी निश्चित करा"), L("Phone follow-up", "फोन फॉलो-अप", "फोन फॉलो-अप"), getModuleAiSuggestion("calendar"))
    ]
  };

  return items[moduleId] ?? [
    work(`${moduleId}-1`, getCreateLabel({ id: moduleId } as ModuleDef), L("Campaign team", "अभियान टीम", "प्रचार टीम"), shared.today, "medium", shared.open, L("Review and assign", "देखें और असाइन करें", "पाहा आणि नेमा"), getModuleRelation(moduleId), getModuleAiSuggestion(moduleId))
  ];
}

function work(id: string, title: Copy, who: Copy, when: Copy, priority: PriorityTone, status: Copy, nextAction: Copy, relation: Copy, ai: Copy): WorkItem {
  return { id, title, who, when, priority, status, nextAction, relation, ai };
}

function normalizePriority(value?: string): PriorityTone {
  const normalized = (value || "").toLowerCase();
  if (normalized.includes("high") || normalized.includes("उच्च")) return "high";
  if (normalized.includes("low") || normalized.includes("कम") || normalized.includes("कमी")) return "low";
  return "medium";
}

function getPriorityLabel(priority: PriorityTone) {
  if (priority === "high") return L("High", "उच्च", "उच्च");
  if (priority === "medium") return L("Medium", "मध्यम", "मध्यम");
  return L("Low", "कम", "कमी");
}

function getCreateLabel(module: Pick<ModuleDef, "id">) {
  const labels: Partial<Record<ModuleId, Copy>> = {
    tasks: common.createTask,
    voters: common.addVoter,
    meetings: common.addMeeting,
    complaints: common.addComplaint,
    issues: common.addIssue,
    visitors: common.addVisitor,
    events: common.addEvent,
    schemes: common.addSchemeBeneficiary,
    "daily-schedule": L("Create Schedule Item", "शेड्यूल आइटम बनाएं", "वेळापत्रक नोंद तयार करा"),
    calendar: L("Create Calendar Item", "कैलेंडर आइटम बनाएं", "कॅलेंडर नोंद तयार करा")
  };
  return labels[module.id] ?? common.createRecord;
}

function getEmptyStateTitle(module: ModuleDef) {
  const titles: Partial<Record<ModuleId, Copy>> = {
    tasks: L("No pending tasks today.", "आज कोई लंबित कार्य नहीं.", "आज प्रलंबित काम नाही."),
    voters: L("No voter follow-ups due now.", "अभी कोई मतदाता फॉलो-अप नहीं.", "आत्ता मतदार फॉलो-अप नाही."),
    meetings: L("No meetings need action now.", "अभी किसी बैठक पर कार्य नहीं.", "आत्ता बैठकीवर कृती नाही."),
    complaints: L("No urgent complaints pending.", "कोई तत्काल शिकायत लंबित नहीं.", "तातडीची तक्रार प्रलंबित नाही."),
    issues: L("No urgent issues pending.", "कोई तत्काल मुद्दा लंबित नहीं.", "तातडीची समस्या प्रलंबित नाही."),
    visitors: L("No visitors waiting.", "कोई आगंतुक प्रतीक्षा में नहीं.", "भेट देणारे प्रतीक्षेत नाहीत."),
    events: L("No event action pending.", "कोई कार्यक्रम कार्य लंबित नहीं.", "कार्यक्रम कृती बाकी नाही."),
    schemes: L("No scheme action pending.", "कोई योजना कार्य लंबित नहीं.", "योजना कृती बाकी नाही."),
    "daily-schedule": L("No schedule action pending.", "कोई शेड्यूल कार्य लंबित नहीं.", "वेळापत्रक कृती बाकी नाही."),
    calendar: L("Calendar is clear for now.", "कैलेंडर अभी साफ है.", "कॅलेंडर आत्ता मोकळे आहे.")
  };
  return titles[module.id] ?? common.noPendingToday;
}

function getModuleRelation(moduleId: ModuleId) {
  const relations: Partial<Record<ModuleId, Copy>> = {
    tasks: L("Related Issue: Water", "संबंधित मुद्दा: पानी", "संबंधित समस्या: पाणी"),
    voters: L("Booth intelligence", "बूथ इंटेलिजेंस", "बूथ माहिती"),
    meetings: L("Campaign coordination", "अभियान समन्वय", "प्रचार समन्वय"),
    complaints: L("Public grievance", "जन शिकायत", "लोक तक्रार"),
    issues: L("Political impact", "राजनीतिक प्रभाव", "राजकीय परिणाम"),
    visitors: L("Office visitor", "ऑफिस आगंतुक", "ऑफिस भेट"),
    events: L("Public program", "सार्वजनिक कार्यक्रम", "सार्वजनिक कार्यक्रम"),
    schemes: L("Scheme beneficiary", "योजना लाभार्थी", "योजना लाभार्थी"),
    "daily-schedule": L("Daily field route", "दैनिक फील्ड रूट", "दैनिक फील्ड मार्ग"),
    calendar: L("Schedule conflict", "कार्यक्रम टकराव", "वेळापत्रक संघर्ष")
  };
  return relations[moduleId] ?? L("Campaign work", "अभियान कार्य", "प्रचार काम");
}

function getModuleNextAction(moduleId: ModuleId) {
  const actions: Partial<Record<ModuleId, Copy>> = {
    tasks: L("Assign owner", "मालिक असाइन करें", "जबाबदार नेमा"),
    voters: L("Log sentiment", "भावना दर्ज करें", "भावना नोंदवा"),
    meetings: L("Prepare talking points", "बातचीत बिंदु तैयार करें", "बोलण्याचे मुद्दे तयार करा"),
    complaints: L("Upload evidence", "प्रमाण अपलोड करें", "पुरावे अपलोड करा"),
    issues: L("Assess impact", "प्रभाव आकलन करें", "परिणाम तपासा"),
    visitors: L("Record request", "अनुरोध दर्ज करें", "मागणी नोंदवा"),
    events: L("Confirm invitees", "आमंत्रित पुष्टि करें", "आमंत्रित निश्चित करा"),
    schemes: L("Check documents", "दस्तावेज जांचें", "कागदपत्रे तपासा"),
    "daily-schedule": L("Start next visit", "अगली भेट शुरू करें", "पुढील भेट सुरू करा"),
    calendar: L("Confirm timing", "समय पुष्टि करें", "वेळ निश्चित करा")
  };
  return actions[moduleId] ?? L("Review and assign", "देखें और असाइन करें", "पाहा आणि नेमा");
}

function getModuleAiSuggestion(moduleId: ModuleId) {
  const suggestions: Partial<Record<ModuleId, Copy>> = {
    tasks: L("Suggested owner: Rahul. Due today before the village visit.", "सुझाव मालिक: राहुल. गांव भेट से पहले आज पूरा करें.", "सुचवलेला जबाबदार: राहुल. गाव भेटीपूर्वी आज पूर्ण करा."),
    voters: L("Support probability looks medium-high; ask about water and crop price first.", "समर्थन संभावना मध्यम-उच्च है; पहले पानी और फसल भाव पूछें.", "समर्थन शक्यता मध्यम-जास्त; आधी पाणी आणि पीक भाव विचारा."),
    meetings: L("Prepare three talking points: water, roads, and scheme access.", "तीन बात बिंदु तैयार करें: पानी, सड़क, योजना पहुंच.", "तीन मुद्दे तयार करा: पाणी, रस्ते आणि योजना प्रवेश."),
    complaints: L("Suggested department: water supply. Ask for photo evidence before escalation.", "सुझाव विभाग: पानी आपूर्ति. एस्केलेशन से पहले फोटो प्रमाण लें.", "सुचवलेला विभाग: पाणीपुरवठा. पुढे पाठवण्यापूर्वी फोटो पुरावा घ्या."),
    issues: L("Likely political impact is high because this affects multiple booths.", "राजनीतिक प्रभाव उच्च हो सकता है क्योंकि कई बूथ प्रभावित हैं.", "राजकीय परिणाम जास्त असू शकतो कारण अनेक बूथ प्रभावित आहेत."),
    visitors: L("Previous interaction: irrigation request. Ask whether department responded.", "पिछली बातचीत: सिंचाई अनुरोध. विभाग ने जवाब दिया क्या पूछें.", "मागील संवाद: सिंचन मागणी. विभागाने प्रतिसाद दिला का ते विचारा."),
    events: L("Recommended invitees: youth leaders, sports organizers, and booth coordinators.", "सुझाए आमंत्रित: युवा नेता, खेल आयोजक, बूथ समन्वयक.", "सुचवलेले आमंत्रित: युवा नेते, क्रीडा आयोजक, बूथ समन्वयक."),
    schemes: L("Check income proof and Aadhaar before marking eligible.", "पात्र करने से पहले आय प्रमाण और आधार जांचें.", "पात्र करण्यापूर्वी उत्पन्न पुरावा आणि आधार तपासा."),
    "daily-schedule": L("Keep Pangri before lunch; it has the highest field urgency today.", "पांगरी भेट दोपहर से पहले रखें; आज इसकी फील्ड तात्कालिकता सबसे अधिक है.", "पांगरी भेट दुपारपूर्वी ठेवा; आज त्याची फील्ड तातडी सर्वाधिक आहे."),
    calendar: L("Move low-priority calls after the Pangri visit window.", "कम प्राथमिकता कॉल पांगरी भेट के बाद रखें.", "कमी प्राधान्य कॉल पांगरी भेटीनंतर ठेवा.")
  };
  return suggestions[moduleId] ?? L("Review this item and assign the next clear owner.", "इसे देखें और अगला स्पष्ट मालिक असाइन करें.", "ही नोंद पाहा आणि पुढील जबाबदार नेमा.");
}

function RecordForm({
  module,
  initialItem,
  t,
  onCancel,
  onSave
}: {
  module: ModuleDef;
  initialItem?: WorkItem | null;
  t: (value: Copy) => string;
  onCancel: () => void;
  onSave: (values: Record<string, string>) => void;
}) {
  const workflowFields = useMemo(() => getWorkflowFields(module), [module]);
  const initialValues = useMemo(() => {
    const baseValues = Object.fromEntries([...workflowFields.primary, ...workflowFields.assignment, ...workflowFields.related, ...module.fields].map((fieldItem) => [fieldItem.key, ""]));
    if (!initialItem) return baseValues;
    return {
      ...baseValues,
      workflowTitle: t(initialItem.title),
      workflowDescription: t(initialItem.relation),
      assignedTo: t(initialItem.who),
      priority: t(getPriorityLabel(initialItem.priority)),
      dueDate: t(initialItem.when),
      relatedIssue: t(initialItem.relation)
    };
  }, [initialItem, module.fields, t, workflowFields]);
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const draftKey = `${RECORD_KEY_PREFIX}${module.id}:draft:${initialItem?.id ?? "new"}`;
  const workflowFieldKeys = new Set([...workflowFields.primary, ...workflowFields.assignment, ...workflowFields.related].map((fieldItem) => fieldItem.key));
  const customFormFields = module.fields.filter((fieldItem) => fieldItem.custom);
  const standardAdvancedFields = module.fields.filter((fieldItem) => !fieldItem.custom && !workflowFieldKeys.has(fieldItem.key)).slice(0, 10);
  const advancedFields = [...customFormFields, ...standardAdvancedFields];

  const updateValue = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const isModified = (key: string) => Boolean(initialItem) && values[key] !== (initialValues[key] ?? "");
  const saveWithStatus = (status: string) => {
    window.localStorage.removeItem(draftKey);
    onSave({ ...values, workflowStatus: status });
  };

  useEffect(() => {
    window.localStorage.setItem(draftKey, JSON.stringify(values));
  }, [draftKey, values]);

  return (
    <form
      className="entry-form workflow-form"
      onSubmit={(event) => {
        event.preventDefault();
        saveWithStatus("saved");
      }}
    >
      {initialItem ? (
        <section className="autosave-note">
          <Check size={16} aria-hidden="true" />
          <span>{t(L("Auto-save draft active. Modified fields are highlighted.", "ऑटो-सेव ड्राफ्ट चालू है. बदले हुए फ़ील्ड हाइलाइट हैं.", "ऑटो-सेव्ह ड्राफ्ट सुरू आहे. बदललेली फील्ड हायलाइट केली आहेत."))}</span>
        </section>
      ) : null}

      <section className="form-group">
        <h2>{t(common.titleAndDescription)}</h2>
        <div className="form-fields">
          {workflowFields.primary.map((fieldItem) => (
            <FieldControl key={fieldItem.key} field={fieldItem} value={values[fieldItem.key] ?? ""} modified={isModified(fieldItem.key)} t={t} onChange={(value) => updateValue(fieldItem.key, value)} />
          ))}
        </div>
      </section>

      <section className="form-group">
        <h2>{t(common.assignmentAndTiming)}</h2>
        <div className="form-fields compact-form-grid">
          {workflowFields.assignment.map((fieldItem) => (
            <FieldControl key={fieldItem.key} field={fieldItem} value={values[fieldItem.key] ?? ""} modified={isModified(fieldItem.key)} t={t} onChange={(value) => updateValue(fieldItem.key, value)} />
          ))}
        </div>
      </section>

      <section className="form-group">
        <h2>{t(common.relatedRecords)}</h2>
        <div className="form-fields compact-form-grid">
          {workflowFields.related.map((fieldItem) => (
            <FieldControl key={fieldItem.key} field={fieldItem} value={values[fieldItem.key] ?? ""} modified={isModified(fieldItem.key)} t={t} onChange={(value) => updateValue(fieldItem.key, value)} />
          ))}
        </div>
      </section>

      <section className="form-group">
        <h2>{t(common.attachments)}</h2>
        <div className="attachment-action-grid">
          {[{ label: common.photo, icon: Upload }, { label: common.document, icon: Paperclip }, { label: common.voiceNote, icon: Mic }].map((item) => (
            <button className="attachment-action" type="button" key={t(item.label)}>
              <item.icon size={17} aria-hidden="true" />
              <span>{t(item.label)}</span>
            </button>
          ))}
        </div>
      </section>

      <details className="advanced-fields">
        <summary>
          <span>{t(L("Advanced Fields", "एडवांस फील्ड", "प्रगत फील्ड"))}</span>
          <ChevronDown size={16} aria-hidden="true" />
        </summary>
        <div className="form-fields">
          {advancedFields.map((fieldItem) => (
            <FieldControl key={fieldItem.key} field={fieldItem} value={values[fieldItem.key] ?? ""} modified={isModified(fieldItem.key)} t={t} onChange={(value) => updateValue(fieldItem.key, value)} />
          ))}
        </div>
      </details>

      <section className="ai-inline-card">
        <Sparkles size={17} aria-hidden="true" />
        <p>{t(getModuleAiSuggestion(module.id))}</p>
      </section>

      <div className="workflow-actions">
        <button className="ghost-button" type="button" onClick={() => saveWithStatus("draft")}>
          {t(common.saveDraft)}
        </button>
        <button className="primary-button" type="submit">
          <Check size={17} aria-hidden="true" />
          {t(common.save)}
        </button>
        <button className="secondary-button" type="button" onClick={() => saveWithStatus("assigned")}>
          {t(common.saveAndAssign)}
        </button>
        <button className="secondary-button" type="button" onClick={() => saveWithStatus("notified")}>
          {t(common.saveAndNotify)}
        </button>
        <button className="ghost-button" type="button" onClick={onCancel}>
          {t(common.cancel)}
        </button>
      </div>
    </form>
  );
}

function getWorkflowFields(module: ModuleDef) {
  const titleLabel = module.id === "voters" ? F.voterId : module.id === "complaints" ? F.complaintType : module.id === "issues" ? F.issueType : module.id === "meetings" ? F.meetingTitle : module.id === "visitors" ? F.visitorName : module.id === "events" ? F.name : module.id === "schemes" ? F.schemeName : F.title;
  return {
    primary: [
      field("workflowTitle", titleLabel, "text", true, category.task),
      field("workflowDescription", F.description, "textarea", false, category.task)
    ],
    assignment: [
      field("assignedTo", F.assignedTo, "text", false, category.assignment),
      field("priority", F.priority, "select", false, category.tracking, optionSets.priority),
      field("dueDate", F.dueDate, "date", false, category.schedule),
      field("reminder", common.reminder, "time", false, category.schedule)
    ],
    related: [
      field("village", F.village, "text", false, category.address),
      field("booth", F.booth, "text", false, category.electionArea),
      field("voterId", common.voter, "text", false, category.voterIdentity),
      field("relatedIssue", common.issue, "text", false, category.issue),
      field("relatedComplaint", common.complaint, "text", false, category.issue),
      field("relatedMeeting", common.meeting, "text", false, category.meeting),
      field("relatedVisitor", common.visitor, "text", false, category.visitor),
      field("relatedEvent", common.event, "text", false, category.program)
    ]
  };
}

function RecordDetail({ module, item, t, onEdit, onBack }: { module: ModuleDef; item: WorkItem; t: (value: Copy) => string; onEdit: () => void; onBack: () => void }) {
  const timelineItems = [
    { label: L("Created", "बनाया गया", "तयार केले"), value: L("Today 09:10", "आज 09:10", "आज 09:10") },
    { label: L("Assigned", "असाइन हुआ", "नेमले"), value: item.who },
    { label: L("Next review", "अगली समीक्षा", "पुढील आढावा"), value: item.when }
  ];

  return (
    <div className="detail-screen">
      <section className={`detail-hero priority-${item.priority}`}>
        <div>
          <span>{t(module.title)}</span>
          <h2>{t(item.title)}</h2>
          <p>{t(item.relation)}</p>
        </div>
        <button className="secondary-button" type="button" onClick={onEdit}>
          {t(L("Edit", "एडिट", "संपादित करा"))}
        </button>
      </section>

      <section className="detail-section">
        <h3>{t(common.overview)}</h3>
        <div className="detail-fact-grid">
          <article><span>{t(common.who)}</span><strong>{t(item.who)}</strong></article>
          <article><span>{t(common.when)}</span><strong>{t(item.when)}</strong></article>
          <article><span>{t(F.priority)}</span><strong>{t(getPriorityLabel(item.priority))}</strong></article>
          <article><span>{t(common.status)}</span><strong>{t(item.status)}</strong></article>
        </div>
        <div className="detail-next-action">
          <span>{t(common.nextAction)}</span>
          <strong>{t(item.nextAction)}</strong>
        </div>
      </section>

      <section className="detail-section">
        <h3>{t(common.timeline)}</h3>
        <div className="activity-timeline detail-timeline">
          {timelineItems.map((timelineItem) => (
            <article key={t(timelineItem.label)}>
              <time>{t(timelineItem.label)}</time>
              <span>{t(timelineItem.value)}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <h3>{t(common.relatedRecords)}</h3>
        <div className="detail-chip-row">
          <span>{t(item.relation)}</span>
          <span>{t(getModuleRelation(module.id))}</span>
        </div>
      </section>

      <section className="detail-section">
        <h3>{t(common.attachments)}</h3>
        <div className="attachment-action-grid">
          <button className="attachment-action" type="button"><Upload size={17} aria-hidden="true" /><span>{t(common.photo)}</span></button>
          <button className="attachment-action" type="button"><Paperclip size={17} aria-hidden="true" /><span>{t(common.document)}</span></button>
          <button className="attachment-action" type="button"><Mic size={17} aria-hidden="true" /><span>{t(common.voiceNote)}</span></button>
        </div>
      </section>

      <section className="detail-section">
        <h3>{t(common.activity)}</h3>
        <div className="detail-mini-grid">
          <article><MessageSquare size={17} aria-hidden="true" /><span>{t(common.comments)}</span><strong>2</strong></article>
          <article><History size={17} aria-hidden="true" /><span>{t(common.history)}</span><strong>4</strong></article>
          <article><ClipboardList size={17} aria-hidden="true" /><span>{t(modules.find((entry) => entry.id === "tasks")?.title ?? common.records)}</span><strong>1</strong></article>
        </div>
      </section>

      <section className="ai-recommendation-card">
        <Sparkles size={18} aria-hidden="true" />
        <div>
          <span>{t(common.aiSuggestions)}</span>
          <p>{t(item.ai)}</p>
        </div>
      </section>

      <button className="ghost-button" type="button" onClick={onBack}>
        {t(L("Back to List", "लिस्ट पर वापस", "यादीकडे परत"))}
      </button>
    </div>
  );
}

function FieldControl({
  field: fieldItem,
  value,
  modified,
  t,
  onChange
}: {
  field: FieldDef;
  value: string;
  modified?: boolean;
  t: (value: Copy) => string;
  onChange: (value: string) => void;
}) {
  const label = `${t(fieldItem.label)}${fieldItem.required ? " *" : ""}`;
  const fieldClassName = `field-shell ${modified ? "is-modified" : ""}`;
  if (fieldItem.type === "textarea") {
    return (
      <label className={fieldClassName}>
        <span>{label}</span>
        <textarea required={fieldItem.required} value={value} onChange={(event) => onChange(event.target.value)} />
      </label>
    );
  }

  if (fieldItem.type === "select") {
    return <CustomSelect label={label} options={fieldItem.options ?? []} value={value} modified={modified} t={t} onChange={onChange} required={fieldItem.required} />;
  }

  return (
    <label className={fieldClassName}>
      <span>{label}</span>
      <input required={fieldItem.required} value={value} type={fieldItem.type} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function CustomSelect({
  label,
  options,
  value,
  modified,
  t,
  onChange,
  required
}: {
  label: string;
  options: Copy[];
  value: string;
  modified?: boolean;
  t: (value: Copy) => string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`field-shell custom-select-field ${modified ? "is-modified" : ""}`}>
      <span>{label}</span>
      <input className="select-hidden-input" required={required} tabIndex={-1} value={value} onChange={() => null} />
      <button className={`custom-select ${open ? "is-open" : ""}`} type="button" onClick={() => setOpen((current) => !current)}>
        <span>{value || t(common.select)}</span>
        <ChevronDown size={17} aria-hidden="true" />
      </button>
      {open ? (
        <div className="custom-select-menu" role="listbox">
          {options.map((option) => {
            const optionValue = t(option);
            return (
              <button
                className={value === optionValue ? "is-selected" : ""}
                type="button"
                role="option"
                aria-selected={value === optionValue}
                onClick={() => {
                  onChange(optionValue);
                  setOpen(false);
                }}
                key={optionValue}
              >
                <span>{optionValue}</span>
                {value === optionValue ? <Check size={16} aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ImportView({
  module,
  t,
  selectedFileName,
  onSelectFile,
  onCancel
}: {
  module: ModuleDef;
  t: (value: Copy) => string;
  selectedFileName: string;
  onSelectFile: (fileName: string) => void;
  onCancel: () => void;
}) {
  return (
    <section className="import-panel">
      <label className="file-drop">
        <Upload size={22} aria-hidden="true" />
        <span>{t(common.chooseFile)}</span>
        <strong>{selectedFileName || t(common.noFileSelected)}</strong>
        <input
          accept=".xlsx,.csv"
          type="file"
          onChange={(event) => {
            onSelectFile(event.target.files?.[0]?.name ?? "");
          }}
        />
      </label>
      <article className="source-card">
        <span>{t(common.source)}</span>
        <strong>{t(module.source ?? common.manualSchema)}</strong>
      </article>
      <section className="ai-inline-card">
        <Sparkles size={17} aria-hidden="true" />
        <p>{t(L("AI will map the uploaded file into useful work items and flag records that need attention.", "AI अपलोड फाइल को उपयोगी कार्यों में मैप करेगा और ध्यान देने वाले रिकॉर्ड दिखाएगा.", "AI अपलोड फाइल उपयोगी कामांमध्ये मॅप करेल आणि लक्ष हवे असलेल्या नोंदी दाखवेल."))}</p>
      </section>
      <div className="action-row">
        <button className="ghost-button" type="button" onClick={onCancel}>
          {t(common.cancel)}
        </button>
        <button className="primary-button" type="button" onClick={onCancel}>
          <FileSpreadsheet size={17} aria-hidden="true" />
          {t(common.saveImportDraft)}
        </button>
      </div>
    </section>
  );
}

function ActionSheet({
  module,
  t,
  onClose,
  onCreate,
  onImport
}: {
  module: ModuleDef;
  t: (value: Copy) => string;
  onClose: () => void;
  onCreate: () => void;
  onImport: () => void;
}) {
  const actions = [
    { label: common.createRecord, detail: getCreateLabel(module), icon: Plus, action: onCreate },
    ...(module.importable ? [{ label: common.importCsv, detail: L("Bring records from a file", "फाइल से रिकॉर्ड लाएं", "फाइलमधून नोंदी आणा"), icon: FileSpreadsheet, action: onImport }] : []),
    { label: common.voiceEntry, detail: L("Dictate and let AI structure it", "बोलें और AI संरचना बनाए", "बोला आणि AI रचना करेल"), icon: Mic, action: onClose },
    { label: common.scanDocument, detail: L("Scan paper notes or forms", "पेपर नोट्स या फॉर्म स्कैन करें", "पेपर नोट्स किंवा फॉर्म स्कॅन करा"), icon: Upload, action: onClose }
  ];

  return (
    <div className="sheet-backdrop" role="presentation" onClick={onClose}>
      <section className="action-sheet" role="dialog" aria-modal="true" aria-label={t(common.quickAdd)} onClick={(event) => event.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="section-head">
          <h2>{t(module.title)}</h2>
          <button className="ghost-button compact" type="button" onClick={onClose}>{t(common.cancel)}</button>
        </div>
        <div className="sheet-action-list">
          {actions.map((item) => (
            <button className="sheet-action" type="button" onClick={item.action} key={t(item.label)}>
              <span className="module-icon">
                <item.icon size={17} aria-hidden="true" />
              </span>
              <span>
                <strong>{t(item.label)}</strong>
                <small>{t(item.detail)}</small>
              </span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function groupFields(fields: FieldDef[]) {
  return fields.reduce<{ category: Copy; fields: FieldDef[] }[]>((groups, fieldItem) => {
    const group = groups.find((item) => item.category === fieldItem.category);
    if (group) {
      group.fields.push(fieldItem);
    } else {
      groups.push({ category: fieldItem.category, fields: [fieldItem] });
    }
    return groups;
  }, []);
}

function BottomNav({
  t,
  active,
  onDashboard,
  openModule,
  onMore
}: {
  t: (value: Copy) => string;
  active: ModuleId | "dashboard" | "more";
  onDashboard: () => void;
  openModule: (moduleId: ModuleId, view?: View) => void;
  onMore: () => void;
}) {
  const items = [
    { key: "dashboard" as const, label: common.home, icon: Home, action: onDashboard },
    { key: "tasks" as const, label: modules.find((module) => module.id === "tasks")?.title ?? common.records, icon: ClipboardList, action: () => openModule("tasks") },
    { key: "voters" as const, label: modules.find((module) => module.id === "voters")?.title ?? common.records, icon: Vote, action: () => openModule("voters") },
    { key: "calendar" as const, label: modules.find((module) => module.id === "calendar")?.title ?? common.records, icon: CalendarDays, action: () => openModule("calendar") },
    { key: "more" as const, label: common.more, icon: Menu, action: onMore }
  ];

  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button className={active === item.key ? "is-active" : ""} type="button" onClick={item.action} key={item.key}>
          <item.icon size={17} aria-hidden="true" />
          <span>{t(item.label)}</span>
        </button>
      ))}
    </nav>
  );
}
