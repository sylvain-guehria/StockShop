import type { SeverityLevel } from '@sentry/nextjs';
import { captureException, captureMessage } from '@sentry/nextjs';

export function logException(error: any) {
  if (error instanceof Error) {
    captureException(error);
  } else {
    try {
      const message =
        typeof error === 'string' ? error : `Error: ${JSON.stringify(error)}`;
      captureMessage(message, 'error');
    } catch (jsonError) {
      captureException(jsonError);
    }
  }
}

export function logMessage({
  message,
  level,
}: {
  message: string;
  level: SeverityLevel;
}) {
  captureMessage(message, level);
}

export function logInConsole({
  content,
  level,
}: {
  content: any;
  level: SeverityLevel;
}) {
  // eslint-disable-next-line no-console
  if (level === 'debug') console.debug(content);
  // eslint-disable-next-line no-console
  if (level === 'error') console.error(content);
  // eslint-disable-next-line no-console
  if (level === 'info') console.info(content);
  // eslint-disable-next-line no-console
  if (level === 'log') console.log(content);
}
