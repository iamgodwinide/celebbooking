import ApplicationPageComponent from "./ApplicationPageComponent";

type Props = {
  params: {
    id: string;
    service: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ApplicationPage({ params, searchParams }: Props) {
  return <ApplicationPageComponent params={params} />;
}
