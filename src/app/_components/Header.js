import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <header className="border-b border-primary-900 px-4 sm:px-8 py-4 sm:py-5 bg-black">
  <div className="max-w-7xl mx-auto">
    <nav className="z-10 text-lg sm:text-xl">
      <ul className="flex justify-between items-center">
        <li>
          <Link href="/" className="hover:text-accent-400 transition-colors text-white text-base sm:text-lg font-bold">
            BLOG APP
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-accent-400 transition-colors">
            <Button>
              Create Post
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>

  );
}