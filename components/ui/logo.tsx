import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`h-8 w-8 overflow-hidden ${className}`}>
      <Image 
        src="/logo1.png" 
        alt="Selora Logo" 
        width={32} 
        height={32}
        className="h-full w-full object-contain"
        priority
      />
    </div>
  );
}
