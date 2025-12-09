---
sidebar_position: 3
---

# Approval Processes

It’s likely that you’re familiar with process automation in the form of workflow rules. Approval processes take automation one step further, letting you specify a sequence of steps that are required to approve a record.

An approval process automates how records are approved in Steedos. An approval process specifies each step of approval, including from whom to request approval and what to do at each point of the process.

:::tip EXAMPLE
Your org has a three-tier process for approving expenses. This approval process automatically assigns each request to right person in your org, based on the amount requested.

If an expense record is submitted for approval, lock the record so that users can’t edit it and change the status to Submitted.

If the amount is $50 or less, approve the request. If the amount is greater than $50, send an approval request to the direct manager. If the amount is greater than $5,000 and the first approval request is approved, send an approval request to the vice president.

If all approval requests are approved, change the status to Approved and unlock the record. If any approval requests are rejected, change the status to Rejected and unlock the record.
:::
