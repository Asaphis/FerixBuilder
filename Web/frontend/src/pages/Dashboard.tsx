export { dashboardMilestones, dashboardSections, dashboardTasks } from "./WorkspacePage";
import WorkspacePage from "./WorkspacePage";

export default function Dashboard() {
  return <WorkspacePage page="dashboard" />;
}
