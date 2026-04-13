import {redirect} from "next/navigation";

import {getSession} from "@/lib/console/auth";

export const dynamic = "force-dynamic";

export default async function ConsolePage() {
  const session = await getSession();
  redirect(session.authenticated ? "/console/dashboard" : "/console/login");
}
