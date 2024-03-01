import { createRng, pick, escapeTs } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const PORTALS = [
  { slug: 'doctor-portal', title: 'Doctor', screens: ['OrderEntry', 'ResultsReview', 'MedicationReconciliation', 'ProblemList', 'CarePlanEditor', 'ClinicalNotes', 'ReferralManager', 'DischargeSummary'] },
  { slug: 'nurse-portal', title: 'Nurse', screens: ['MAR', 'VitalSignsEntry', 'IntakeAssessment', 'WoundCare', 'PatientEducation', 'FallRiskAssessment', 'IsolationPrecautions', 'ShiftReport'] },
  { slug: 'pharmacy-portal', title: 'Pharmacy', screens: ['OrderVerification', 'IVCompounding', 'FormularyLookup', 'PriorAuthPharmacy', 'MedicationHistory', 'DrugUtilizationReview', 'NarcoticLog', 'PatientCounseling'] },
  { slug: 'laboratory-portal', title: 'Laboratory', screens: ['OrderEntryLab', 'SpecimenCollection', 'ResultValidation', 'CriticalValueCallback', 'MicrobiologyCulture', 'BloodBank', 'LabInstrumentMonitor', 'SendOutLab'] },
  { slug: 'radiology-portal', title: 'Radiology', screens: ['OrderEntryImaging', 'ProtocolSelection', 'ContrastAdministration', 'StructuredReporting', 'PeerReviewQueue', 'RadiationDoseMonitor', 'PacsViewerLaunch', 'CriticalFindingsComm'] },
  { slug: 'billing', title: 'Billing', screens: ['ClaimEditor', 'ChargeCapture', 'PaymentPosting', 'DenialManagement', 'StatementGeneration', 'FeeScheduleEditor', 'PriorAuthBilling', 'AccountsReceivable'] },
  { slug: 'insurance', title: 'Insurance', screens: ['EligibilityInquiry', 'ClaimAdjudication', 'AppealsWorkflow', 'BenefitVerification', 'PriorAuthInsurance', 'ProviderCredentialing', 'PayerContract', 'RemittanceAdvice'] },
  { slug: 'patient-portal', title: 'Patient', screens: ['HealthSummary', 'TestResults', 'MedicationList', 'SecureMessaging', 'BillPay', 'VisitHistory', 'ImmunizationRecord', 'AdvanceDirectives'] },
  { slug: 'admin', title: 'Admin', screens: ['UserProvisioning', 'RoleMatrix', 'FacilityConfiguration', 'IntegrationMonitor', 'ComplianceDashboard', 'DepartmentSetup', 'ProviderOnboarding', 'SystemHealth'] },
  { slug: 'analytics', title: 'Analytics', screens: ['QualityMeasures', 'LengthOfStay', 'ReadmissionRisk', 'OperationalDashboard', 'FinancialKPIs', 'ProviderProductivity', 'PatientSatisfaction', 'InfectionControl'] },
  { slug: 'telemedicine', title: 'Telemedicine', screens: ['VirtualWaitingRoom', 'VideoConsult', 'EVisitDocumentation', 'RemoteMonitoring', 'DigitalPrescribing', 'InterpreterServices', 'AsyncMessaging', 'TelehealthBilling'] },
  { slug: 'notifications', title: 'Notifications', screens: ['TemplateDesigner', 'CampaignScheduler', 'DeliveryAnalytics', 'PreferenceCenter', 'EscalationRules', 'ChannelConfiguration', 'OptOutManagement', 'AlertSubscriptions'] },
];

const SCREEN_DATA = {
  OrderEntry: { columns: ['orderId', 'patient', 'test', 'priority', 'status'], entity: 'orders' },
  MAR: { columns: ['medication', 'dose', 'route', 'scheduledTime', 'status'], entity: 'medications' },
  ClaimEditor: { columns: ['claimId', 'patient', 'payer', 'amount', 'status'], entity: 'claims' },
  ResultsReview: { columns: ['resultId', 'patient', 'test', 'value', 'flag'], entity: 'results' },
};

function generateClinicalScreen(portal, screen) {
  const rng = createRng((portal.slug + screen).length * 12345);
  const dataConfig = SCREEN_DATA[screen] ?? {
    columns: ['id', 'name', 'status', 'updatedAt'],
    entity: screen.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1),
  };

  const rowCount = 12;
  const sampleRows = Array.from({ length: rowCount }, (_, i) => {
    const row = dataConfig.columns.map((col) => {
      if (col === 'status') return `status: ['active', 'pending', 'completed', 'critical'][${i} % 4]`;
      if (col.includes('Time') || col.includes('At')) return `${col}: '${8 + (i % 12)}:${String(i * 5 % 60).padStart(2, '0')}'`;
      if (col.includes('amount') || col === 'value') return `${col}: ${(rng() * 1000).toFixed(2)}`;
      return `${col}: '${escapeTs(col)} ${i + 1}'`;
    });
    return `{ id: '${screen.toUpperCase()}-${1000 + i}', ${row.join(', ')} }`;
  }).join(',\n  ');

  const detailSections = Array.from({ length: 8 }, (_, s) => {
    const sectionTitle = ['Overview', 'Clinical Details', 'History', 'Alerts', 'Documentation', 'Orders', 'Results', 'Billing'][s];
    return `        <Card>
          <CardHeader>
            <CardTitle>${sectionTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between border-b border-border pb-2 text-sm">
                <span className="text-muted-foreground">${sectionTitle} field {n}</span>
                <span className="font-medium">Sample value {n + ${s}}</span>
              </div>
            ))}
          </CardContent>
        </Card>`;
  }).join('\n');

  const formFields = Array.from({ length: 10 }, (_, f) => {
    const labels = ['Patient MRN', 'Ordering Provider', 'Priority', 'Clinical Indication', 'Notes', 'Start Date', 'End Date', 'Location', 'Department', 'Attending'][f];
    return `            <div className="grid gap-2">
              <label className="text-sm font-medium">${labels}</label>
              <Input defaultValue="" placeholder="Enter ${labels.toLowerCase()}" />
            </div>`;
  }).join('\n');

  return `import { useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, PageHeader, DataTable, StatusPill,
  Button, Input, Select, Badge, Tabs, TabsList, TabsTrigger, TabsContent,
} from '@medsphere/ui';

const ${screen.toLowerCase()}Data = [
  ${sampleRows},
];

const statusFilters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

export default function ${screen}Module() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = filter === 'all'
    ? ${screen.toLowerCase()}Data
    : ${screen.toLowerCase()}Data.filter((row) => row.status === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="${screen.replace(/([A-Z])/g, ' $1').trim()}"
        description="${portal.title} portal — ${screen.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} clinical workflow module."
        badge={<Badge variant="info">${portal.title}</Badge>}
        actions={
          <>
            <Button variant="outline">Export</Button>
            <Button>New ${screen.replace(/([A-Z])/g, ' $1').trim()}</Button>
          </>
        }
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="detail">Detail View</TabsTrigger>
          <TabsTrigger value="entry">Data Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>${screen.replace(/([A-Z])/g, ' $1').trim()} Worklist</CardTitle>
              <Select
                value={filter}
                onValueChange={setFilter}
                options={statusFilters}
              />
            </CardHeader>
            <CardContent>
              <DataTable
                columns={[
${dataConfig.columns.map((col) => `                  { key: '${col}', header: '${col.charAt(0).toUpperCase() + col.slice(1)}', cell: (row) => ${
  col === 'status'
    ? `<StatusPill status={row.status}>{row.status}</StatusPill>`
    : `row.${col}`
} },`).join('\n')}
                ]}
                data={filtered}
                keyExtractor={(row) => row.id}
                onRowClick={(row) => setSelectedId(row.id)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detail">
          <div className="grid gap-4 md:grid-cols-2">
${detailSections}
          </div>
        </TabsContent>

        <TabsContent value="entry">
          <Card>
            <CardHeader>
              <CardTitle>New ${screen.replace(/([A-Z])/g, ' $1').trim()} Entry</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
${formFields}
              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button>Submit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedId && (
        <p className="text-sm text-muted-foreground">Selected record: {selectedId}</p>
      )}
    </div>
  );
}
`;
}

function generatePortalRoute(portal, screen) {
  const kebabScreen = screen.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
  return `import ${screen}Module from '../../../features/${kebabScreen}/${kebabScreen}-module';

export default function Page() {
  return <${screen}Module />;
}
`;
}

export async function generatePortalFeatures(root, stats) {
  for (const portal of PORTALS) {
    for (const screen of portal.screens) {
      const kebabScreen = screen.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
      await writeFile(root, `apps/${portal.slug}/src/features/${kebabScreen}/${kebabScreen}-module.tsx`, generateClinicalScreen(portal, screen), stats);
      await writeFile(root, `apps/${portal.slug}/src/app/(portal)/${kebabScreen}/page.tsx`, generatePortalRoute(portal, screen), stats);
    }
  }
}
