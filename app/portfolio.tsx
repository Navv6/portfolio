"use client";

import { usePathname } from "next/navigation";
import DeepViPortfolioPage from "./projects/deepvi/portfolio";
import PriceLensPortfolioPage from "./projects/pricelens/portfolio";
import TableauPortfolioPage from "./projects/tableau/portfolio";

export default function Page() {
  const pathname = usePathname();
  const projectType = pathname?.includes('pricelens') ? 'pricelens' : 
                     pathname?.includes('tableau') ? 'tableau' : 'deepvi';

  if (projectType === 'pricelens') {
    return <PriceLensPortfolioPage />;
  }

  if (projectType === 'tableau') {
    return <TableauPortfolioPage />;
  }

  return <DeepViPortfolioPage />;
}
