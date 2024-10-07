"use client";

import { UnexpectedError } from "../UnexpectedError";

type Props = {
  error: Error;
  reset: () => void;
};

export const CheckError = ({ reset }: Props) => {
  return <UnexpectedError reset={reset} />;
};
