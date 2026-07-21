import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getProjects, saveProject, deleteProject } from '@/lib/project-api';
import { Project, ProjectStatus} from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, ListChecks } from 'lucide-react';

const statusColors: Record<ProjectStatus, string> = {
  PLANNED: 'bg-muted text-muted-foreground',
  ACTIVE: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
 // const [taskDialogProject, setTaskDialogProject] = useState<Project | null>(null);
// const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    setLoading(true);
    getProjects().then(data => {
      setAllProjects(data);
      setLoading(false);
    });
  }, [refresh]);

  // const projects = user?.role === 'field_worker'
  //   ? allProjects.filter(p => p.assignedWorkers.includes(user.id))
  //   : allProjects;

  const projects = allProjects;

  const emptyProject: Project = {
  id: '',
  name: '',
  description: '',
  startDate: '',
  endDate: null,
  status: 'PLANNED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

  const openNew = () => { setEditing({ ...emptyProject, id: crypto.randomUUID() }); setDialogOpen(true); };
  const openEdit = (p: Project) => { setEditing({ ...p }); setDialogOpen(true); };

  const handleSave = async () => {
    if (!editing) return;
    editing.updatedAt = new Date().toISOString();
    await saveProject(editing);
    setDialogOpen(false);
    setRefresh(r => r + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setRefresh(r => r + 1);
  };

  // const toggleTask = async (task: ProjectTask) => {
  //   if (!taskDialogProject) return;
  //   const updated = {
  //     ...taskDialogProject,
  //     tasks: taskDialogProject.tasks.map(t =>
  //       t.id === task.id ? { ...t, completed: !t.completed } : t
  //     ),
  //   };
  //   await saveProject(updated);
  //   setTaskDialogProject(updated);
  //   setRefresh(r => r + 1);
  // };

  // const addTask = async (title: string) => {
  //   if (!taskDialogProject || !title.trim()) return;
  //   const updated = {
  //     ...taskDialogProject,
  //     tasks: [...taskDialogProject.tasks, { id: crypto.randomUUID(), title: title.trim(), completed: false }],
  //   };
  //   await saveProject(updated);
  //   setTaskDialogProject(updated);
  //   setRefresh(r => r + 1);
  // };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Loading projects…</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Projects</h1>
        {user?.role === 'admin' && (
          <Button onClick={openNew} className="gap-2"><Plus className="h-4 w-4" /> New Project</Button>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Start</TableHead>
                  <TableHead className="hidden md:table-cell">End</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell><Badge className={statusColors[p.status]} variant="secondary">{p.status}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{p.startDate}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{p.endDate}</TableCell>
                    
                    <TableCell>
                      <div className="flex gap-1">
                        {/* <Button size="icon" variant="ghost"><ListChecks className="h-4 w-4" /></Button> */}
                        {user?.role === 'admin' && (
                          <>
                            <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {projects.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No projects found</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle className="font-display">{editing?.createdAt === editing?.updatedAt ? 'New Project' : 'Edit Project'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2"><Label>Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Status</Label>
                  <Select value={editing.status} onValueChange={(v) => setEditing({ ...editing, status: v as ProjectStatus })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={editing.startDate} onChange={e => setEditing({ ...editing, startDate: e.target.value })} /></div>
                <div className="space-y-2"><Label>End Date</Label><Input type="date" value={editing.endDate} onChange={e => setEditing({ ...editing, endDate: e.target.value })} /></div>
              </div>
              
              <Button onClick={handleSave} className="w-full">Save Project</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Task Milestones Dialog */}
      {/* <Dialog open={!!taskDialogProject} onOpenChange={(o) => { if (!o) setTaskDialogProject(null); }}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="font-display">Milestones — {taskDialogProject?.name}</DialogTitle></DialogHeader>
          {taskDialogProject && (
            <div className="space-y-3">
              {taskDialogProject.tasks.map(t => (
                <div key={t.id} className="flex items-center gap-3">
                  <Checkbox checked={t.completed} onCheckedChange={() => toggleTask(t)} />
                  <span className={t.completed ? 'line-through text-muted-foreground' : ''}>{t.title}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Input
                  placeholder="New task…"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { addTask(newTaskTitle); setNewTaskTitle(''); } }}
                />
                <Button size="sm" onClick={() => { addTask(newTaskTitle); setNewTaskTitle(''); }}>Add</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </div>
  );
}