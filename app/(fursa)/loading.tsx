import Spinner from "@/components/spinner/Spinner";

export default function Loading(){
    return (
        <main className={'main-loading'}>
            <div className={'febo-container'}>
                <h1 className="febo-text febo-color-transition">FCS</h1>

            </div>

            <Spinner />
        </main>
    )
}
