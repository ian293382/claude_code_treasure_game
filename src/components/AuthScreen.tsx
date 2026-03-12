import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface AuthScreenProps {
  onAuth: (token: string, email: string) => void;
  onGuest: () => void;
}

export default function AuthScreen({ onAuth, onGuest }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (mode: 'signin' | 'signup') => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        onAuth(data.token, data.email);
      }
    } catch {
      setError('Could not connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl mb-8 text-amber-900">🏴‍☠️ Treasure Hunt Game 🏴‍☠️</h1>
      <Card className="w-full max-w-md border-2 border-amber-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-amber-900">Welcome, Adventurer!</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="signin" className="flex-1">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
            </TabsList>

            {['signin', 'signup'].map((mode) => (
              <TabsContent key={mode} value={mode}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`${mode}-email`}>Email</Label>
                    <Input
                      id={`${mode}-email`}
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${mode}-password`}>Password</Label>
                    <Input
                      id={`${mode}-password`}
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit(mode as 'signin' | 'signup')}
                    />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <Button
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => handleSubmit(mode as 'signin' | 'signup')}
                    disabled={loading}
                  >
                    {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-4 text-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-amber-600">or</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-amber-400 text-amber-700 hover:bg-amber-50"
              onClick={onGuest}
            >
              Play as Guest
            </Button>
            <p className="text-xs text-amber-500 mt-2">Guest scores won't be saved</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
