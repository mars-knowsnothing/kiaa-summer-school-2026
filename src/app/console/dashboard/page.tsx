import {redirect} from "next/navigation";

import {getSession} from "@/lib/console/auth";
import {fetchRegistrations} from "@/lib/console/actions";
import {DashboardClient} from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.authenticated) redirect("/console/login");

  const registrations = await fetchRegistrations();

  return <DashboardClient registrations={registrations} />;
}
