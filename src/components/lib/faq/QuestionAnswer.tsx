/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from 'react';

type IQuestionAnswerProps = {
  question: string;
  children: ReactNode;
};

const QuestionAnswer = (props: IQuestionAnswerProps) => (
  <div className="question-answer mx-auto mt-8 rounded-md border border-gray-200 p-4 shadow first:mt-0 sm:w-3/4 sm:p-6">
    <div className="text-2xl font-semibold text-primary-500">
      {props.question}
    </div>

    <div className="mt-4 text-lg leading-7">{props.children}</div>
  </div>
);

export { QuestionAnswer };
