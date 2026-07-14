import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900">
      <Header />
      <main className="flex-1 flex flex-col gap-20 md:gap-32 py-10 md:py-16">
        <Hero />
        <Features />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}
