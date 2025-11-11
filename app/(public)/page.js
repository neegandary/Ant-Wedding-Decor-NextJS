import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("../pages/Home"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function Home() {
  return <HomePage />;
}
