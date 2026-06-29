import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhatWeDo />
      </main>
    </>
  );
}
