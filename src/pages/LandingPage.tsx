import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  KeyRound,
  Lock,
  Github,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Smartphone,
  Monitor,
  ShieldCheck,
  BookOpen,
  User,
  Fingerprint,
  Code,
  Ticket,
  Shuffle,
  Hash,
  Wrench,
  ServerOff,
  EyeOff,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LandingHeader } from '@/components/layout/Header';
import { TOOLS } from '@/config/tools';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

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

const STATS = [
  { value: `${TOOLS.length}`, label: 'Security Tools' },
  { value: '100%', label: 'Client-Side' },
  { value: '0', label: 'Servers' },
];

const PILLARS = [
  {
    icon: KeyRound,
    title: '10+ Security Tools',
    description: 'Passwords, passphrases, tokens, hashes, UUIDs, and utilities in one toolkit.',
  },
  {
    icon: Lock,
    title: '100% Client-Side',
    description: 'No accounts, no tracking. Everything runs locally with Web Crypto API.',
  },
  {
    icon: Zap,
    title: 'Instant & Offline',
    description: 'Generate in milliseconds. Works offline as a PWA after first visit.',
  },
  {
    icon: Globe,
    title: 'Cross-Platform',
    description: 'Web, desktop (Tauri), mobile (Capacitor), and installable PWA.',
  },
];

const PRIVACY_POINTS = [
  { icon: ServerOff, text: 'No backend servers' },
  { icon: EyeOff, text: 'No analytics or tracking' },
  { icon: Lock, text: 'No data collection' },
  { icon: Shield, text: 'No third-party APIs for generation' },
  { icon: CheckCircle2, text: 'No user accounts' },
  { icon: Zap, text: 'No network requests for secrets' },
];

const FAQ = [
  {
    q: 'Is PassForge really private?',
    a: 'Yes. PassForge runs entirely in your browser using the Web Crypto API. No passwords, tokens, or hashes are ever sent to any server. There is no backend, no analytics, and no tracking.',
  },
  {
    q: 'Can I use PassForge offline?',
    a: 'Yes. PassForge is a Progressive Web App (PWA) that caches all assets locally. Once installed or visited once, all tools work without an internet connection.',
  },
  {
    q: 'Is the source code available?',
    a: 'PassForge is fully open source under the MIT License. You can audit, fork, and contribute on GitHub.',
  },
  {
    q: 'What platforms are supported?',
    a: 'PassForge works on any modern browser. Desktop apps (Windows, macOS, Linux) via Tauri and mobile (Android) via Capacitor are supported.',
  },
  {
    q: 'Are the generated passwords secure?',
    a: "Yes. All random generation uses crypto.getRandomValues(), the browser's cryptographically secure pseudo-random number generator (CSPRNG).",
  },
];

export function LandingPage() {
  return (
    <div className="bg-background min-h-screen">
      <LandingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="from-primary/10 via-background to-background absolute inset-0 bg-gradient-to-br" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fadeUp}>
            <Badge variant="secondary" className="mb-6 gap-2 px-3 py-1.5 text-sm">
              <Shield className="h-3.5 w-3.5" />
              Privacy-First · Open Source · MIT
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Forge secure credentials. <span className="text-primary">Keep your privacy.</span>
            </h1>

            <p className="text-muted-foreground mt-6 max-w-xl text-lg text-balance">
              PassForge is a professional security toolkit for passwords, passphrases, tokens,
              hashes, and more — generated entirely on your device.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="h-12 px-8" asChild>
                <Link to="/app">
                  Open PassForge
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8" asChild>
                <a
                  href="https://github.com/amirkenzo/PassForge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>

            <p className="text-muted-foreground mt-6 text-sm">
              <strong className="text-foreground">No data ever leaves your device.</strong> No
              accounts. No tracking.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.15 }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="from-primary/20 absolute -inset-4 rounded-3xl bg-gradient-to-br to-transparent blur-2xl" />
            <Card className="relative overflow-hidden shadow-xl">
              <div className="bg-muted/50 border-b px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="bg-destructive/80 h-2.5 w-2.5 rounded-full" />
                  <div className="bg-warning/80 h-2.5 w-2.5 rounded-full" />
                  <div className="bg-success/80 h-2.5 w-2.5 rounded-full" />
                  <span className="text-muted-foreground ml-2 text-xs">PassForge — Dashboard</span>
                </div>
              </div>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                    <KeyRound className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Password Generator</p>
                    <p className="text-muted-foreground text-xs">256-bit entropy · local only</p>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-sm">K9#mP2$xL7@nQ4!wR</div>
                <div className="grid grid-cols-2 gap-2">
                  {['Password', 'Analyze', 'UUID', 'Hash'].map((label) => (
                    <div
                      key={label}
                      className="bg-muted/60 text-muted-foreground rounded-md px-3 py-2 text-center text-xs font-medium"
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link to="/app">Launch App</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 pb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-primary text-2xl font-bold md:text-3xl">{stat.value}</p>
              <p className="text-muted-foreground mt-1 text-xs md:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section id="features" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Everything you need</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              {TOOLS.length} professional security tools with zero compromises on privacy.
            </p>
          </motion.div>

          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, i) => (
              <motion.div key={pillar.title} {...fadeUp} transition={{ delay: i * 0.08 }}>
                <Card className="bg-muted/30 h-full border-transparent">
                  <CardHeader>
                    <pillar.icon className="text-primary mb-2 h-8 w-8" />
                    <CardTitle className="text-base">{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => {
              const Icon = ICON_MAP[tool.icon] ?? KeyRound;
              return (
                <motion.div key={tool.id} {...fadeUp} transition={{ delay: i * 0.03 }}>
                  <Link to={tool.path}>
                    <Card className="hover:border-primary/40 h-full transition-all hover:shadow-md">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                            <Icon className="text-primary h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <CardTitle className="truncate text-base">{tool.name}</CardTitle>
                            <CardDescription className="text-xs capitalize">
                              {tool.category}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2 text-sm">
                          {tool.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="bg-muted/30 border-y px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div {...fadeUp}>
              <Badge variant="outline" className="mb-4">
                Privacy by design
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Your secrets stay yours
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                PassForge has no servers to breach, no databases to leak, and no analytics to opt
                out of — because none of that exists.
              </p>
              <Button className="mt-8" asChild>
                <Link to="/app/password-generator">
                  Try Password Generator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div {...fadeUp} className="grid gap-3 sm:grid-cols-2">
              {PRIVACY_POINTS.map((item) => (
                <div
                  key={item.text}
                  className="bg-background flex items-center gap-3 rounded-xl border p-4"
                >
                  <item.icon className="text-primary h-5 w-5 shrink-0" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Works everywhere</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              One codebase for web, desktop, and mobile — always local, always private.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 md:mx-auto md:max-w-lg">
              {[
                { icon: Monitor, label: 'Desktop', sub: 'Tauri' },
                { icon: Globe, label: 'Web', sub: 'PWA' },
                { icon: Smartphone, label: 'Mobile', sub: 'Capacitor' },
              ].map((platform) => (
                <Card key={platform.label}>
                  <CardContent className="pt-6 pb-6">
                    <platform.icon className="text-primary mx-auto mb-3 h-8 w-8" />
                    <p className="font-semibold">{platform.label}</p>
                    <p className="text-muted-foreground text-xs">{platform.sub}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Source */}
      <section className="bg-muted/30 border-y px-4 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp}>
            <Github className="text-primary mx-auto mb-6 h-12 w-12" />
            <h2 className="text-3xl font-bold">Open source & auditable</h2>
            <p className="text-muted-foreground mt-4 text-lg">
              MIT licensed. Audit the code, report issues, submit PRs, and help make security tools
              accessible to everyone.
            </p>
            <Button className="mt-8" variant="outline" size="lg" asChild>
              <a
                href="https://github.com/amirkenzo/PassForge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div {...fadeUp} className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          </motion.div>
          <Accordion type="single" collapsible>
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <motion.div
            {...fadeUp}
            className="from-primary/10 relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-8 text-center md:p-12"
          >
            <h2 className="text-3xl font-bold">Ready to get started?</h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-lg">
              Start generating passwords, tokens, and more — entirely on your device.
            </p>
            <Button size="lg" className="mt-8 h-12 px-8" asChild>
              <Link to="/app">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="border-border border-t px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="text-primary h-5 w-5" />
            <span className="font-semibold">PassForge</span>
          </div>
          <p className="text-muted-foreground text-sm">MIT License · Built with privacy in mind</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/amirkenzo/PassForge"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              GitHub
            </a>
            <Link to="/app" className="text-muted-foreground hover:text-foreground text-sm">
              App
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
