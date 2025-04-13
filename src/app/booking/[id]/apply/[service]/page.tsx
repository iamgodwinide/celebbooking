import ApplicationPageComponent from "./ApplicationPageComponent";

type Props = {
  params: {
    id: string;
    service: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ApplicationPage({ params, searchParams }: any) {
  return <ApplicationPageComponent params={params} />;
}
