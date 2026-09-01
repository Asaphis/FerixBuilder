import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function AuditPage() {
  return (
    <SimpleContentPage title="Audit Logs" iconClass="tasks" icon="📋">
      <DataTable
        headers={["Timestamp", "Actor", "Action", "Resource", "IP Address", "Status"]}
        rows={[
          ["2026-08-31 14:32:10", "Ferix Admin", "Deployed Build", "Acme Corp / #4857", "203.0.113.42", <Badge variant="success">Success</Badge>],
          ["2026-08-31 13:18:44", "sarah@acme.co", "Submitted Revision", "RV-301", "198.51.100.8", <Badge variant="success">Success</Badge>],
          ["2026-08-31 11:02:03", "Ferix Admin", "Updated Settings", "Notification Prefs", "203.0.113.42", <Badge variant="success">Success</Badge>],
          ["2026-08-31 09:45:21", "mike@zenithlabs.io", "Failed Login", "Auth", "192.0.2.55", <Badge variant="danger">Blocked</Badge>],
          ["2026-08-31 08:12:58", "Ferix Admin", "Created Invoice", "INV-1042", "203.0.113.42", <Badge variant="success">Success</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
