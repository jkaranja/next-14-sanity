import Link from "next/link";
import React from "react";

type ClientSideRouteProps = {
  route: string;
  children: React.ReactNode;
};

const ClientSideRoute = ({ route, children }: ClientSideRouteProps) => {
  return <Link href={route}>{children}</Link>;
};

export default ClientSideRoute;
