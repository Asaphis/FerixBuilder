import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function ClientsPage() {
  return (
    <SimpleContentPage title="Client Directory" iconClass="level3" icon="👥">
      <DataTable
        headers={["Company", "Contact", "Email", "Active Projects", "Lifetime Value", "Status"]}
        rows={[
          ["Acme Corp", "Sarah Johnson", "sarah@acme.co", "2", "$54,200", <Badge variant="success">Active</Badge>],
          ["Zenith Labs", "Mike Chen", "mike@zenithlabs.io", "1", "$41,800", <Badge variant="success">Active</Badge>],
          ["Blue Harbor", "Lisa Park", "lisa@blueharbor.co", "1", "$28,500", <Badge variant="success">Active</Badge>],
          ["Northwind Co", "Tom Bradley", "tom@northwind.com", "1", "$19,200", <Badge variant="warning">Pending Invoice</Badge>],
          ["Stellar Industries", "Emma Ray", "emma@stellar.co", "1", "$36,400", <Badge variant="success">Active</Badge>],
        ]}
      />
    </SimpleContentPage>
  );
}
