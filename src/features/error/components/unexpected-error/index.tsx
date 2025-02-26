"use client";

type Props = {
  reset: () => void;
};

export const UnexpectedError = ({ reset }: Props) => {
  return <div>予期しないエラーが発生しました</div>;
};
