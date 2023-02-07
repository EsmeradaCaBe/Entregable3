import React from 'react'
import { numbersPage } from '../util/handlePagination'
import './styles/Pagination.css'

export const Pagination = ({ setPage, location, RESIDENTS_PERPAGE}) => {
  return (
    <ul className='pagination'>
    {
     numbersPage(Location, RESIDENTS_PERPAGE ).map(numberPage => 
     <li className='pagination__page' onClick={() => {setPage
        (numberPage)
        window.scrollTo( 0, 0);
      } 
     } key={numberPage}>{numberPage}</li>)
      }
    </ul>
  )
}
 export default Pagination