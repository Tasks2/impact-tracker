import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



export default function LoginPage() {
  const { login,user} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 
  // const navigateToDashboard = () => {
  //   if (user) {
  //     const target = user.role === 'admin' ? '/dashboard' : '/projects';
  //     navigate(target, { replace: true });
  //   }};

//   const role = JSON.parse(localStorage.getItem('impact_user') || '{}').role;

//  navigate(role === 'admin' ? '/dashboard' : '/projects');

  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  const ok = await login(email, password);

  setLoading(false);

  if (ok) {
  //   const target =
  // user?.role === 'admin'
  //   ? '/dashboard'
  //   : '/projects';

  //   navigate(target, { replace: true });
    navigate('/dashboard', { replace: true });
  } else {
    setError('Invalid email or password');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-7 w-7" onClick={() => navigate('/')} />
          </div>
          <CardTitle className="text-2xl font-display">Impact Tracker</CardTitle>
          <CardDescription>NGO Project & Beneficiary Management</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}
