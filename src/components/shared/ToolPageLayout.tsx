import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { PrivacyBanner } from '@/components/shared/PrivacyBanner';

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ToolPageLayout({ title, description, children, actions }: ToolPageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>
        {actions && <div className="flex shrink-0 gap-2">{actions}</div>}
      </div>

      <PrivacyBanner compact />

      {children}
    </motion.div>
  );
}
