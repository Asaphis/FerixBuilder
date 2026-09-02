import { SimpleContentPage, DataTable, Badge } from "../components/UIComponents";

export default function TicketsPage() {
  return (
    <SimpleContentPage title="Support Tickets" icon="ticket">
      <DataTable
        headers={["Ticket #", "Subject", "Client", "Priority", "Assignee", "Status", "Opened"]}
        rows={[
          ["No tickets", "--", "--", <Badge variant="default">No Data</Badge>, "--", <Badge variant="default">No Data</Badge>, "--"],
        ]}
      />
    </SimpleContentPage>
  );
}
