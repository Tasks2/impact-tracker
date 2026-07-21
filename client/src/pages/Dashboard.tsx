import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Users, Heart, DollarSign, Activity } from 'lucide-react';
//import { Project, Beneficiary, Volunteer, ActivityItem } from '@/types';
//import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
//import { format } from 'date-fns';

export default function Dashboard() {
 const [loading, setLoading] = useState(true);
 const [stats, setStats] = useState<{
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  beneficiaries: {
    total: number;
    active: number;
  };
  volunteers: {
    total: number;
    active: number;
  };
  users: {
    total: number;
    fieldWorkers: number;
    admins: number;
  };
} | null>(null);

useEffect(() => {
  async function loadDashboard() {
    try {
      const response = await apiFetch<{
        success: boolean;
        data: {
          projects: {
            total: number;
            active: number;
            completed: number;
          };
          beneficiaries: {
            total: number;
            active: number;
          };
          volunteers: {
            total: number;
            active: number;
          };
          users: {
            total: number;
            fieldWorkers: number;
            admins: number;
          };
        };
      }>('/dashboard');

      setStats(response.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  loadDashboard();
}, []);

  const statCards = [
    { label: 'Total Projects', value: stats?.projects.total ?? 0, icon: FolderKanban, color: 'text-primary' },
    { label: 'Total Beneficiaries', value: stats?.beneficiaries.total ?? 0, icon: Users, color: 'text-primary' },
    { label: 'Active Volunteers', value: stats?.volunteers.active ?? 0, icon: Heart, color: 'text-primary' },
    { label: 'Total Donations', value: 'N/A', icon: DollarSign, color: 'text-primary' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-display font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-display">Beneficiaries Served per Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(150, 5%, 45%)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(150, 5%, 45%)' }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '0.5rem', border: '1px solid hsl(148,15%,90%)' }} />
                  <Bar dataKey="count" fill="hsl(152, 55%, 33%)" radius={[4, 4, 0, 0]} name="Beneficiaries" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card> */}

        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activities.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent activity.</p>
              )}
              {activities.map((a) => (
                <div key={a.id} className="border-l-2 border-primary/30 pl-3">
                  <p className="text-sm leading-snug">{a.message}</p>
                  <p className="text-xs text-muted-foreground">{format(new Date(a.timestamp), 'MMM d, yyyy')}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}