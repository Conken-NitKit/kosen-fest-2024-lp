"use client";

import { UnexpectedError } from "../unexpected-error";

type Props = {
  error: Error;
  reset: () => void;
};

export const CheckError = ({ error, reset }: Props) => {
  if (process.env.NODE_ENV === "development") {
    throw error;
  }

  return <UnexpectedError reset={reset} />;
};
