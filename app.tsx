import { AdsenseHead } from "@/components/AdsenseHead";
import { AppShell } from "@/components/AppShell";
import { DisqusComments } from "@/components/DisqusComments";
import { usePageLoader } from "@/components/PageLoader";
import { PageLoader } from "@/components/PageLoader";

export default function App() {
  const { loading } = usePageLoader(1200);

  if (loading) return <PageLoader label="Menyiapkan ALHIKMAH..." />;

  return (
    <>
      <AdsenseHead />
      <AppShell>
        <section className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
          <h1 className="font-serif text-3xl font-bold text-emerald-950">
            Selamat Datang di ALHIKMAH
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Portal Islam terpercaya untuk pendidikan, sejarah, sosial, dan budaya.
          </p>
        </section>

        <div
          data-tappx-slot
          data-tappx-key=""
          className="mt-6 h-24 overflow-hidden rounded-xl border border-emerald-900/10 bg-emerald-100/50"
        />

        <DisqusComments
          identifier="home-alhikmah"
          url="https://alhikmah.my.id/"
          title="ALHIKMAH - Portal Islam Terpercaya"
        />
      </AppShell>
    </>
  );
}