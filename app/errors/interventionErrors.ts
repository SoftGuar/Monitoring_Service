import { BaseError } from './BaseError';
import { InterventionStatus } from '@prisma/client';

export class InterventionNotFoundError extends BaseError {
  constructor(interventionId: number, context?: string) {
    super(
      `Intervention with ID ${interventionId} was not found.`,
      'INTERVENTION_NOT_FOUND',
      404,
      { interventionId },
      context || 'InterventionService',
      'Please ensure the intervention ID exists and is correct.'
    );
  }
}

export class InvalidInterventionStatusError extends BaseError {
  constructor(interventionId: number, currentStatus: InterventionStatus, requestedStatus: InterventionStatus, context?: string) {
    super(
      `Cannot change intervention ${interventionId} from status '${currentStatus}' to '${requestedStatus}'.`,
      'INVALID_INTERVENTION_STATUS_CHANGE',
      400,
      { interventionId, currentStatus, requestedStatus },
      context || 'InterventionService',
      'Status transitions must follow the allowed workflow.'
    );
  }
}

export class InterventionUpdateError extends BaseError {
  constructor(interventionId: number, reason: string, context?: string) {
    super(
      `Failed to update intervention ${interventionId}: ${reason}`,
      'INTERVENTION_UPDATE_FAILED',
      400,
      { interventionId, reason },
      context || 'InterventionService',
      'Please check the provided intervention data.'
    );
  }
}

export class InterventionReportUpdateError extends BaseError {
  constructor(interventionId: number, reason: string, context?: string) {
    super(
      `Failed to update report for intervention ${interventionId}: ${reason}`,
      'INTERVENTION_REPORT_UPDATE_FAILED',
      400,
      { interventionId, reason },
      context || 'InterventionService',
      'Please check the provided report data.'
    );
  }
}