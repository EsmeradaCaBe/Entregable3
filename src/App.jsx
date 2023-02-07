import { useEffect, useState } from 'react'
import './App.css'
import { getRandomNumber } from './util/handleRandom'
import LocationInfo from './components/LocationInfo'
import axios from 'axios'
import { Pagination } from './components/Pagination'
import ResidentList from './components/ResidentList'
import ResidentForm from './components/ResidentForm'


const RESIDENTS_PERPAGE = 12;

function App() {
  //Estado que almacena lainformacion de la location
  const [location, setLocation] = useState()
  //Estado que almacena el valor del imput no controlado
  const [nameLocation, setNameLocation] = useState("")
  const [page, setPage] = useState (1)

  //Funcion que se ejecuta en el submit del formulario
  const handleSubmit = (e) => {
    e.preventrDefault()
    setNameLocation(e.target.idLocation.value) 
    }
   // Funcion que obtiene los residentes dependiendo de la pagina
    const pagination = () => {
      if(!location) return []
      const maxLimit = page * RESIDENTS_PERPAGE;
      const minLimit = maxLimit - RESIDENTS_PERPAGE;      
      const newResidents = location?.residents.slice(minLimit, maxLimit);
      return newResidents
  }

  
  //Efecto que se ejecuta en el primer render y cuando cambia nameLocation
 useEffect(() => {
  setPage(1)
  const dimension = nameLocation === "" ? getRandomNumber(126): nameLocation
  const URL =`https://rickandmortyapi.com/api/location/${dimension}`
  axios.get(URL) 
  .then((res) => setLocation(res.data))
  .catch((err) => console.log(err))
 },[nameLocation])

  return (
    
    <div className="App">
      <header className="header">
        <img src="header.jpg" alt="" />
      </header>
      <ResidentForm handleSubmit={handleSubmit}/>
      <LocationInfo  location={location}/>
      <Pagination setPage={setPage} RESIDENTS_PERPAGE={RESIDENTS_PERPAGE} location={location}/>
      <ResidentList pagination={pagination}/>
      <Pagination setPage={setPage} RESIDENTS_PERPAGE={RESIDENTS_PERPAGE} location={location}/>
     
    </div>
  )
}

export default App
 