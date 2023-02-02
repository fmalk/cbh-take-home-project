# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Let's start a **Story** named *"ST-1: Include Custom ID to Agents"*. It's summary starts with the described work as it is:

"Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them."

This Story will have the following **Tasks** and respective descriptions:

- T-1: "Check prerequisites"
  - Verify with Facilities teams which kind of *custom ids* they plan to use for their Agents. Check with them if Strings of length 100 is sufficient.
  - Document here which solution was agreed. We're suggesting `varchar(100)`, unique to a Facility alone.
  - Estimate: 1 hour
- T-2: "New Secondary Key to Agents table"
  - Add a new column to Agents table named "CustomID". Use the type defined in T-1.
  - CustomID is nullable.
  - Add a new secondary unique index to the Agents table. It needs to use both the "FacilityID" and "CustomID" as its input. A Facility can't have duplicated CustomID.
  - Update database scheme file with the new key column
  - Run migration tests at Staging, check adding this new key doesn't affect current programs (as it shouldn't).
  - Estimate: 2 hours
- T-3: "Update getShiftsByFacility()"
  - Add "CustomID" to the available metadata of all Agents. It is an optional parameter.
  - Add unit testing to check for the optional CustomID
  - Submit as PR to codebase
  - Estimate: 1 hour
- T-4: "Verify generateReport()"
  - Check if `generateReport()` is able to handle the new CustomID.
  - Update as needed.
  - Add unit testing, making sure it supports presence or not of CustomID.
  - Submit as PR to codebase
  - Estimate: 1 hour
- T-5: "Update PDF Report using CustomID"
  - Add a new column to the report, showing CustomID of all Agents, if present.
  - This is an optional parameter, an Agent might or might not have one.
  - Get a preview of the change approved by the Facilities teams.
  - After approval, submit the PDF template change as PR to codebase
  - Estimate: 2 hours

After all these tasks are done, codebase should be ready for certification by Facilities team.
