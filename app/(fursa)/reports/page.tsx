import Loading from "../loading";

export default function Reports() {
  return (
    <main className="flex min-h-screen flex-col items-center  ">
    hello This is Reports page
    {/* <Loading /> */}

    <div className='overflow-y-auto h-40 flex flex-col'>

{
    Array(10).fill(null).map((_,i)=><span className="bg-blue-300" key={i}>franci</span>)
}

    </div>
    </main>
  );
}
