import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function DeliveriesPage() {
  return (
    <SimpleContentPage title="Deliveries Pipeline" iconClass="rank" icon="🚚">
      <DataTable
        headers={["Project", "Client", "Scheduled", "Assignee", "Milestone", "Status"]}
        rows={[
          ["Blue Harbor Marketing", "Blue Harbor", "2026-09-05", "Design Team", "Final QA Pass", <Badge variant="info">On Track</Badge>],
          ["Acme Corp Redesign", "Acme Corp", "2026-09-15", "Dev Team A", "Round 2 Revisions", <Badge variant="warning">At Risk</Badge>],
          ["Stellar Product Launch", "Stellar Industries", "2026-09-20", "Design Team", "Content Finalization", <Badge variant="info">On Track</Badge>],
          ["Zenith E-commerce Plus", "Zenith Labs", "2026-10-02", "Dev Team B", "Payment Integration", <Badge variant="info">On Track</Badge>],
          ["Northwind Intranet", "Northwind Co", "2026-11-01", "Platform Team", "Architecture Phase", <Badge variant="success">Scheduled</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
