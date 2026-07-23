import { useState, useEffect } from 'react';
import { Project, ProjectReport } from '@/types';
import { getProjects } from '@/lib/project-api';
import { getProjectReport } from '@/lib/report-api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
//import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown, Users, Heart, ShieldCheck } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [report, setReport] = useState<ProjectReport | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);

      if (data.length > 0) {
        setSelectedProjectId(data[0].id);
      }
    } finally {
      setLoading(false);
    }
  }

  loadProjects();
}, []);

useEffect(() => {
  async function loadReport() {
    if (!selectedProjectId) return;

    try {
      const data = await getProjectReport(selectedProjectId);
      setReport(data);
    } catch (error) {
      console.error('Failed to load report:', error);
    }
  }

  loadReport();
}, [selectedProjectId]);


  const exportPDF = () => {
  if (!report) return;

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text('Impact Report', 14, 22);

  doc.setFontSize(14);
  doc.text(report.project.name, 14, 32);

  doc.setFontSize(10);
  doc.text(
    `Status: ${report.project.status} | ${report.project.startDate} — ${report.project.endDate || 'Ongoing'}`,
    14,
    40
  );

  autoTable(doc, {
    startY: 50,
    head: [['Metric', 'Value']],
    body: [
      ['Beneficiaries Served', String(report.metrics.beneficiariesServed)],
      ['Active Beneficiaries', String(report.metrics.activeBeneficiaries)],
      ['Volunteers Assigned', String(report.metrics.volunteersAssigned)],
      ['Active Volunteers', String(report.metrics.activeVolunteers)],
      ['Field Workers Assigned', String(report.metrics.fieldWorkersAssigned)],
    ],
  });

  if (report.beneficiaries.length > 0) {
    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 12,
      head: [['Beneficiary', 'Gender', 'Location', 'Status']],
      body: report.beneficiaries.map((b) => [
        `${b.firstName} ${b.lastName}`,
        b.gender || '—',
        b.location || '—',
        b.status,
      ]),
    });
  }

  doc.save(
    `impact-report-${report.project.name
      .replace(/\s+/g, '-')
      .toLowerCase()}.pdf`
  );
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

      {report ? (
        <>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-display text-xl">{report.project.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{report.project.startDate} — {report.project.endDate || 'Ongoing'}</p>
              </div>
              {/* <Badge variant="secondary" className={project.status === 'Active' ? 'bg-primary/10 text-primary' : ''}>{project.status}</Badge> */}
               <Badge
      variant="secondary"
      className={
        report.project.status === 'ACTIVE'
          ? 'bg-primary/10 text-primary'
          : report.project.status === 'COMPLETED'
          ? 'bg-green-100 text-green-700'
          : report.project.status === 'CANCELLED'
          ? 'bg-red-100 text-red-700'
          : 'bg-muted text-muted-foreground'
      }
    >
      {report.project.status}
    </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{report.project.description || 'No description provided'}</p>
            </CardContent>
          </Card>

         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">
          Beneficiaries Served
        </span>
      </div>

      <p className="text-3xl font-bold">
        {report.metrics.beneficiariesServed}
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Heart className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">
          Active Beneficiaries
        </span>
      </div>

      <p className="text-3xl font-bold">
        {report.metrics.activeBeneficiaries}
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">
          Volunteers Assigned
        </span>
      </div>

      <p className="text-3xl font-bold">
        {report.metrics.volunteersAssigned}
      </p>
    </CardContent>
  </Card>

  <Card>
    <CardContent className="p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm text-muted-foreground">
          Field Workers
        </span>
      </div>

      <p className="text-3xl font-bold">
        {report.metrics.fieldWorkersAssigned}
      </p>
    </CardContent>
  </Card>
</div>

          <Button onClick={exportPDF} className="gap-2"><FileDown className="h-4 w-4" /> Export as PDF</Button>
          <Card>
  <CardHeader>
    <CardTitle>Beneficiaries</CardTitle>
  </CardHeader>

  <CardContent className="p-0">
    <div className="overflow-auto">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Gender</th>
            <th className="text-left p-3">Location</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {report.beneficiaries.map((b) => (
            <tr key={b.id} className="border-b">
              <td className="p-3 font-medium">
                {b.firstName} {b.lastName}
              </td>

              <td className="p-3">
                {b.gender || '—'}
              </td>

              <td className="p-3">
                {b.location || '—'}
              </td>

              <td className="p-3">
                <Badge
                  variant="secondary"
                  className={
                    b.status === 'ACTIVE'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-muted text-muted-foreground'
                  }
                >
                  {b.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </CardContent>
</Card>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">Select a project to view its impact report.</CardContent>
          </Card>
      )}
    </div>
  );
}

