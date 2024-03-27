import React from 'react'
import { useEffect, useState } from 'react'
import db from "./../../data/db.json"
import Home from '@/components/modules/Home'
function index() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState();
  const [homes, setHomes] = useState(db.homes);

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
    const newHomes = db.homes.filter((home) => home.title.includes(search));
    setHomes(newHomes);
  }, [search])

  return (
    <div class="home-section" id="houses">
      <div class="home-filter-search">
        <div class="home-filter">
          <select defaultValue={sort} onChange={e => setSort(e.target.value)} >
            <option value="-1"  >انتخاب کنید</option>
            <option value="price">بر اساس قیمت</option>
            <option value="room">بر اساس تعداد اتاق</option>
            <option value="meterage">بر اساس اندازه</option>
          </select>
        </div>
        <div class="home-search">
          <input value={search} type="text" onChange={
            e => { setSearch(e.target.value) }
          } placeholder="جستجو کنید" />
        </div>
      </div>
      <div class="homes">
        { homes.slice(0, 6).map((home)=><Home key={home.id} {...home}></Home>) }
      </div>
      <ul class="pagination__list">
        <li class="pagination__item"><a href="#" class="">  </a></li>
        <li class="pagination__item"><a href="#" class="">2</a></li>
        <li class="pagination__item active"><a href="#" class="">1</a></li>
      </ul>
    </div>
  )
}

export default index
