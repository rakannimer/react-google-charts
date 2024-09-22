import { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";

interface IContext {
  branch: string;
  theme: "light" | "dark";
}

export default function ContextProvider({
  children,
}: {
  children(context: IContext): ReactNode;
}) {
  const ctx = useDocusaurusContext();
  const { isDarkTheme } = useColorMode();
  const context = {
    branch: ctx.siteConfig.customFields.branch as string,
    theme: isDarkTheme ? ("dark" as const) : ("light" as const),
  };

  return children(context);
}
