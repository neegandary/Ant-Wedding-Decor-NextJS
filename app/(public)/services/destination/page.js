import dynamic from "next/dynamic";

const Destination = dynamic(() => import("../../../pages/service/Destination"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function DestinationPage() {
  return <Destination />;
}
