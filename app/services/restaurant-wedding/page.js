import dynamic from "next/dynamic";

const Restaurant = dynamic(() => import("../../pages/service/Restaurant"), {
  ssr: true,
  loading: () => <div className="min-h-screen flex items-center justify-center">Loading...</div>
});

export default function RestaurantPage() {
  return <Restaurant />;
}
