import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function BillingPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="diamond" value="$0" label="Monthly Recurring" />
        <StatCard icon="star" value="$0" label="Total Invoiced" />
        <StatCard icon="check" value="$0" label="Collected" />
        <StatCard icon="spark" value="$0" label="Pending Payouts" footnote="Review invoices" />
      </div>

      <SectionHeader title="Recent Invoices" subtitle="Latest billing activity across all clients" accent="Ledger" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Invoice #", "Client", "Amount", "Status", "Due Date", "Action"]}
            rows={[
              ["No invoices", "--", "$0", <Badge variant="default">No Data</Badge>, "--", <button className="kpi-chip" style={{ border: "none", cursor: "pointer", opacity: 0.5 }} disabled>View</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Payment Methods" subtitle="Connected accounts and payout settings" accent="Settings" />

      <section className="widget-grid">
        <article className="widget-card" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
          <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
            <strong>Payment Gateway Not Connected</strong>
            <small>Connect Stripe or payment provider to manage billing</small>
          </div>
        </article>
      </section>
    </>
  );
}
