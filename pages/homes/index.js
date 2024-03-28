import React from 'react'
import { useEffect, useState } from 'react'
import db from "./../../data/db.json"
import Home from '@/components/modules/Home'
function index() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState();
  const [homes, setHomes] = useState(db.homes);
  const [content, setContent] = useState();


  useEffect(()=>{
    switch(sort){
      case 'price':{
        return setHomes([...homes].sort((a,b)=> a.price - b.price))
        break;
      }
      case 'room':{
        return setHomes([...homes].sort((a,b)=> a.roomCount - b.roomCount))
        break;
      }
      case 'meterage':{
        return setHomes([...homes].sort((a,b)=> a.meterage - b.meterage))
        break;
      }
      default:{
        return setHomes([...db.homes])
      }
    }
  },[sort])

  useEffect(() => {
    setHomes( db.homes.filter((home) => home.title.includes(search)));
  }, [search])

  useEffect(()=>{
    setContent(homes.slice(0, 6).map((home)=><Home key={home.id} {...home}></Home>) )
    if( homes && homes.length <1){
      setContent(<h2 style={{textAlign: "center", color:"#101D2C", fontSize:"48px"}}> متاسفانه خانه مدنظر شما پیدا نشد!!</h2>)
      }
  },[homes])

  const paginate= (event , page) => {
    event.preventDefault()
    const endIndex = page * 6
    const startIndex = endIndex - 6
    const paginated = db.homes.slice(startIndex, endIndex)
    setHomes(paginated)
  }

  return (
    <div className="home-section" id="houses">
      <div className="home-filter-search">
        <div className="home-filter">
          <select defaultValue={sort} onChange={e => setSort(e.target.value)} >
            <option value="-1"  >انتخاب کنید</option>
            <option value="price">بر اساس قیمت</option>
            <option value="room">بر اساس تعداد اتاق</option>
            <option value="meterage">بر اساس اندازه</option>
          </select>
        </div>
        <div className="home-search">
          <input value={search} type="text" onChange={e => { setSearch(e.target.value)}
          } placeholder="جستجو کنید" />
        </div>
      </div>
      <div className="homes">
        { content }
      </div>
      <ul className="pagination__list">
        {
          Array.from({ length: Math.ceil(db.homes.length / 6)}).map((item , index)=> (
            <li key={index} className="pagination__item" onClick={event=>paginate(event , index+1)}>
              <a href="#" className="" > {index+1} </a>
              </li>
          ))
        }
      </ul>
    </div>
  )
}

export default index
