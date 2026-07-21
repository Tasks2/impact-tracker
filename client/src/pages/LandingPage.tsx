import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function LandingPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
        <div className="rounded-2xl border border-border bg-background p-8 shadow-lg">Loading…</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/dashboard' : '/projects'} replace />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16 lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-2xl space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20">
            <Leaf className="h-4 w-4" />
            Impact Hub
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Manage NGO projects, beneficiaries, volunteers, and reports in one place.</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Impact Hub helps social impact teams stay organized with project tracking, beneficiary records, volunteer coordination, and operational reports.
            Sign in to access your dashboard and review program outcomes instantly.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <Button asChild size="lg">
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/login">Get Started</Link>
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-xl border border-white/10 bg-slate-950/90 text-slate-100 shadow-2xl shadow-slate-950/40">
          <CardHeader className="space-y-4 p-8 text-center">
            <CardTitle className="text-2xl">Feature overview</CardTitle>
            <CardDescription className="text-slate-400">
              Secure  authentication with role-based views for program managers and administrators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="mt-2 text-sm text-slate-400">Track project status, timelines, budgets, and tasks for your NGO initiatives.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold">Beneficiaries</h2>
              <p className="mt-2 text-sm text-slate-400">Store beneficiary profiles, needs, services received, and associated project support.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-lg font-semibold">Reports</h2>
              <p className="mt-2 text-sm text-slate-400">Generate insights, monitor outcomes, and review engagement across volunteers and activities.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
