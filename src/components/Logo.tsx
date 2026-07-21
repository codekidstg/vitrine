import Image from "next/image";

type Props = {
  size?: number;
  className?: string;
  variant?: "default" | "white";
};

export default function Logo({ size = 120, className, variant = "default" }: Props) {
  return (
    <Image
      src={variant === "white" ? "/logo-white.png" : "/logo.png"}
      alt="codeKids"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
}
