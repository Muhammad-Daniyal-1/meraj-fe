import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import Image from "next/image";

export default function MerajLogo() {
  return (
    <div className="flex w-full items-center justify-center">
      <Image src="/logo.png" alt="Meraj Logo" width={180} height={180} />
    </div>
  );
}
