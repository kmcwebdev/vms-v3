import React from "react";
import { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <main className="px-24 py-8">{children}</main>;
};

export default layout;
