import { useEffect, useState } from "react";
import MapContainer from './components/MapContainer';
import FormContainer from './components/FormContainer';
import DetailsContainer from './components/DetailsContainer';
import axios from "axios";

interface Props {
  ip_address: string;
  region: string;
  postcode: string;
  city: string;
  timezone: string;
  isp: string;
  longitude: number;
  latitude: number;
}

function App() {
  const [ipData, setIpData] = useState<Props | null>(null);
  const [coord, setCoord] = useState<{longitude: number, latitude: number} | null>(null);

  const handleSetUpData = (data: Props) => {
    setIpData(data);
    setCoord({longitude: data.longitude, latitude: data.latitude});
  };

  const getDate = async () => {
    const response = await axios.get("https://api.ipify.org/?format=json");
    setIpData(response.data.ip);
  };

  useEffect(() => {
    getDate();
  }, []);

  return (
    <>
      <div>
        <FormContainer setIpData={handleSetUpData} />
        <DetailsContainer ipData={ipData} />
        {coord && <MapContainer longitude={coord?.longitude} latitude={coord?.latitude} />}
      </div>
    </>
  )
}

export default App
