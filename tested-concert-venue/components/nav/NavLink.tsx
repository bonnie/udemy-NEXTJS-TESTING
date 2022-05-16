import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactElement | string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <Link href={href} passHref>
    <Button variant="nav">{children}</Button>
  </Link>
);
