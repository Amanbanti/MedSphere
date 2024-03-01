'use client';

import { useState } from 'react';
import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
  Badge,
  StatusPill,
} from '@medsphere/ui';
import { Search, Filter, X } from 'lucide-react';

const categories = [
  {
    "id": "appointments",
    "label": "Appointments",
    "count": 420
  },
  {
    "id": "records",
    "label": "Records",
    "count": 209
  },
  {
    "id": "messages",
    "label": "Messages",
    "count": 121
  },
  {
    "id": "billing",
    "label": "Billing",
    "count": 104
  }
];

const sampleResults = [
  {
    id: 'patient-portal-result-1',
    title: 'Appointments record match',
    subtitle: 'Updated 2 hours ago',
    category: 'Appointments',
    status: 'active',
    relevance: 95.0,
  },
  {
    id: 'patient-portal-result-2',
    title: 'Records record match',
    subtitle: 'Updated Yesterday',
    category: 'Records',
    status: 'completed',
    relevance: 92.0,
  },
  {
    id: 'patient-portal-result-3',
    title: 'Messages record match',
    subtitle: 'Updated 3 days ago',
    category: 'Messages',
    status: 'pending',
    relevance: 89.0,
  },
  {
    id: 'patient-portal-result-4',
    title: 'Billing record match',
    subtitle: 'Updated 2 hours ago',
    category: 'Billing',
    status: 'active',
    relevance: 86.0,
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = sampleResults.filter((result) => {
    const matchesQuery =
      !query ||
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || result.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search"
        description="Full-text search across patient records, documents, and workflows."
      />

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search patients, orders, reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className="inline-flex items-center gap-2"
              >
                <Badge variant={activeCategory === cat.label ? 'default' : 'outline'}>
                  {cat.label} ({cat.count})
                </Badge>
              </button>
            ))}
            {activeCategory && (
              <button type="button" onClick={() => setActiveCategory(null)} className="text-sm text-muted-foreground">
                <X className="mr-1 inline h-3 w-3" />
                Clear filter
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Results {query && <span className="text-muted-foreground">for &quot;{query}&quot;</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No results found. Try adjusting your search or filters.</p>
          ) : (
            filtered.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30"
              >
                <div>
                  <div className="font-medium">{result.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {result.category} · {result.subtitle}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{result.relevance}% match</span>
                  <StatusPill status={result.status}>{result.status}</StatusPill>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
