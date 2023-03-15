import type { SeverityLevel } from '@sentry/nextjs';
import { captureException, captureMessage, withScope } from '@sentry/nextjs';

export function logException(error: any, moreExtra = {}) {
  withScope((scope) => {
    scope.setExtra('error', error);
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(moreExtra)) {
      scope.setExtra(`m_${key}`, value);
    }
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
  });
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

export function logInConsole(
  content: any,
  level: SeverityLevel | undefined = 'log'
) {
  // eslint-disable-next-line no-console
  if (level === 'debug') console.debug(content);
  // eslint-disable-next-line no-console
  if (level === 'error') console.error(content);
  // eslint-disable-next-line no-console
  if (level === 'info') console.info(content);
  // eslint-disable-next-line no-console
  if (level === 'log') console.log(content);
}
