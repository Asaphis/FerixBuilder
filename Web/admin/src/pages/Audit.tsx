import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function AuditPage() {
  return (
    <SimpleContentPage title="Audit Logs" icon="book">
      <DataTable
        headers={["Timestamp", "Actor", "Action", "Resource", "IP Address", "Status"]}
        rows={[
          ["--", "--", "--", "--", "--", <Badge variant="default">No Data</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
