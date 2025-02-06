import Icons from "@/components/icons";
import { getIcons } from "@/lib/core";

export default async function Home() {
  const icons = await getIcons();

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Icons initialIcons={icons} />
      </main>
    </>
  );
}