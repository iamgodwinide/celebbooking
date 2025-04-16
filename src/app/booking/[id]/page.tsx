import ServiceComponent from "./ServiceComponent";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BookingPage({ params, searchParams }: PageProps) {
  const _params = await params;
  return <ServiceComponent params={_params}/>;
}
