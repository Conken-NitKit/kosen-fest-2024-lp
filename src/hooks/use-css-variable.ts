import { useCallback, useMemo } from "react";

/**
 * CSS変数の値を取得し、指定の変換関数を適用して返すカスタムフック
 * @param variableName - 取得したい CSS 変数名（例: "--primary-color"）
 * @param transformFn - 取得した値を変換する関数。変換が不要であれば(v)=>vのようにする
 * @returns 変換後の CSS 変数の値
 */
export const useCssVariable = <T>(variableName: string, transformFn: (value: string) => T) => {
  const fn = useCallback(transformFn, []);

  const value = useMemo(() => fn(getCssVariable(variableName)), [fn, variableName]);

  return value;
};

/**
 * 指定された CSS 変数の値を取得する関数。
 * @param variableName - 取得したい CSS 変数名（例: "--primary-color"）
 * @returns CSS 変数の値（文字列）
 */
export const getCssVariable = (variableName: string): string => {
  // ルート要素のスタイルを取得
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  return computedStyle.getPropertyValue(variableName).trim();
};
