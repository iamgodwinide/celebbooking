import CelebrityComponent from "./CelebrityComponent";

export default async function EditCelebrityPage({ params }: { params: { id: string } }) {
    const _params = await params;
    return <CelebrityComponent
        params={_params}
    />
}
