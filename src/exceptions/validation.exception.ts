import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { sprintf } from 'sprintf-js';

interface Violation {
  propertyPath: string;
  message: string;
}

class FlatValidationError extends ValidationError {
  constraints: { [type: string]: string };
}

export class ValidationException extends BadRequestException {
  detail: string;
  violations: Violation[];

  constructor(validationErrors: ValidationError[]) {
    super();

    const flatErrors = this.flattenValidationErrors(validationErrors);

    this.violations = flatErrors.flatMap((error) =>
      this.prepareViolations(error),
    );

    this.detail = this.violations
      .map((violation) => {
        return sprintf('%s: %s.', violation.propertyPath, violation.message);
      })
      .join();
  }

  private prepareViolations(error: FlatValidationError) {
    return Object.values(error.constraints).map((constraint) => {
      return {
        propertyPath: error.property,
        message: constraint,
      };
    });
  }

  private flattenValidationErrors(
    validationErrors: ValidationError[],
  ): FlatValidationError[] {
    return validationErrors.flatMap((error) => {
      if (!error.children || error.children.length === 0) {
        delete error.children;

        return [error];
      }

      const flattenedChildren = this.flattenValidationErrors(error.children);

      return flattenedChildren.map((child: any) => {
        return {
          ...child,
          property: `${error.property}.${child.property}`,
        };
      });
    });
  }
}
