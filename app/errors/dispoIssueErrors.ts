import { BaseError } from './BaseError';

export class DispoIssueNotFoundError extends BaseError {
  constructor(issueId: number, context?: string) {
    super(
      `DispoIssue with ID ${issueId} was not found.`,
      'DISPO_ISSUE_NOT_FOUND',
      404,
      { issueId },
      context || 'DispoIssueService',
      'Please ensure the disposition issue ID exists and is correct.'
    );
  }
}

export class MaintainerAssignmentError extends BaseError {
  constructor(issueId: number, maintainerId: number, context?: string) {
    super(
      `Failed to assign maintainer ${maintainerId} to issue ${issueId}.`,
      'MAINTAINER_ASSIGNMENT_FAILED',
      400,
      { issueId, maintainerId },
      context || 'DispoIssueService',
      'Please verify both the issue and maintainer exist and are active.'
    );
  }
}