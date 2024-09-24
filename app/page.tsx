import HomePageCard from "./components/HomePageCard";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="flex flex-col text-center min-h-screen items-center gap-y-12 w-full">
          <h1 className="text-6xl text-black font-serif border-b-2 border-black">
            Whats the weather?
          </h1>
          <input type="text" placeholder="Enter city name" className="bordered bg-white p-5 w-[50vw] text-black  rounded-full aspect-[10/1] text-xl" />
          <div className="flex flex-row space-x-2 w-9/12">
            <HomePageCard city="Oslo" />
            <HomePageCard city="Trondheim" />
            <HomePageCard city="Le Havre" />
            <HomePageCard city="New York" />
            <HomePageCard city="Madrid" />
          </div>
        </div>
      </div>
    </>
  );
}
