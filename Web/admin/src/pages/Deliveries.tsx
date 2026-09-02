import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function DeliveriesPage() {
  return (
    <SimpleContentPage title="Deliveries Pipeline" icon="truck">
      <DataTable
        headers={["Project", "Client", "Scheduled", "Assignee", "Milestone", "Status"]}
        rows={[
          ["No deliveries", "--", "--", "--", "--", <Badge variant="default">No Data</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
