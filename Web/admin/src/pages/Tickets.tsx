import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function TicketsPage() {
  return (
    <SimpleContentPage title="Support Tickets" icon="ticket">
      <DataTable
        headers={["Ticket #", "Subject", "Client", "Priority", "Assignee", "Status", "Opened"]}
        rows={[
          ["#784", "Domain DNS not propagating", "Blue Harbor", <Badge variant="danger">High</Badge>, "Platform Team", <Badge variant="warning">Open</Badge>, "2h ago"],
          ["#783", "Invoice download link broken", "Acme Corp", <Badge variant="warning">Medium</Badge>, "Finance", <Badge variant="info">In Progress</Badge>, "5h ago"],
          ["#782", "CMS editor freezes on save", "Zenith Labs", <Badge variant="warning">Medium</Badge>, "Dev Team A", <Badge variant="info">In Progress</Badge>, "Yesterday"],
          ["#781", "Need to add team member", "Northwind Co", <Badge variant="default">Low</Badge>, "Ops", <Badge variant="success">Closed</Badge>, "2d ago"],
          ["#780", "Billing cycle change request", "Stellar Industries", <Badge variant="default">Low</Badge>, "Finance", <Badge variant="success">Closed</Badge>, "3d ago"],
        ]}
      />
    </SimpleContentPage>
  );
}
