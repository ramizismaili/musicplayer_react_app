import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {
  // const [country, setCountry] = useState('')
  // possible country code DZ,BY,CI,SN,TN,AU,AT,AZ,AR,BE,BG,BR,GB,HU,VE,VN,GH,DE,GR,DK,EG,ZM,IL,IN,ID,IE,ES,IT,KZ,CM,CA,KE,CN,CO,CR,MY,MA,MX,MZ,NG,NL,NZ,NO,AE,PE,PL,PT,RU,RO,SA,SG,US,TH,TZ,TR,UG,UZ,UA,UY,PH,FI,FR,HR,CZ,CL,CH,SE,ZA,KR,JP
  const country = "DZ";
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  console.log(country);

  // Around You section by geo.ipify using your current location
  //   useEffect(() => {
  //     axios
  //       .get(
  //         `https://geo.ipify.org/api/v2/country?apiKey=at_iaio6eJMY0i4MtZKgJ92QQ8TPMtP6`
  //       )
  //       .then((res) => setCountry(res?.data?.location?.country))
  //       .catch((err) => console.log(err))
  //       .finally(() => setLoading(false));
  //   }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-bold">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
