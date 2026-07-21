import { useState, useEffect } from 'react';
//import { getProjects, getBeneficiaries, getVolunteers } from '@/lib/store';
import { Project, Beneficiary, Volunteer } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, Users, ListChecks, Clock, DollarSign } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getProjects(), getBeneficiaries(), getVolunteers()]).then(([p, b, v]) => {
      setProjects(p);
      setBeneficiaries(b);
      setVolunteers(v);
      // Auto-select first project once loaded
      if (p.length > 0) setSelectedProjectId(p[0].id);
      setLoading(false);
    });
  }, []);

  const project = projects.find(p => p.id === selectedProjectId);
  const projBeneficiaries = beneficiaries.filter(b => b.linkedProjectId === selectedProjectId);
  const projVolunteers = volunteers.filter(v => v.assignedProjectId === selectedProjectId);
  const tasksCompleted = project?.tasks.filter(t => t.completed).length || 0;
  const tasksTotal = project?.tasks.length || 0;
  const totalVolHours = projVolunteers.reduce((s, v) => s + v.hoursLogged, 0);
  const budgetPercent = project ? Math.round((project.budgetUsed / project.budget) * 100) : 0;
  const taskPercent = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

  const exportPDF = () => {
    if (!project) return;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Impact Report', 14, 22);
    doc.setFontSize(14);
    doc.text(project.name, 14, 32);
    doc.setFontSize(10);
    doc.text(`Status: ${project.status} | ${project.startDate} — ${project.endDate}`, 14, 40);
    autoTable(doc, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: [
        ['Beneficiaries Served', String(projBeneficiaries.length)],
        ['Tasks Completed', `${tasksCompleted} / ${tasksTotal}`],
        ['Volunteer Hours', `${totalVolHours}h`],
        ['Budget Used', `$${project.budgetUsed.toLocaleString()} / $${project.budget.toLocaleString()} (${budgetPercent}%)`],
      ],
    });
    if (projBeneficiaries.length > 0) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 12,
        head: [['Beneficiary', 'Gender', 'Age', 'Location', 'Services']],
        body: projBeneficiaries.map(b => [b.fullName, b.gender, String(b.age), b.location, b.servicesReceived]),
      });
    }
    doc.save(`impact-report-${project.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading reports…</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Impact Reports</h1>
        <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
          <SelectTrigger className="w-full sm:w-64"><SelectValue placeholder="Select project" /></SelectTrigger>
          <SelectContent>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {project ? (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl">{project.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{project.startDate} — {project.endDate}</p>
              </div>
              <Badge variant="secondary" className={project.status === 'Active' ? 'bg-primary/10 text-primary' : ''}>{project.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Users className="h-4 w-4 text-primary" /></div>
                  <span className="text-sm text-muted-foreground">Beneficiaries</span>
                </div>
                <p className="text-3xl font-bold">{projBeneficiaries.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><ListChecks className="h-4 w-4 text-primary" /></div>
                  <span className="text-sm text-muted-foreground">Tasks</span>
                </div>
                <p className="text-3xl font-bold">{tasksCompleted}/{tasksTotal}</p>
                <Progress value={taskPercent} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Clock className="h-4 w-4 text-primary" /></div>
                  <span className="text-sm text-muted-foreground">Volunteer Hours</span>
                </div>
                <p className="text-3xl font-bold">{totalVolHours}h</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><DollarSign className="h-4 w-4 text-primary" /></div>
                  <span className="text-sm text-muted-foreground">Budget Used</span>
                </div>
                <p className="text-3xl font-bold">${project.budgetUsed.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">of ${project.budget.toLocaleString()} ({budgetPercent}%)</p>
                <Progress value={budgetPercent} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          <Button onClick={exportPDF} className="gap-2"><FileDown className="h-4 w-4" /> Export as PDF</Button>
        </>
      ) : (
        <Card><CardContent className="py-12 text-center text-muted-foreground">Select a project to view its impact report.</CardContent></Card>
      )}
    </div>
  );
}

