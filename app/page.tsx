import Link from "next/link";
import { getServerSession } from "next-auth";
import { FaGithub } from "react-icons/fa";
import { CiLogout, CiMail } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

import { authOptions } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main className="flex min-h-dvh items-center justify-center px-4 py-8">
        <Card className="w-full max-w-sm sm:max-w-md">
          <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <FaGithub className="size-7" />
            </div>
            <div className="space-y-1">
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
                Sign in with your GitHub account to continue.
              </CardDescription>
            </div>

            <Link
              href="/api/auth/signin/github"
              className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-xs/relaxed font-medium text-primary-foreground whitespace-nowrap transition-all hover:bg-primary/80"
            >
              <FaGithub className="size-4" />
              Continue with GitHub
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-8">
      <Card className="w-full max-w-sm sm:max-w-lg shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
          <Avatar className="size-24 ring-4 ring-border">
            <AvatarImage
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <CardTitle className="text-2xl">
              {session.user?.name}
            </CardTitle>
            <CardDescription>
              Signed in successfully
            </CardDescription>
            <Badge variant="secondary" className="mt-2">
              Authenticated
            </Badge>
          </div>
        </CardContent>

        <Separator />

        <CardContent className="flex flex-col gap-6 pt-6 pb-8">
          <div className="flex items-center gap-3 rounded-lg border p-4">
            <FaRegUserCircle className="size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="truncate font-medium">{session.user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border p-4">
            <CiMail className="size-5 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="truncate font-medium">{session.user?.email}</p>
            </div>
          </div>

          <details className="rounded-lg border bg-muted/40">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
              Session JSON
            </summary>
            <pre className="overflow-auto p-4 text-xs">
              {JSON.stringify(session, null, 2)}
            </pre>
          </details>

          <form action="/api/auth/signout" method="POST">
            <Button type="submit" variant="destructive" className="w-full">
              <CiLogout className="mr-2 size-4" />
              Sign Out
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
