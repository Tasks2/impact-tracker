import { useState, useEffect } from 'react';
import { getVolunteers, saveVolunteer, deleteVolunteer } from '@/lib/volunteer-api';
import { Volunteer } from '@/types';
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
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Volunteer | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
 
  useEffect(() => {
  setLoading(true);

  getVolunteers()
    .then((data) => setVolunteers(data))
    .finally(() => setLoading(false));
}, [refresh]);

 
const emptyVolunteer: Volunteer = {
  id: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: null,
  skills: '',
  availability: '',
  status: 'ACTIVE',
  createdAt: '',
  updatedAt: '',
};

  const openNew = () => { setEditing({ ...emptyVolunteer }); setDialogOpen(true); };
  const openEdit = (v: Volunteer) => { setEditing({ ...v }); setDialogOpen(true); };

  const handleSave = async () => {
  if (!editing) return;

  try {
    const saved = await saveVolunteer(editing);

    setVolunteers((prev) =>
      prev.map((v) =>
        v.id === saved.id ? saved : v
      )
    );

    setDialogOpen(false);
    setEditing(null);
    setRefresh((r) => r + 1);
  } catch (error) {
    console.error('Failed to save volunteer:', error);
    alert('Save failed. Please try again.');
  }
};

  const handleDelete = async (id: string) => {
    await deleteVolunteer(id);
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
                  <TableHead className="hidden sm:table-cell">Phone</TableHead>
                  <TableHead className="hidden sm:table-cell">Skills</TableHead>
                  <TableHead className="hidden md:table-cell">Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteers.map(v => (
                  <TableRow key={v.id}>
                    <TableCell className="font-medium">{v.firstName} {v.lastName}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{v.phone}</TableCell>
                    <TableCell className="text-muted-foreground">{v.skills || '—'}</TableCell>
                    <TableCell className="hidden md:table-cell">{v.availability || '—'}</TableCell>
                    <TableCell className="font-semibold">{v.status}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
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
          <DialogHeader><DialogTitle className="font-display">{editing?.id ? 'Edit Volunteer' : 'Add Volunteer'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>First Name</Label><Input value={editing.firstName} onChange={e => setEditing({ ...editing, firstName: e.target.value })} /></div>
              <div className="space-y-2"><Label>Last Name</Label><Input value={editing.lastName} onChange={e => setEditing({ ...editing, lastName: e.target.value })} /></div>
              <div className="space-y-2"><Label>Phone</Label><Input value={editing.phone} onChange={e => setEditing({ ...editing, phone: e.target.value })} /></div>
              <div className="space-y-2"><Label>Email</Label><Input value={editing.email  ?? ''}
               onChange={e => setEditing({ ...editing, email: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Skills</Label><Input value={editing.skills  ?? ''} 
              onChange={e => setEditing({ ...editing, skills: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Availability</Label><Input value={editing.availability  ?? ''} 
              onChange={e => setEditing({ ...editing, availability: e.target.value || null })} /></div>
              <div className="space-y-2"><Label>Status</Label>
                <Select value={editing.status} 
                onValueChange={v => setEditing({ ...editing, status: v as 'ACTIVE' | 'INACTIVE'})}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSave} className="w-full">Save Volunteer</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      
    </div>
  );
}