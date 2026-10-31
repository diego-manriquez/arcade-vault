import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "cyan" | "magenta" | "yellow" | "ghost" | "solid";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  cyan: "",
  magenta: "btn-m",
  yellow: "btn-y",
  ghost: "btn-ghost",
  solid: "btn-solid",
};

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className"> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Botón arcade. Si recibe `href` se renderiza como enlace de Next.js
 * (navegación); si no, como `<button type="button">`.
 */
export function Button(props: ButtonProps) {
  const { variant = "cyan", className, ...rest } = props;
  const classes = cn("btn", VARIANT_CLASS[variant], className);

  if (props.href !== undefined) {
    const { href, ...linkProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    return (
      <Link
        href={href}
        {...linkProps}
        className={cn(
          classes,
          "inline-flex items-center justify-center no-underline",
        )}
      />
    );
  }

  return (
    <button
      type="button"
      {...(rest as Omit<ButtonAsButton, keyof CommonProps>)}
      className={classes}
    />
  );
}
