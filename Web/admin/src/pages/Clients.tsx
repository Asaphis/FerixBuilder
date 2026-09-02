import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function ClientsPage() {
  return (
    <SimpleContentPage title="Client Directory" icon="users">
      <DataTable
        headers={["Company", "Contact", "Email", "Active Projects", "Lifetime Value", "Status"]}
        rows={[
          ["No clients", "--", "--", "0", "$0", <Badge variant="default">No Data</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
