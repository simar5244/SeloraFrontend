import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start py-8 md:py-12 gap-8">
          {/* Logo and copyright section - Left side */}
          <div className="w-full md:w-auto">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo />
              <h2 className="animate-[gradient_6s_linear_infinite] bg-gradient-to-r from-violet-200 via-violet-400 via-violet-100 via-violet-500 to-violet-200 bg-[length:200%_auto] bg-clip-text font-nacelle text-2xl font-semibold text-transparent">
                Selora
              </h2>
            </Link>
            <p className="text-sm text-violet-200/80 mb-4 max-w-xs">
              You can't scale what you can't see. Traditional HR tools show you what happened yesterday. Selora shows you what will happen tomorrow!
            </p>
            <a 
              href="mailto:helloselora@gmail.com" 
              className="text-violet-400 hover:text-white transition-colors text-sm"
            >
              helloselora@gmail.com
            </a>
            <p className="text-sm text-violet-200/65 mt-6">
              &copy; Selora 2025
            </p>
            <ul className="flex gap-2 mt-4">
              <li>
                <a
                  className="flex items-center justify-center text-violet-500 transition hover:text-violet-400"
                  href="https://x.com/simar5244"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  className="flex items-center justify-center text-violet-500 transition hover:text-violet-400"
                  href="https://linkedin.com/company/seloraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.5 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7 12h3v12H7V12Zm5.5 0h2.9l.2 1.3.2 1.2c.3-.6 1-1.5 2.6-1.5 2.8 0 3.2 1.8 3.2 4.3V24h-3v-6c0-1.4-.5-2.4-1.7-2.4-1 0-1.5.7-1.7 1.4-.1.4-.1.9-.1 1.4V24h-3V12Z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation links - Right side */}
          <div className="grid grid-cols-2 gap-12 w-full md:w-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-200">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/about"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/careers"
                  >
                    Careers
                  </a>
                </li>
                
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-200">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/#features"
                  >
                    Features
                  </a>
                </li>
                
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/#pricing"
                  >
                    Pricing 
                  </a>
                </li>
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/onboarding"
                  >
                    Onboarding
                  </a>
                </li>
                
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="https://app.seloraa.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy 
                  </a>
                </li>
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="https://app.seloraa.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    className="text-violet-200/65 transition hover:text-violet-500"
                    href="/demo"
                  >
                    Request a demo 
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
