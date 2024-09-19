import HomePageCard from "./components/HomePageCard";

export default function Home() {
  return (
    <>
      <div className="flex flex-col text-center h-screen items-center justify-center">
        <div className="inline-block p-4" >
          <input type="text" placeholder="Enter city name" className="input-bordered bg-white p-2 w-auto text-black rounded-lg" />
        </div>
        <div className="flex flex-row space-x-2 w-9/12">
          <HomePageCard city="Oslo" />
          <HomePageCard city="Trondheim" />
          <HomePageCard city="Le Havre" />
          <HomePageCard city="New York" />
          <HomePageCard city="Madrid" />
        </div>
      </div>  
    </>
  );
}
