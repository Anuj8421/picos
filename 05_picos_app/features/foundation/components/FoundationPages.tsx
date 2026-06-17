import { EvidenceDrawer } from "@/features/evidence/components/EvidenceDrawer";
import { PlatformShell } from "@/features/platform/PlatformShell";
import { ConfidenceBadge, VerificationBadge } from "@/features/shared/intelligenceBadges";
import { SourceAttachmentPanel } from "@/features/sources/components/SourceAttachmentPanel";
import { AssignedTaskList, CreateTaskButton } from "@/features/tasks/components/TaskComponents";
import { entityDisplayName, findEvidenceByIds, findEvidenceFor, findSources, findTasksFor } from "@/lib/domain/repositories";
import type { ReactNode } from "react";
import { getFoundationConfig } from "../foundation-config";
import type { FoundationConfig, FoundationField, FoundationRecord } from "../types";

const today = "2026-06-12";

type VoterFormTab = {
  id: string;
  label: string;
  title: string;
  summary: string;
  sections: Array<{
    title: string;
    layer?: "Manual Entry" | "Relationship Driven" | "Governance";
    fields?: FoundationField[];
    readOnlyType?: "engagement-timeline" | "related-visits" | "related-promises";
  }>;
};

const yesNoOptions = ["Yes", "No", "Unknown"];
const supportStatusOptions = ["Strong Supporter", "Soft Supporter", "Persuadable", "Neutral", "Undecided", "Opposition", "Unknown"];
const priorityOptions = ["Critical", "High", "Medium", "Low"];
const verificationOptions = ["unverified", "needs_verification", "partially_verified", "verified", "disputed", "stale"];
const approvalOptions = ["draft", "pending_review", "approved", "rejected", "changes_requested", "escalated"];

const voterField = (name: string, label: string, type: FoundationField["type"] = "text", required = false, options?: string[]): FoundationField => ({
  name,
  label,
  type,
  required,
  options
});

const voterFormTabs: VoterFormTab[] = [
  {
    id: "basic-profile",
    label: "Basic Profile",
    title: "Basic Profile",
    summary: "Identity, contact, geography, and polling location details for one voter.",
    sections: [
      {
        title: "Identity Information",
        fields: [
          voterField("voterId", "Voter ID", "text", true),
          voterField("voterName", "Voter Name", "text", true),
          voterField("firstName", "First Name"),
          voterField("middleName", "Middle Name"),
          voterField("lastName", "Last Name"),
          voterField("fatherName", "Father Name"),
          voterField("motherName", "Mother Name"),
          voterField("spouseName", "Spouse Name"),
          voterField("gender", "Gender", "select", false, ["Female", "Male", "Other", "Not recorded"]),
          voterField("age", "Age", "number"),
          voterField("dateOfBirth", "Date of Birth", "date"),
          voterField("maritalStatus", "Marital Status", "select", false, ["Single", "Married", "Widowed", "Separated", "Not recorded"]),
          voterField("photo", "Photo", "file")
        ]
      },
      {
        title: "Contact Information",
        fields: [
          voterField("mobileNumber", "Mobile Number"),
          voterField("alternateMobileNumber", "Alternate Mobile Number"),
          voterField("whatsappNumber", "WhatsApp Number"),
          voterField("email", "Email"),
          voterField("preferredContactMethod", "Preferred Contact Method", "select", false, ["Call", "WhatsApp", "SMS", "Visit", "Email", "Volunteer"]),
          voterField("preferredContactTime", "Preferred Contact Time", "time"),
          voterField("preferredLanguage", "Preferred Language", "select", false, ["Marathi", "Hindi", "English", "Other"])
        ]
      },
      {
        title: "Geography Information",
        fields: [
          voterField("constituency", "Constituency"),
          voterField("zone", "Zone"),
          voterField("sector", "Sector"),
          voterField("villageId", "Village", "select", true, ["Sinnar Town", "Dubere", "Devpur", "Wavi", "Musalgaon", "Pangri"]),
          voterField("ward", "Ward"),
          voterField("boothNumber", "Booth Number"),
          voterField("boothName", "Booth Name"),
          voterField("pollingStation", "Polling Station"),
          voterField("locality", "Locality"),
          voterField("wastiHamlet", "Wasti / Hamlet"),
          voterField("landmark", "Landmark"),
          voterField("gpsCoordinates", "GPS Coordinates")
        ]
      },
      {
        title: "Residential Address",
        fields: [
          voterField("houseNumber", "House / Flat Number"),
          voterField("houseName", "House / Building Name"),
          voterField("streetLane", "Street / Lane"),
          voterField("roadName", "Road Name"),
          voterField("areaName", "Area / Mohalla"),
          voterField("postOffice", "Post Office"),
          voterField("taluka", "Taluka"),
          voterField("district", "District"),
          voterField("state", "State"),
          voterField("pinCode", "PIN Code"),
          voterField("addressNotes", "Address Notes")
        ]
      }
    ]
  },
  {
    id: "household-demographics",
    label: "Household & Demographics",
    title: "Household & Demographics",
    summary: "Family, community, caste, occupation, and economic context that explains influence and persuasion path.",
    sections: [
      {
        title: "Household Information",
        fields: [
          voterField("householdId", "Household ID"),
          voterField("householdName", "Household Name"),
          voterField("familyHead", "Family Head"),
          voterField("familyHeadMobile", "Family Head Mobile"),
          voterField("familySize", "Family Size", "number"),
          voterField("totalEligibleVoters", "Total Eligible Voters", "number"),
          voterField("familyPoliticalLeaning", "Family Political Leaning", "select", false, supportStatusOptions),
          voterField("familyInfluenceScore", "Family Influence Score", "number"),
          voterField("primaryHouseholdInfluencer", "Primary Household Influencer"),
          voterField("householdEconomicStatus", "Household Economic Status", "select", false, ["Low income", "Lower middle", "Middle", "Upper middle", "Affluent", "Not recorded"])
        ]
      },
      {
        title: "Community Information",
        fields: [
          voterField("caste", "Caste"),
          voterField("subCaste", "Sub-Caste"),
          voterField("communityIds", "Community", "select", false, ["Maratha", "OBC", "SC", "ST", "Muslim", "Women", "Youth", "Farmer", "Business"]),
          voterField("religion", "Religion"),
          voterField("reservationCategory", "Reservation Category", "select", false, ["General", "OBC", "SC", "ST", "NT", "VJ", "SBC", "Not recorded"]),
          voterField("minorityStatus", "Minority Status", "select", false, yesNoOptions),
          voterField("languageGroup", "Language Group"),
          voterField("farmerCategory", "Farmer Category", "select", false, ["Marginal", "Small", "Medium", "Large", "Landless", "Not applicable"]),
          voterField("shgMembership", "SHG Membership", "select", false, yesNoOptions),
          voterField("cooperativeMembership", "Cooperative Membership", "select", false, yesNoOptions)
        ]
      },
      {
        title: "Occupation & Economic Information",
        fields: [
          voterField("occupation", "Occupation"),
          voterField("employer", "Employer"),
          voterField("industry", "Industry"),
          voterField("employmentType", "Employment Type", "select", false, ["Self-employed", "Salaried", "Daily wage", "Agriculture", "Business", "Student", "Retired", "Unemployed"]),
          voterField("farmer", "Farmer", "select", false, yesNoOptions),
          voterField("landHoldingSize", "Land Holding Size"),
          voterField("cropType", "Crop Type"),
          voterField("businessOwner", "Business Owner", "select", false, yesNoOptions),
          voterField("governmentEmployee", "Government Employee", "select", false, yesNoOptions),
          voterField("privateEmployee", "Private Employee", "select", false, yesNoOptions),
          voterField("student", "Student", "select", false, yesNoOptions),
          voterField("retired", "Retired", "select", false, yesNoOptions),
          voterField("unemployed", "Unemployed", "select", false, yesNoOptions),
          voterField("incomeBand", "Income Band", "select", false, ["Below 1L", "1L-3L", "3L-6L", "6L-10L", "10L+", "Not recorded"])
        ]
      }
    ]
  },
  {
    id: "political-intelligence",
    label: "Political Intelligence",
    title: "Political Intelligence",
    summary: "Manual political observations only. Scores and trends are generated from visits, conversations, sentiment, and follow-ups.",
    sections: [
      {
        title: "Political Profile",
        layer: "Manual Entry",
        fields: [
          voterField("politicalAlignment", "Political Alignment"),
          voterField("preferredParty", "Preferred Party"),
          voterField("preferredCandidate", "Preferred Candidate"),
          voterField("supportStatus", "Support Status", "select", false, supportStatusOptions),
          voterField("swingVoterStatus", "Swing Voter Status", "select", false, yesNoOptions),
          voterField("neutralStatus", "Neutral Status", "select", false, yesNoOptions),
          voterField("persuadableStatus", "Persuadable Status", "select", false, yesNoOptions),
          voterField("oppositionSupporter", "Opposition Supporter", "select", false, yesNoOptions),
          voterField("antiIncumbent", "Anti-Incumbent", "select", false, yesNoOptions),
          voterField("proIncumbent", "Pro-Incumbent", "select", false, yesNoOptions),
          voterField("undecidedStatus", "Undecided Status", "select", false, yesNoOptions)
        ]
      },
      {
        title: "Turnout Intelligence",
        layer: "Manual Entry",
        fields: [
          voterField("votedLastElection", "Voted Last Election", "select", false, yesNoOptions),
          voterField("firstTimeVoter", "First Time Voter", "select", false, yesNoOptions),
          voterField("needsTransport", "Needs Transport", "select", false, yesNoOptions)
        ]
      },
      {
        title: "Persuasion Intelligence",
        layer: "Manual Entry",
        fields: [
          voterField("mainObjection", "Main Objection", "textarea"),
          voterField("mainMotivation", "Main Motivation", "textarea")
        ]
      }
    ]
  },
  {
    id: "issues-influence-relationships",
    label: "Issues & Influence",
    title: "Issues, Influence & Relationships",
    summary: "Issues raised, influencer network, relationship owner, trust level, and contact history.",
    sections: [
      {
        title: "Issue Intelligence",
        layer: "Manual Entry",
        fields: [
          voterField("primaryIssue", "Primary Issue"),
          voterField("secondaryIssue", "Secondary Issue"),
          voterField("thirdIssue", "Third Issue"),
          voterField("waterConcern", "Water Concern", "select", false, yesNoOptions),
          voterField("roadConcern", "Road Concern", "select", false, yesNoOptions),
          voterField("employmentConcern", "Employment Concern", "select", false, yesNoOptions),
          voterField("agricultureConcern", "Agriculture Concern", "select", false, yesNoOptions),
          voterField("healthcareConcern", "Healthcare Concern", "select", false, yesNoOptions),
          voterField("educationConcern", "Education Concern", "select", false, yesNoOptions),
          voterField("electricityConcern", "Electricity Concern", "select", false, yesNoOptions),
          voterField("housingConcern", "Housing Concern", "select", false, yesNoOptions),
          voterField("governmentSchemeConcern", "Government Scheme Concern", "select", false, yesNoOptions),
          voterField("issueSeverity", "Issue Severity", "select", false, priorityOptions),
          voterField("issueResolutionStatus", "Issue Resolution Status", "select", false, ["New", "Assigned", "In Progress", "Resolved", "Rejected", "Escalated"])
        ]
      },
      {
        title: "Influencer Intelligence",
        layer: "Relationship Driven",
        fields: [
          voterField("influencerName", "Influencer"),
          voterField("influencerType", "Influencer Type")
        ]
      },
      {
        title: "Ownership Section",
        layer: "Relationship Driven",
        fields: [
          voterField("relationshipOwnerId", "Relationship Owner"),
          voterField("assignedVolunteer", "Assigned Volunteer"),
          voterField("assignedCoordinator", "Assigned Coordinator"),
          voterField("assignedTeam", "Assigned Team")
        ]
      },
      {
        title: "Relationship Notes",
        layer: "Manual Entry",
        fields: [
          voterField("lastContactDate", "Last Contact Date", "date"),
          voterField("lastContactType", "Last Contact Type", "select", false, ["Visit", "Call", "WhatsApp", "Meeting", "Event", "No contact"]),
          voterField("lastContactOutcome", "Last Contact Outcome", "textarea"),
          voterField("lastVisitDate", "Last Visit Date", "date")
        ]
      },
      {
        title: "Risk / Complaint Notes",
        layer: "Manual Entry",
        fields: [
          voterField("complaintHistory", "Complaint History", "textarea"),
          voterField("escalationStatus", "Escalation Status", "select", false, ["None", "Watching", "Escalated", "Resolved"])
        ]
      }
    ]
  },
  {
    id: "field-operations",
    label: "Field Operations",
    title: "Field Operations",
    summary: "Operational links and next action capture. Visits, promises, and engagement history come from linked records.",
    sections: [
      {
        title: "Engagement Timeline",
        layer: "Relationship Driven",
        readOnlyType: "engagement-timeline"
      },
      {
        title: "Related Visits",
        layer: "Relationship Driven",
        readOnlyType: "related-visits"
      },
      {
        title: "Related Promises",
        layer: "Relationship Driven",
        readOnlyType: "related-promises"
      },
      {
        title: "Campaign Operations",
        layer: "Manual Entry",
        fields: [
          voterField("priorityLevel", "Priority Level", "select", false, priorityOptions),
          voterField("actionRequired", "Action Required", "textarea"),
          voterField("nextAction", "Next Action", "textarea"),
          voterField("nextActionDueDate", "Next Action Due Date", "date"),
          voterField("status", "Status", "select", false, ["New", "Active", "In Progress", "Waiting", "Completed", "Archived"]),
          voterField("notes", "Notes", "textarea")
        ]
      }
    ]
  },
  {
    id: "governance-audit",
    label: "Governance & Audit",
    title: "Governance & Audit",
    summary: "Sources, evidence, verification, approval, audit timeline, and change history for trustable intelligence.",
    sections: [
      {
        title: "Sources",
        layer: "Governance",
        fields: [
          voterField("sourceId", "Source ID", "text", true),
          voterField("sourceType", "Source Type", "select", false, ["Field report", "Electoral roll", "Booth data", "Volunteer note", "Canvassing record", "Public record", "Campaign import", "Internal note"]),
          voterField("sourceAttachments", "Source Attachments", "file")
        ]
      },
      {
        title: "Evidence",
        layer: "Governance",
        fields: [
          voterField("evidenceAttached", "Evidence Attached", "select", false, yesNoOptions),
          voterField("evidenceAttachments", "Evidence Attachments", "file")
        ]
      },
      {
        title: "Verification",
        layer: "Governance",
        fields: [
          voterField("verificationStatus", "Verification Status", "select", true, verificationOptions),
          voterField("confidenceScore", "Confidence Score", "number", true)
        ]
      },
      {
        title: "Approval",
        layer: "Governance",
        fields: [
          voterField("approvalStatus", "Approval Status", "select", true, approvalOptions),
          voterField("approvedBy", "Approved By")
        ]
      },
      {
        title: "Audit Timeline",
        layer: "Governance",
        fields: [
          voterField("createdBy", "Created By"),
          voterField("updatedBy", "Updated By"),
          voterField("createdDate", "Created Date", "date"),
          voterField("updatedDate", "Updated Date", "date"),
          voterField("auditLogReference", "Audit Log Reference"),
          voterField("timeline", "Timeline", "textarea"),
          voterField("changeHistory", "Change History", "textarea"),
          voterField("approvalHistory", "Approval History", "textarea")
        ]
      }
    ]
  }
];

export function FoundationRoutePage({ configKey, parts }: { configKey: string; parts?: string[] }) {
  const config = getFoundationConfig(configKey);
  const pathParts = parts ?? [];

  if (pathParts.length === 0) return <FoundationListPage config={config} />;
  if (pathParts[0] === "new" && config.supportsCreate !== false) return <FoundationFormPage config={config} mode="new" />;
  if (pathParts[0] === "history" && config.supportsHistory) return <FoundationHistoryPage config={config} />;
  if (pathParts[0] === "overdue" && config.supportsOverdue) return <FoundationListPage config={config} variant="overdue" />;
  if (pathParts.length === 2 && pathParts[1] === "edit" && config.supportsEdit !== false) {
    return <FoundationFormPage config={config} id={pathParts[0]} mode="edit" />;
  }
  if (pathParts.length === 2 && pathParts[1] === "review" && config.supportsReview) {
    return <FoundationReviewPage config={config} id={pathParts[0]} />;
  }
  if (pathParts.length === 1) return <FoundationDetailPage config={config} id={pathParts[0]} />;

  return <FoundationListPage config={config} />;
}

function FoundationListPage({ config, variant }: { config: FoundationConfig; variant?: "overdue" }) {
  const records = variant === "overdue" ? overdueRecords(config.records) : config.records;
  const pendingVerification = records.filter((record) => record.verificationStatus !== "verified").length;
  const pendingApproval = records.filter((record) => !["approved", "fulfilled", "completed"].includes(record.approvalStatus)).length;
  const evidenceLinked = records.filter((record) => record.evidenceIds.length > 0).length;

  return (
    <FoundationShell config={config}>
      <FoundationHeader config={config} mode={variant === "overdue" ? "Overdue" : "Dashboard"} />
      <main className="foundation-workspace">
        <section className="overview-bar foundation-overview-bar">
          <Metric label="Total records" value={records.length} detail={config.title} />
          <Metric label="Pending verification" value={pendingVerification} detail="Needs quality review" tone="watch" />
          <Metric label="Pending approval" value={pendingApproval} detail="Decision gate open" tone="watch" />
          <Metric label="Evidence linked" value={evidenceLinked} detail="Proof attached" tone="positive" />
          <Metric label="Task-ready" value={records.length} detail="Every row can create tasks" tone="neutral" />
        </section>

        <section className="foundation-filter-rail">
          <label>
            <span>Entity type</span>
            <select defaultValue="">
              <option value="">All</option>
              {[...new Set(records.map((record) => record.relatedEntityType).filter(Boolean))].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select defaultValue="">
              <option value="">All</option>
              {[...new Set(records.map((record) => record.status).filter(Boolean))].map((item) => <option key={item}>{formatLabel(item)}</option>)}
            </select>
          </label>
          <label>
            <span>Verification</span>
            <select defaultValue="">
              <option value="">All</option>
              {[...new Set(records.map((record) => record.verificationStatus))].map((item) => <option key={item}>{formatLabel(item)}</option>)}
            </select>
          </label>
          <label>
            <span>Approval</span>
            <select defaultValue="">
              <option value="">All</option>
              {[...new Set(records.map((record) => record.approvalStatus))].map((item) => <option key={item}>{formatLabel(item)}</option>)}
            </select>
          </label>
          <label>
            <span>Date range</span>
            <select defaultValue="30">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="custom">Custom</option>
            </select>
          </label>
        </section>

        <section className="manager-list-toolbar">
          <div>
            <span className="eyebrow">{config.eyebrow}</span>
            <h2>{variant === "overdue" ? "Overdue view" : `${records.length} records`}</h2>
          </div>
          <div className="manager-toolbar-actions">
            {config.supportsCreate !== false ? <a className="action-btn" href={`${config.basePath}/new`}>Create new</a> : null}
            {config.supportsOverdue ? <a className="action-btn" href={`${config.basePath}/overdue`}>Overdue</a> : null}
            {config.supportsHistory ? <a className="action-btn" href={`${config.basePath}/history`}>History</a> : null}
            <a className="action-btn" href="/sources/new">Attach source</a>
            <a className="action-btn" href="/evidence/new">Attach evidence</a>
          </div>
        </section>

        <section className="manager-table-panel">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Record</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Related Entity</th>
                  <th>Verification</th>
                  <th>Approval</th>
                  <th>Confidence</th>
                  <th>Sources</th>
                  <th>Evidence</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <strong>{record.title}</strong>
                      <p className="table-description">{record.description}</p>
                    </td>
                    <td><StatusChip value={record.status} priority={record.priority} /></td>
                    <td>{record.ownerId || "Unassigned"}</td>
                    <td>{entityDisplayName(record.relatedEntityType, record.relatedEntityId)}</td>
                    <td><VerificationBadge status={record.verificationStatus} /></td>
                    <td><StatusChip value={record.approvalStatus} /></td>
                    <td><ConfidenceBadge score={record.confidenceScore} /></td>
                    <td>{record.sourceIds.length}</td>
                    <td>{record.evidenceIds.length}</td>
                    <td>{record.updatedAt.slice(0, 10)}</td>
                    <td>
                      <div className="row-actions">
                        <a href={`${config.basePath}/${record.id}`}>View</a>
                        {config.supportsEdit !== false ? <a href={`${config.basePath}/${record.id}/edit`}>Edit</a> : null}
                        {config.supportsReview ? <a href={`${config.basePath}/${record.id}/review`}>Review</a> : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </FoundationShell>
  );
}

function FoundationDetailPage({ config, id }: { config: FoundationConfig; id: string }) {
  const record = getRecord(config, id);
  const sources = findSources(record.sourceIds);
  const evidence = evidenceForRecord(config, record);

  return (
    <FoundationShell config={config}>
      <FoundationHeader config={config} mode="Detail" record={record} />
      <main className="manager-detail-layout">
        <section className="manager-detail-main">
          <section className="claim-card">
            <div className="section-header">
              <div>
                <span className="eyebrow">{config.eyebrow}</span>
                <h2>{record.title}</h2>
              </div>
              <div className="badge-row">
                <VerificationBadge status={record.verificationStatus} />
                <ConfidenceBadge score={record.confidenceScore} />
              </div>
            </div>
            <p>{record.description}</p>
          </section>

          <section className="manager-record-grid">
            {config.fields.map((field) => (
              <FieldCard key={field.name} label={field.label} value={record.values[field.name]} />
            ))}
          </section>

          <section className="workspace-grid two-column">
            <SourceAttachmentPanel sources={sources} />
            <EvidenceDrawer evidence={evidence} sources={sources} />
          </section>

          <section className="manager-actions-panel">
            <h2>Actions</h2>
            <div className="manager-action-grid">
              {config.actions.map((action) => <a href={routeForAction(action, config, record)} key={action}>{action}</a>)}
            </div>
          </section>

          <section className="audit-placeholder">
            <h3>Audit trail placeholder</h3>
            <p>Created by {record.createdBy} and last updated by {record.updatedBy} on {record.updatedAt.slice(0, 10)}. Full event-level audit history will appear after persistence is connected.</p>
          </section>
        </section>

      </main>
    </FoundationShell>
  );
}

function FoundationFormPage({ config, id, mode }: { config: FoundationConfig; id?: string; mode: "new" | "edit" }) {
  if (config.key === "voters") {
    return <FoundationVoterFormPage config={config} id={id} mode={mode} />;
  }

  const record = id ? getRecord(config, id) : undefined;
  const sources = findSources(record?.sourceIds ?? []);
  const evidence = record ? evidenceForRecord(config, record) : [];
  const tasks = record ? findTasksFor(config.entityType, record.id) : [];

  return (
    <FoundationShell config={config}>
      <FoundationPageNav config={config} mode={mode} record={record} />
      <main className="manager-form-layout foundation-form-layout">
        <form className="manager-form" action={config.basePath}>
          <FoundationFormActions config={config} record={record} />

          <section className="form-section" id="core-fields">
            <div className="section-header">
              <div>
                <span className="eyebrow">Full-page manual input</span>
                <h2>{mode === "new" ? `Create ${config.title}` : `Edit ${record?.title ?? config.title}`}</h2>
              </div>
            </div>
            <div className="form-grid">
              {config.fields.map((field) => <FoundationInput field={field} value={record?.values[field.name]} key={field.name} />)}
            </div>
          </section>

          <section className="form-section" id="source-evidence">
            <SourceAttachmentPanel sources={sources} />
            <EvidenceDrawer evidence={evidence} sources={sources} />
          </section>

          <section className="form-section" id="verification">
            <div className="verification-form-grid">
              <label>
                <span>Verification status</span>
                <select defaultValue={record?.verificationStatus ?? "needs_verification"} required>
                  <option value="unverified">unverified</option>
                  <option value="needs_verification">needs_verification</option>
                  <option value="partially_verified">partially_verified</option>
                  <option value="verified">verified</option>
                  <option value="disputed">disputed</option>
                  <option value="stale">stale</option>
                </select>
              </label>
              <label>
                <span>Confidence score</span>
                <input defaultValue={record?.confidenceScore ?? 50} max={100} min={0} type="number" required />
              </label>
              <label>
                <span>Approval status</span>
                <select defaultValue={record?.approvalStatus ?? "draft"} required>
                  <option value="draft">draft</option>
                  <option value="pending_review">pending_review</option>
                  <option value="approved">approved</option>
                  <option value="rejected">rejected</option>
                  <option value="changes_requested">changes_requested</option>
                </select>
              </label>
              <label className="full-span">
                <span>Next verification step</span>
                <textarea defaultValue="Attach source, evidence, owner, related entity, confidence score, and approval status before operational use." />
              </label>
            </div>
          </section>

          <section className="form-section" id="related-records">
            <AssignedTaskList tasks={tasks} />
            <CreateTaskButton relatedEntityType={config.entityType} relatedEntityId={record?.id ?? "new-record"} />
          </section>

          <section className="form-section" id="audit-trail">
            <div className="audit-placeholder">
              <h3>Audit trail placeholder</h3>
              <p>{record ? `Last updated by ${record.updatedBy} at ${record.updatedAt}.` : "Audit trail starts when this record is saved."}</p>
              {mode === "edit" ? (
                <label>
                  <span>Change reason</span>
                  <textarea defaultValue="Update record fields, source/evidence, owner, verification, approval, or next action." />
                </label>
              ) : null}
            </div>
          </section>
        </form>

      </main>
    </FoundationShell>
  );
}

function FoundationVoterFormPage({ config, id, mode }: { config: FoundationConfig; id?: string; mode: "new" | "edit" }) {
  const record = id ? getRecord(config, id) : undefined;
  const sources = findSources(record?.sourceIds ?? []);
  const evidence = record ? evidenceForRecord(config, record) : [];

  return (
    <FoundationShell config={config}>
      <FoundationPageNav config={config} mode={mode} record={record} title={mode === "new" ? "Create Complete Voter Record" : `Edit ${record?.title ?? "Voter Record"}`} />
      <main className="manager-form-layout foundation-form-layout voter-form-layout">
        <form className="manager-form voter-intelligence-form" action={config.basePath}>
          <FoundationFormActions config={config} record={record} />

          <section className="voter-tab-card" aria-label="Voter intelligence tabs">
            {voterFormTabs.map((tab, index) => (
              <input
                className="voter-tab-input"
                defaultChecked={index === 0}
                id={`voter-tab-${tab.id}`}
                key={`input-${tab.id}`}
                name="voter-intelligence-tabs"
                type="radio"
              />
            ))}

            <div className="voter-tab-list" role="tablist" aria-label="Voter form sections">
              {voterFormTabs.map((tab, index) => (
                <label htmlFor={`voter-tab-${tab.id}`} key={tab.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {tab.label}
                </label>
              ))}
            </div>

            <div className="voter-tab-panels">
              {voterFormTabs.map((tab) => (
                <section className={`voter-tab-panel voter-panel-${tab.id}`} key={tab.id}>
                  <div className="section-header">
                    <div>
                      <span className="eyebrow">{tab.label}</span>
                      <h2>{tab.title}</h2>
                      <p>{tab.summary}</p>
                    </div>
                  </div>

                  <div className="voter-form-sections">
                    {tab.sections.map((section) => (
                      <section className="form-section voter-field-section" key={`${tab.id}-${section.title}`}>
                        <div className="section-header compact-header">
                          <div>
                            <span className="eyebrow">{section.layer ?? "Manual Entry"}</span>
                            <h3>{section.title}</h3>
                          </div>
                        </div>
                        {section.readOnlyType ? (
                          <VoterReadOnlySection type={section.readOnlyType} />
                        ) : (
                          <div className="form-grid voter-field-grid">
                            {(section.fields ?? []).map((field) => (
                              <FoundationInput field={field} value={voterFieldValue(record, field.name)} key={field.name} />
                            ))}
                          </div>
                        )}
                      </section>
                    ))}

                    {tab.id === "governance-audit" ? (
                      <section className="voter-governance-proof-grid">
                        <SourceAttachmentPanel sources={sources} />
                        <EvidenceDrawer evidence={evidence} sources={sources} />
                      </section>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </form>
      </main>
    </FoundationShell>
  );
}

function VoterReadOnlySection({ type }: { type: "engagement-timeline" | "related-visits" | "related-promises" }) {
  const table =
    type === "related-visits"
      ? {
          empty: "Visit intelligence is generated from linked Visit Records.",
          headers: ["Visit Date", "Visitor", "Summary", "Impact", "Open Visit"],
          rows: [
            ["No linked visit", "Assigned visitor", "Save the voter, then link visits from Visit Manager.", "Pending", "Open"]
          ]
        }
      : type === "related-promises"
        ? {
            empty: "Promise tracking is generated from linked Promise Records.",
            headers: ["Promise", "Owner", "Status", "Due Date", "Open Promise"],
            rows: [
              ["No linked promise", "Ownership section", "Pending link", "Not set", "Open"]
            ]
          }
        : {
            empty: "Engagement history is generated from visits, events, rallies, meetings, and attendance records.",
            headers: ["Date", "Type", "Record", "Impact", "Open"],
            rows: [
              ["No linked activity", "Attendance", "Link event, visit, or meeting records after save.", "Pending", "Open"]
            ]
          };

  return (
    <div className="voter-readonly-block">
      <p>{table.empty}</p>
      <div className="table-scroll">
        <table className="voter-readonly-table">
          <thead>
            <tr>
              {table.headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell, index) => (
                  <td key={`${cell}-${index}`}>
                    {index === row.length - 1 ? <a href={type === "related-promises" ? "/promises" : type === "related-visits" ? "/visits" : "/events"}>{cell}</a> : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FoundationReviewPage({ config, id }: { config: FoundationConfig; id: string }) {
  const record = getRecord(config, id);
  const sources = findSources(record.sourceIds);
  const evidence = evidenceForRecord(config, record);

  return (
    <FoundationShell config={config}>
      <FoundationHeader config={config} mode="Review" record={record} />
      <main className="manager-detail-layout">
        <section className="manager-detail-main">
          <section className="claim-card">
            <div className="section-header">
              <div>
                <span className="eyebrow">Review queue</span>
                <h2>{record.title}</h2>
              </div>
              <div className="badge-row">
                <VerificationBadge status={record.verificationStatus} />
                <ConfidenceBadge score={record.confidenceScore} />
              </div>
            </div>
            <p>{record.description}</p>
          </section>

          <section className="foundation-review-grid">
            <DecisionCard title="Source check" value={record.sourceIds.length ? "Linked" : "Missing"} detail={`${record.sourceIds.length} source record(s)`} />
            <DecisionCard title="Evidence check" value={record.evidenceIds.length ? "Linked" : "Missing"} detail={`${record.evidenceIds.length} evidence item(s)`} />
            <DecisionCard title="Confidence" value={`${record.confidenceScore}%`} detail="Score before queue decision" />
            <DecisionCard title="Approval" value={formatLabel(record.approvalStatus)} detail="Current decision state" />
          </section>

          <section className="manager-actions-panel">
            <h2>Queue Actions</h2>
            <div className="manager-action-grid">
              {config.actions.map((action) => <a href={routeForAction(action, config, record)} key={action}>{action}</a>)}
            </div>
          </section>
        </section>
      </main>
    </FoundationShell>
  );
}

function FoundationHistoryPage({ config }: { config: FoundationConfig }) {
  return (
    <FoundationShell config={config}>
      <FoundationHeader config={config} mode="History" />
      <main className="foundation-workspace">
        <section className="panel">
          <div className="section-header">
            <div>
              <span className="eyebrow">Import history</span>
              <h2>Bulk Import Ledger</h2>
            </div>
            <a className="action-btn" href={`${config.basePath}/new`}>New import</a>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Import</th>
                  <th>Entity</th>
                  <th>Rows</th>
                  <th>Invalid</th>
                  <th>Duplicates</th>
                  <th>Status</th>
                  <th>Approval</th>
                  <th>Rollback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {config.records.map((record) => (
                  <tr key={record.id}>
                    <td><strong>{record.title}</strong><p className="table-description">{record.description}</p></td>
                    <td>{record.values.entityType}</td>
                    <td>{record.values.totalRows}</td>
                    <td>{record.values.invalidRows}</td>
                    <td>{record.values.duplicateRows}</td>
                    <td><StatusChip value={record.status} /></td>
                    <td><StatusChip value={record.approvalStatus} /></td>
                    <td>{record.values.rollbackAvailable ? "Available" : "Locked"}</td>
                    <td><div className="row-actions"><a href={`${config.basePath}/${record.id}`}>View</a><a href={`${config.basePath}/${record.id}/review`}>Review</a></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </FoundationShell>
  );
}

function FoundationShell({ config, children }: { config: FoundationConfig; children: ReactNode }) {
  return (
    <PlatformShell activeCoreModule="voter-intelligence" activeModuleSection={config.activeModuleSection ?? "field-operations"}>
      {children}
    </PlatformShell>
  );
}

function FoundationHeader({ config, mode, record }: { config: FoundationConfig; mode: string; record?: FoundationRecord }) {
  return (
    <header className="candidate-header manager-header">
      <div>
        <span className="eyebrow">{config.eyebrow} / {mode}</span>
        <h1>{record ? record.title : config.title}</h1>
        <p>{config.description}</p>
      </div>
      <div className="manager-header-actions">
        <a className="action-btn" href={config.basePath}>Dashboard</a>
        {config.supportsCreate !== false ? <a className="action-btn" href={`${config.basePath}/new`}>New</a> : null}
        {config.supportsOverdue ? <a className="action-btn" href={`${config.basePath}/overdue`}>Overdue</a> : null}
        {config.supportsHistory ? <a className="action-btn" href={`${config.basePath}/history`}>History</a> : null}
      </div>
    </header>
  );
}

function FoundationPageNav({ config, mode, record, title }: { config: FoundationConfig; mode: "new" | "edit"; record?: FoundationRecord; title?: string }) {
  const modeLabel = mode === "new" ? "Create" : "Edit";
  const pageTitle = title ?? (mode === "new" ? `Create ${config.title}` : `Edit ${record?.title ?? config.title}`);

  return (
    <nav className="foundation-page-nav" aria-label="Page navigation">
      <a className="foundation-back-link" href={config.basePath}>Back</a>
      <div className="foundation-breadcrumbs" aria-label="Breadcrumbs">
        <a href="/">PICOS</a>
        <span>/</span>
        <a href="/voter-intelligence">Voter Intelligence</a>
        <span>/</span>
        <a href={config.basePath}>{config.title}</a>
        <span>/</span>
        <strong>{modeLabel}</strong>
      </div>
      <div className="foundation-page-nav-title">
        <span className="eyebrow">{config.eyebrow} / {modeLabel}</span>
        <h1>{pageTitle}</h1>
      </div>
    </nav>
  );
}

function FoundationFormActions({ config, record }: { config: FoundationConfig; record?: FoundationRecord }) {
  const relatedEntityId = record?.id ?? "new-record";

  return (
    <section className="form-actions foundation-form-actions" id="form-actions" aria-label="Form actions">
      <button type="submit">Save draft</button>
      <button type="submit">Submit for verification</button>
      <button type="submit">Submit for approval</button>
      <a href="/sources/new">Link source</a>
      <a href="/evidence/new">Attach evidence</a>
      <a href={`/tasks/new?relatedEntityType=${config.entityType}&relatedEntityId=${relatedEntityId}`}>Create task</a>
      <a href={config.basePath}>Cancel</a>
    </section>
  );
}

function voterFieldValue(record: FoundationRecord | undefined, fieldName: string) {
  if (!record) return "";
  const value = record.values[fieldName];
  if (value !== undefined) return value;

  switch (fieldName) {
    case "sourceId":
      return record.sourceIds[0] ?? "";
    case "evidenceAttached":
      return record.evidenceIds.length ? "Yes" : "No";
    case "verificationStatus":
      return record.verificationStatus;
    case "confidenceScore":
      return record.confidenceScore;
    case "approvalStatus":
      return record.approvalStatus;
    case "createdBy":
      return record.createdBy;
    case "updatedBy":
      return record.updatedBy;
    case "createdDate":
      return record.createdAt.slice(0, 10);
    case "updatedDate":
      return record.updatedAt.slice(0, 10);
    case "auditLogReference":
      return `${record.relatedEntityType || "voter_record"}:${record.id}`;
    case "timeline":
      return record.notes;
    default:
      return "";
  }
}

function FoundationInput({ field, value }: { field: FoundationField; value: unknown }) {
  const defaultValue = typeof value === "string" || typeof value === "number" ? value : Array.isArray(value) ? value.join(", ") : "";
  const numberRange = boundedNumberField(field) ? { max: 100, min: 0 } : field.type === "number" ? { min: 0 } : {};
  return (
    <label className={field.type === "textarea" ? "full-span" : ""}>
      <span>{field.label}{field.required ? " *" : ""}</span>
      {field.type === "textarea" ? (
        <textarea defaultValue={String(defaultValue)} name={field.name} required={field.required} />
      ) : field.type === "select" ? (
        <select defaultValue={String(defaultValue)} name={field.name} required={field.required}>
          <option value="">Select</option>
          {(field.options ?? []).map((option) => <option value={option} key={option}>{formatLabel(option)}</option>)}
        </select>
      ) : field.type === "checkbox" ? (
        <input defaultChecked={Boolean(value)} name={field.name} required={field.required} type="checkbox" />
      ) : field.type === "file" ? (
        <input multiple={field.name.toLowerCase().includes("attachments")} name={field.name} required={field.required} type="file" />
      ) : (
        <input defaultValue={defaultValue} name={field.name} required={field.required} type={field.type} {...numberRange} />
      )}
    </label>
  );
}

function boundedNumberField(field: FoundationField) {
  if (field.type !== "number") return false;
  const text = `${field.name} ${field.label}`.toLowerCase();
  return ["score", "probability", "risk", "confidence", "strength", "influence", "impact", "readiness", "sentiment"].some((token) => text.includes(token));
}

function Metric({ label, value, detail, tone = "neutral" }: { label: string; value: string | number; detail: string; tone?: "neutral" | "positive" | "watch" | "critical" }) {
  const toneClass = tone === "critical" ? "tone-critical" : tone === "positive" ? "tone-positive" : tone === "watch" ? "tone-watch" : "tone-neutral";
  return (
    <article className={`metric-cell compact ${toneClass}`}>
      <span className="metric-label">{label}</span>
      <div className="metric-value-row"><strong>{value}</strong></div>
      <p>{detail}</p>
    </article>
  );
}

function FieldCard({ label, value }: { label: string; value: unknown }) {
  return (
    <article className="manager-field-card">
      <span>{label}</span>
      <strong>{prettyValue(value)}</strong>
    </article>
  );
}

function DecisionCard({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <article className="manager-field-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{detail}</p>
    </article>
  );
}

function StatusChip({ value, priority }: { value: string; priority?: string }) {
  const classValue = (priority ?? value).replaceAll("_", "-");
  return <span className={`table-status status-${classValue}`}>{formatLabel(value)}</span>;
}

function getRecord(config: FoundationConfig, id: string) {
  return config.records.find((record) => record.id === id) ?? config.records[0];
}

function evidenceForRecord(config: FoundationConfig, record: FoundationRecord) {
  const direct = findEvidenceByIds(record.evidenceIds);
  const linked = findEvidenceFor(config.entityType, record.id);
  const all = [...direct, ...linked];
  return all.filter((item, index) => all.findIndex((candidate) => candidate.id === item.id) === index);
}

function overdueRecords(records: FoundationRecord[]) {
  return records.filter((record) => {
    const dueDate = typeof record.values.dueDate === "string" ? record.values.dueDate : "";
    return ["overdue", "escalated", "waiting"].includes(record.status) || (dueDate !== "" && dueDate <= today && !["completed", "fulfilled", "approved"].includes(record.status));
  });
}

function routeForAction(action: string, config: FoundationConfig, record: FoundationRecord) {
  const lower = action.toLowerCase();
  if (lower.includes("task")) return `/tasks/new?relatedEntityType=${config.entityType}&relatedEntityId=${record.id}`;
  if (lower.includes("evidence")) return "/evidence/new";
  if (lower.includes("source")) return "/sources/new";
  if (lower.includes("follow-up")) return `/follow-ups/new?from=${record.id}`;
  if (lower.includes("promise")) return `/promises/new?from=${record.id}`;
  if (lower.includes("visit") || lower.includes("schedule")) return `/visits/new?from=${record.id}`;
  if (lower.includes("issue")) return `/issues/new?from=${record.id}`;
  if (lower.includes("risk")) return `/risks/new?from=${record.id}`;
  if (lower.includes("opportunity")) return `/opportunities/new?from=${record.id}`;
  if (lower.includes("relationship")) return `/relationships/new?from=${record.id}`;
  if (lower.includes("record") || lower.includes("open")) return record.values.relatedRecordUrl ? String(record.values.relatedRecordUrl) : `${config.basePath}/${record.id}`;
  return config.supportsEdit === false ? `${config.basePath}/${record.id}` : `${config.basePath}/${record.id}/edit`;
}

function prettyValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value == null || value === "") return "Not recorded";
  return String(value);
}

function formatLabel(value: string) {
  return value.replaceAll("_", " ");
}
