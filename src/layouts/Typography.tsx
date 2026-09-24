import clsx from "clsx";
import type { HTMLAttributes } from "react";

export function TypoH2({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={clsx("text-base", className)} {...props}>
      {children}
    </h2>
  );
}

export function TypoH3({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={clsx("text-lg font-medium text-on-surface", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypoH4({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={clsx("text-base font-medium text-on-surface", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TypoSpan({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={clsx(
        "text-xs bg-surface-container-high text-on-surface-variant px-2.5 py-1 rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TypoP({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={clsx("text-sm", className)} {...props}>
      {children}
    </p>
  );
}
