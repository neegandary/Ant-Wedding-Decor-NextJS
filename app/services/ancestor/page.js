import dynamic from "next/dynamic";

const Ancestor = dynamic(() => import("../../pages/service/Ancestor"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function AncestorPage() {
  return <Ancestor />;
}
