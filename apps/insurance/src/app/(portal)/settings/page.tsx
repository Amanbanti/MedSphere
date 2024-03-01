import {
  PageHeader,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  Switch,
  Badge,
} from '@medsphere/ui';

const profileSections = [
  { id: 'general', label: 'General', description: 'Display name, timezone, and locale preferences' },
  { id: 'notifications', label: 'Notifications', description: 'Email, SMS, and in-app alert preferences' },
  { id: 'security', label: 'Security', description: 'Password, MFA, and active sessions' },
  { id: 'integrations', label: 'Integrations', description: 'Connected systems and API keys' },
];

const orgSettings = [
  { key: 'default_facility', label: 'Default Facility', value: 'Main Campus' },
  { key: 'session_timeout', label: 'Session Timeout (minutes)', value: '30' },
  { key: 'audit_retention', label: 'Audit Retention (days)', value: '2555' },
  { key: 'break_glass_enabled', label: 'Break-Glass Access', value: 'Enabled' },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your Insurance portal preferences, security, and organization configuration."
        badge={<Badge variant="info">Insurance Portal</Badge>}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings Sections</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profileSections.map((section) => (
              <button
                key={section.id}
                type="button"
                className="w-full rounded-lg border border-border px-4 py-3 text-left hover:bg-muted/50"
              >
                <div className="font-medium">{section.label}</div>
                <div className="text-sm text-muted-foreground">{section.description}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Organization Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orgSettings.map((setting) => (
              <div key={setting.key} className="grid gap-2 sm:grid-cols-2 sm:items-center">
                <label className="text-sm font-medium">{setting.label}</label>
                <Input defaultValue={setting.value} />
              </div>
            ))}
            <div className="grid gap-2 sm:grid-cols-2 sm:items-center">
              <label className="text-sm font-medium">Language</label>
              <Select defaultValue="en-US" options={[
                { value: 'en-US', label: 'English (US)' },
                { value: 'es-ES', label: 'Español' },
                { value: 'fr-FR', label: 'Français' },
              ]} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Require MFA for privileged actions</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Reset</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
