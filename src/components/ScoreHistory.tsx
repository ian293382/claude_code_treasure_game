import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ScoreRow {
  score: number;
  result: 'win' | 'tie' | 'loss';
  played_at: string;
}

interface ScoreHistoryProps {
  token: string;
}

export default function ScoreHistory({ token }: ScoreHistoryProps) {
  const [scores, setScores] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/scores', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return null;
  if (scores.length === 0) return null;

  return (
    <Card className="w-full max-w-md mt-6 border-2 border-amber-300 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-amber-900">Your Score History</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-amber-200 text-amber-700">
              <th className="text-left py-1">Date</th>
              <th className="text-right py-1">Score</th>
              <th className="text-right py-1">Result</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row, i) => (
              <tr key={i} className="border-b border-amber-100 last:border-0">
                <td className="py-1 text-amber-800">
                  {new Date(row.played_at).toLocaleDateString()}
                </td>
                <td className={`py-1 text-right font-mono ${
                  row.score > 0 ? 'text-green-600' : row.score < 0 ? 'text-red-600' : 'text-amber-600'
                }`}>
                  ${row.score}
                </td>
                <td className="py-1 text-right">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    row.result === 'win' ? 'bg-green-100 text-green-700' :
                    row.result === 'loss' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {row.result.charAt(0).toUpperCase() + row.result.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
