import { StatCard, SectionHeader, PageCard, DataTable, Badge } from "../components/UIComponents";

export default function BillingPage() {
  return (
    <>
      <div className="stat-strip">
        <StatCard icon="diamond" value="$12,450" label="Monthly Recurring" />
        <StatCard icon="star" value="$45,250" label="Total Invoiced" />
        <StatCard icon="check" value="$32,100" label="Collected" />
        <StatCard icon="spark" value="$3,200" label="Pending Payouts" footnote="Review invoices" />
      </div>

      <SectionHeader title="Recent Invoices" subtitle="Latest billing activity across all clients" accent="Ledger" />

      <section className="widget-grid" style={{ gridTemplateColumns: "1fr" }}>
        <PageCard>
          <DataTable
            headers={["Invoice #", "Client", "Amount", "Status", "Due Date", "Action"]}
            rows={[
              ["INV-1042", "Acme Corp", "$4,500", <Badge variant="success">Paid</Badge>, "2026-08-15", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>View</button>],
              ["INV-1041", "Zenith Labs", "$8,200", <Badge variant="warning">Pending</Badge>, "2026-09-02", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Remind</button>],
              ["INV-1040", "Northwind Co", "$2,800", <Badge variant="success">Paid</Badge>, "2026-08-10", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>View</button>],
              ["INV-1039", "Blue Harbor", "$12,400", <Badge variant="danger">Overdue</Badge>, "2026-08-20", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>Follow Up</button>],
              ["INV-1038", "Stellar Industries", "$6,750", <Badge variant="success">Paid</Badge>, "2026-08-05", <button className="kpi-chip" style={{ border: "none", cursor: "pointer" }}>View</button>],
            ]}
          />
        </PageCard>
      </section>

      <SectionHeader title="Payment Methods" subtitle="Connected accounts and payout settings" accent="Settings" />

      <section className="widget-grid">
        <article className="widget-card">
          <div className="credit-card">
            <div className="card-brand">Primary Payout</div>
            <div className="card-number">•••• •••• •••• 4242</div>
            <div className="card-bottom">
              <div className="card-meta"><small>Bank</small><strong>Chase Business</strong></div>
              <div><small className="card-meta">Expires</small><strong>12/28</strong></div>
            </div>
          </div>
          <div className="list-line"><div><strong>Default Method</strong><small>Used for all payouts</small></div><Badge variant="success">Active</Badge></div>
        </article>

        <article className="widget-card">
          <div className="widget-card-head"><span className="widget-label"><span className="widget-badge finance">$</span>Stripe Connect</span></div>
          <div className="stat-row">
            <div className="stat-row-item"><small>Platform Fees</small><strong>2.9% + $0.30</strong><span>Standard</span></div>
            <div className="stat-row-item"><small>Payout Schedule</small><strong>Weekly</strong><span>Every Monday</span></div>
          </div>
          <div className="list-line"><div><strong>Account Balance</strong><small>Available for payout</small></div><strong style={{ fontSize: 18 }}>$3,200</strong></div>
        </article>
      </section>
    </>
  );
}
