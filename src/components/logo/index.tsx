import React from "react";
import Image from "next/image";

export const Logo: React.FC = () => {
  return (
    <Image src="/logos/Logo.svg" alt="nextjs" width="77" height="36" />
  );
};
