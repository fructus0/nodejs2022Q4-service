import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(exception.getStatus()).json({
      detail: exception.detail,
      violations: exception.violations,
    });
  }
}
