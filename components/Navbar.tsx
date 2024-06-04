// import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { buttonVariants } from "./ui/Button";
import SignInButton from "@/ui/SignInButton";
import SignOutButton from "@/ui/SignOutButton";

const Navbar = async () => {
  //   const session = await getServerSession(authOptions);
  const session = undefined;

  return (
    <div className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-light-gold shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl  w-full flex justify-between items-center mx-auto">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          <span className="hover:no-underline">Text Similarity v1.0</span>
        </Link>

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          <Link
            href="/documentation"
            className={buttonVariants({ variant: "ghost" })}
          >
            <span className="dark:text-light-gold">Documentation</span>
          </Link>
          {session ? (
            <>
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
