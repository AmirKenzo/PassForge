import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  KeyRound,
  ShieldCheck,
  BookOpen,
  User,
  Fingerprint,
  Code,
  Ticket,
  Shuffle,
  Hash,
  Wrench,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PrivacyBanner } from '@/components/shared/PrivacyBanner';
import { TOOLS } from '@/config/tools';
import type { ComponentType } from 'react';

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  KeyRound,
  ShieldCheck,
  BookOpen,
  User,
  Fingerprint,
  Code,
  Ticket,
  Shuffle,
  Hash,
  Wrench,
};

const QUICK_ACTIONS = [
  { label: 'Generate Password', path: '/app/password-generator', icon: KeyRound },
  { label: 'Analyze Password', path: '/app/password-analyzer', icon: ShieldCheck },
  { label: 'Generate UUID', path: '/app/uuid-generator', icon: Fingerprint },
  { label: 'Hash Text', path: '/app/hash-generator', icon: Hash },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your privacy-first security toolkit — all tools run locally.
        </p>
      </div>

      <PrivacyBanner />

      <section aria-label="Quick actions">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Button variant="outline" className="h-auto w-full justify-start p-4" asChild>
                <Link to={action.path}>
                  <action.icon className="text-primary mr-3 h-5 w-5" />
                  <span>{action.label}</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      <section aria-label="All tools">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Tools</h2>
          <span className="text-muted-foreground text-sm">{TOOLS.length} tools available</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((tool, i) => {
            const Icon = ICON_MAP[tool.icon] ?? Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link to={tool.path}>
                  <Card className="hover:border-primary/50 h-full transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Icon className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{tool.name}</CardTitle>
                          <CardDescription className="text-xs capitalize">
                            {tool.category}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
