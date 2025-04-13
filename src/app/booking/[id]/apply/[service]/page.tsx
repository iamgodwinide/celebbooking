import ApplicationPageComponent from "./ApplicationPageComponent";


export default function ApplicationPage({
  params,
}: {
  params: { id: string; service: string };
}) {
  return <ApplicationPageComponent
  params={params}
  />
}
