# Uday Sangle Phase 1 Mobile App

Standalone Phase 1 mobile campaign operations app.

This app is intentionally separate from `05_picos_app` and does not touch the existing PICOS software.

## Stack

This is a standalone Next.js + React + TypeScript app, matching the active PICOS software stack while staying separate from `05_picos_app`.

## Open

Run `npm run dev` and open the local URL printed by Next.js.

## Scope

Phase 1 screens:

- Login
- Dashboard
- Profile
- Settings
- Notifications
- Tasks
- User Management
- Calendar
- Voters
- Daily Schedule
- Meetings
- Complaints
- Issues
- Events
- Schemes
- Visitors

Every screen uses English, Hindi, and Marathi copy. Data entry fields for voters, daily schedule, meetings, complaints, issues, events, schemes, and visitors are based on the provided Excel workbook headers. The voters schema adds Voter ID / EPIC No. and separates address data into house, building, street, area, landmark, village, taluka, district, PIN code, ward, and booth fields. Select fields use a custom in-app control instead of the browser's native dropdown UI.

## Privacy

The Excel files were used for schema/attribute extraction only. No private voter or visitor rows are stored in this app.
