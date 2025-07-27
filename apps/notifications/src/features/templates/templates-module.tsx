'use client';

import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, Button, Input, Select,
} from '@medsphere/ui';

export default function TemplatesModulePage() {
  const [code, setCode] = useState('appointment-reminder');
  const [channel, setChannel] = useState('EMAIL');
  const [subject, setSubject] = useState('Your appointment on {{date}}');
  const [body, setBody] = useState('Hello {{patientName}}, your appointment with {{providerName}} is scheduled for {{date}} at {{time}}.');

  const preview = body
    .replace('{{patientName}}', 'Jane Doe')
    .replace('{{providerName}}', 'Dr. Smith')
    .replace('{{date}}', 'July 28, 2026')
    .replace('{{time}}', '10:30 AM');

  return (
    <div className="space-y-6">
      <PageHeader title="Template Editor" description="Design notification templates with variable interpolation." actions={<Button>Save Template</Button>} />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Template</CardTitle></CardHeader>
          <CardContent className="grid gap-4">
            <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Template code" />
            <Select value={channel} onValueChange={setChannel} options={[
              { value: 'EMAIL', label: 'Email' },
              { value: 'SMS', label: 'SMS' },
              { value: 'PUSH', label: 'Push' },
              { value: 'WHATSAPP', label: 'WhatsApp' },
            ]} />
            {channel === 'EMAIL' && (
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
            )}
            <textarea
              className="min-h-[160px] w-full rounded-md border border-border bg-background p-3 text-sm"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Variables: {'{{patientName}}'}, {'{{providerName}}'}, {'{{date}}'}, {'{{time}}'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Preview</CardTitle></CardHeader>
          <CardContent>
            {channel === 'EMAIL' && <p className="mb-2 font-medium">{subject.replace('{{date}}', 'July 28, 2026')}</p>}
            <p className="whitespace-pre-wrap text-sm">{preview}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
