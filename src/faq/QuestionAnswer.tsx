import { ReactNode } from 'react';

type IQuestionAnswerProps = {
  question: string;
  children: ReactNode;
};

const QuestionAnswer = (props: IQuestionAnswerProps) => (
  <div className="question-answer mt-8 first:mt-0 sm:w-3/4 border border-gray-200 rounded-md shadow p-4 sm:p-6 mx-auto">
    <div className="text-2xl text-primary-500 font-semibold">
      {props.question}
    </div>

    <div className="mt-4 text-lg leading-7">{props.children}</div>

    <style jsx>
      {`
        .question-answer :global(p) {
          @apply mt-3;
        }

        .question-answer :global(a) {
          @apply text-primary-500;
        }

        .question-answer :global(a:hover) {
          @apply underline;
        }
      `}
    </style>
  </div>
);

export { QuestionAnswer };
