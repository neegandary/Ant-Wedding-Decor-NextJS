import dynamic from "next/dynamic";

const Event = dynamic(() => import("../../pages/service/Event"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function EventPage() {
  return <Event />;
}
