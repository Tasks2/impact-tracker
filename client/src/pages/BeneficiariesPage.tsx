import { useState, useEffect } from 'react';
import { getBeneficiaries, saveBeneficiary, deleteBeneficiary } from '@/lib/beneficiary-api';
import { getProjects } from '@/lib/project-api';
import { Beneficiary, Project } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

export default function BeneficiariesPage() {
  const [refresh, setRefresh] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  //const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  //const [filterProject, setFilterProject] = useState('all');
  const [editing, setEditing] = useState<Beneficiary | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   Promise.all([getBeneficiaries(), getProjects()]).then(([b, p]) => {
  //     setBeneficiaries(b);
  //     setProjects(p);
  //     setLoading(false);
  //   });
  // }, [refresh]);
  useEffect(() => {
  setLoading(true);

  getBeneficiaries()
    .then((data) => setBeneficiaries(data))
    .finally(() => setLoading(false));
}, [refresh]);

const filtered = beneficiaries.filter((b) => {
  return (
    !search ||
    `${b.firstName} ${b.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (b.location || '')
      .toLowerCase()
      .includes(search.toLowerCase())
  );
});

  const emptyBeneficiary: Beneficiary = {
    id: '', 
    firstName: '', 
    lastName: '',
    phone: '',
    email: '',
    gender: 'MALE',  
    location: '', 
    status: 'ACTIVE',
    dateOfBirth: new Date().toISOString().split('T')[0],
  };

  //Ask about empty beneficiary
  const openNew = () => { setEditing({ ...emptyBeneficiary, id: crypto.randomUUID() }); setDialogOpen(true); };
  
  const openEdit = (b: Beneficiary) => { setEditing({ ...b }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    await saveBeneficiary(editing);
    setDialogOpen(false);
    setRefresh(r => r + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteBeneficiary(id);
    setRefresh(r => r + 1);
  };

  //const projectName = (id: string) => projects.find(p => p.id === id)?.name || '—';

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading beneficiaries…</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Beneficiaries</h1>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Beneficiary</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name or location…" className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {/* <Select value={filterProject} onValueChange={setFilterProject}>
          <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Filter by project" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
          </SelectContent>
        </Select> */}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Full Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Gender</TableHead>
                  <TableHead className="hidden sm:table-cell">Age</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="hidden md:table-cell">Project</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(b => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.fullName}</TableCell>
                    <TableCell className="hidden sm:table-cell">{b.gender}</TableCell>
                    <TableCell className="hidden sm:table-cell">{b.age}</TableCell>
                    <TableCell>{b.location}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{projectName(b.linkedProjectId)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(b)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(b.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No beneficiaries found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{editing?.id && beneficiaries.find(b => b.id === editing.id) ? 'Edit Beneficiary' : 'Add Beneficiary'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Full Name</Label><Input value={editing.fullName} onChange={e => setEditing({ ...editing, fullName: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Gender</Label>
                  <Select value={editing.gender} onValueChange={v => setEditing({ ...editing, gender: v as Beneficiary['gender'] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Age</Label><Input type="number" value={editing.age} onChange={e => setEditing({ ...editing, age: +e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Location</Label><Input value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} /></div>
              <div className="space-y-2"><Label>Needs</Label><Input value={editing.needs} onChange={e => setEditing({ ...editing, needs: e.target.value })} /></div>
              <div className="space-y-2"><Label>Services Received</Label><Input value={editing.servicesReceived} onChange={e => setEditing({ ...editing, servicesReceived: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Linked Project</Label>
                  <Select value={editing.linkedProjectId} onValueChange={v => setEditing({ ...editing, linkedProjectId: v })}>
                    <SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger>
                    <SelectContent>
                      {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Date Enrolled</Label><Input type="date" value={editing.dateEnrolled} onChange={e => setEditing({ ...editing, dateEnrolled: e.target.value })} /></div>
              </div>
              <Button onClick={handleSave} className="w-full">Save Beneficiary</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}