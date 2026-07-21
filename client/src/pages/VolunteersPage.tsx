import { useState, useEffect } from 'react';
//import { getVolunteers, saveVolunteer, deleteVolunteer, getProjects } from '@/lib/store';
import { Volunteer, Project } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Clock } from 'lucide-react';

export default function VolunteersPage() {
  const [refresh, setRefresh] = useState(0);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Volunteer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoursDialogVol, setHoursDialogVol] = useState<Volunteer | null>(null);
  const [addHours, setAddHours] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([getVolunteers(), getProjects()]).then(([v, p]) => {
      setVolunteers(v);
      setProjects(p);
      setLoading(false);
    });
  }, [refresh]);

  const projectName = (id: string) => projects.find(p => p.id === id)?.name || '—';

  const emptyVolunteer: Volunteer = {
    id: '', name: '', contact: '', assignedProjectId: '', role: '', hoursLogged: 0,
    createdAt: new Date().toISOString(),
  };

  const openNew = () => { setEditing({ ...emptyVolunteer, id: crypto.randomUUID() }); setDialogOpen(true); };
  const openEdit = (v: Volunteer) => { setEditing({ ...v }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    await saveVolunteer(editing);
    setDialogOpen(false);
    setRefresh(r => r + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteVolunteer(id);
    setRefresh(r => r + 1);
  };

  const handleLogHours = async () => {
    if (!hoursDialogVol || !addHours) return;
    const updated = { ...hoursDialogVol, hoursLogged: hoursDialogVol.hoursLogged + Number(addHours) };
    await saveVolunteer(updated);
    setHoursDialogVol(updated);
    setAddHours('');
    setRefresh(r => r + 1);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading volunteers…</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Volunteers</h1>
        <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> Add Volunteer</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map(v => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{v.contact}</TableCell>
                    <TableCell className="text-muted-foreground">{projectName(v.assignedProjectId)}</TableCell>
                    <TableCell className="hidden md:table-cell">{v.role}</TableCell>
                    <TableCell className="font-semibold">{v.hoursLogged}h</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => setHoursDialogVol(v)} title="Log hours"><Clock className="h-4 w-4 text-primary" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => openEdit(v)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {volunteers.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No volunteers found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display">{editing?.name ? 'Edit Volunteer' : 'Add Volunteer'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Contact</Label><Input value={editing.contact} onChange={e => setEditing({ ...editing, contact: e.target.value })} /></div>
              <div className="space-y-2"><Label>Role</Label><Input value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} /></div>
              <div className="space-y-2"><Label>Assigned Project</Label>
                <Select value={editing.assignedProjectId} onValueChange={v => setEditing({ ...editing, assignedProjectId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger>
                  <SelectContent>
                    {projects.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full">Save Volunteer</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Log Hours */}
      <Dialog open={!!hoursDialogVol} onOpenChange={o => { if (!o) setHoursDialogVol(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle className="font-display">Log Hours — {hoursDialogVol?.name}</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Total logged: <strong>{hoursDialogVol?.hoursLogged}h</strong></p>
          <div className="flex gap-2">
            <Input type="number" placeholder="Hours to add" value={addHours} onChange={e => setAddHours(e.target.value)} />
            <Button onClick={handleLogHours}>Log</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}