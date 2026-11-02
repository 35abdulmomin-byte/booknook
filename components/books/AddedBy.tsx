"use client";

import { authClient } from "@/lib/auth-client";

const SEED_EMAIL = "library@booknook.com";

type Props = { name: string; email: string };

export default function AddedBy({ name, email }: Props) {
  const { data: session, isPending } = authClient.useSession();
  const isSeedBook = email === SEED_EMAIL;

  
  if (isSeedBook && isPending) {
    return <dd className="h-10" />;
  }

  const shown =
    isSeedBook && session
      ? { name: session.user.name, email: session.user.email }
      : { name, email };

  return (
    <>
      <dd className="font-semibold">{shown.name}</dd>
      <dd className="truncate text-xs text-muted-foreground">{shown.email}</dd>
    </>
  );
}