import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    console.log(selectedGenre)
    console.log('end data:', filteredMovies)
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex mx-10 md:mx-10 flex-col items-center">
      <nav className=" ml-[5rem] flex gap-8 md:gap-20">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${selectedGenre === g._id ? "bg-gray-200" : ""
              }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Genre-Based</h1>
          <SliderUtil data={filteredMovies} />
          {console.log('start data:', filteredMovies)}
        </div>
        <div className="w-full lg:w-[100rem] mb-8 ">
          <h1 className="mb-5">Recommendation</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

      </section>
    </div>
  );
};

export default MoviesContainerPage;
