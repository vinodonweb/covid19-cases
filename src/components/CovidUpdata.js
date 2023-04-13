import { React, useState, useEffect } from 'react';
import '../index.css';

export default function CovidUpdata() {
  const [regionalData, setRegionalData] = useState([]);
   const [searchQuery, setSearchQuery] = useState('');   //for Search query

  const fetchCovidData = () => {
    fetch('https://api.rootnet.in/covid19-in/stats/latest')
      .then(response => response.json())
      .then(data => setRegionalData(data.data.regional));
  };

  useEffect(() => {
    fetchCovidData();
  }, []);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const filteredData = regionalData.filter(region => {
    return region.loc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-96 bg-blue-900">
        <div className="p-4">
          <form className="flex w-full max-w-sm">
            <input
              className="flex-grow w-80 px-11 py-3 rounded-md text-gray-700 bg-gray-200 rounded-l-md focus:outline-none focus:bg-white"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search By Name"
            />
            <button
              className="px-7 py-3 ml-3 rounded-xl text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <h1 className="text-6xl mt-4 font-black text-black-900 font-mono text-center">COVID-19 status</h1>
                    <section className="text-gray-600 body-font mt-5">
                        <div className="flex flex-wrap mt-4 mx-6 mb-8">
                            {regionalData.map(region => (
                                <div className="transition ease-in-out delay-200 hover:-translate-y-1 hover:scale-110 hover:bg--500 duration-30 hover:font-black xl:w-1/3 md:w-1/2 sm:w-1/2 p-4 shadow-md hover:border-solid hover:border-2 hover:border-red-600 hover:rounded-md" key={region.loc}>
                                     <span class="bg-red-100 text-red-800 text-bold text-sm font-normal mr-2 px-2.5 py-0.5 rounded-full  float-right"> {region.deaths > 6000 ? "Highest death" : <span className="hidden"> no deaths</span>}</span>
                                    <div className="border border-gray-200 p-6 rounded-lg">
                                        <h2 className="text-xl text-gray-900 font-mono font-extrabold title-font mb-2 text-center">{region.loc} </h2>
                                        <hr />
                                        <p className="leading-relaxed text-base font-medium">Total Case: <span className="text-green-800 font-bold" >{region.confirmedCasesIndian}</span></p>
                                        <p className="leading-relaxed text-base font-medium">number of people Recovered: <span className="text-green-500 font-black"> {region.discharged}</span></p>
                                        <p className="leading-relaxed text-base font-medium">Total death:<span className="text-red-700 font-bold">{region.deaths}</span> </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <footer className="bg-black h-28">
                      <div className="flex items-center justify-center h-full mt-7">
                            <p className="text-ceter text-white">made with ❤️ by<spam className=" font-bold hover:text-red-700 hover:font-black"> <a href="https://vinods-portfolio.netlify.app/" target="_blank"> Vinod Sharma</a></spam></p>
                      </div>
                    </footer>
        </div>
     )
 }