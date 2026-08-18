import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Updatedata from './Update'

const Show = () => {
   
    const [apidata , setapidata]=useState([])
    const [userdata, setUserdata]=useState({})
    const [show, setShow]=useState(false)
    // const navigate =useNavigate()
    // const [sorted ,setSorted]=useState([])


    function del(id){
    axios.delete(`http://localhost:5000/user/${id}`)
    .then(res=>{alert('deleter')
      getstudent()
    })
    .catch(err=>console.log('something wrong',err)
    )
  }

  function update(id){
    axios.get(`http://localhost:5000/user/${id}`)
    .then(res=>setUserdata(res.data))
    // .then(res=>console.log(res.data)       )
    .catch(err=>console.log('something wrong',err)
    )
  }

  function sortdata(s){
    // console.log(s);
  axios.get(`http://localhost:5000/user/sort?name=${s}`)
  .then(res=>{
    setapidata(res.data)
    console.log(res.data);
    
  }  )
  .catch(e=>console.log(e))
    
  }



  function getstudent(){
          axios.get("http://localhost:5000/user")
  .then(res=>{setapidata(res.data)
    console.log(res.data)
  })
  .catch(e=>console.log(e))
  }


  useEffect(()=>{
  getstudent()
  
},[])

  return (
    <>
    <h1>show info</h1>
   
    <select name="" id="" onChange={(e)=>sortdata(e.target.value)}>
      <option value="">select_sorting</option>
      <option value="asc">a-z</option>
      <option value="desc">z-a</option>
    </select>


          <table border=''>
    
     <thead>
       <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Password</th>
        <th>update</th>
        <th>delete</th>
      </tr>
     </thead>
     <tbody>
       {apidata.map((e)=>(
      <tr key={e._id}>
        <td>{e.username}</td>
        <td>{e.email}</td>
        <td>{e.password}</td>
        <td onClick={()=>del(e._id)}>DELETE</td>
        <td onClick={()=>(update(e._id),setShow(!show))}>Update</td>
      </tr>

        ))}
     </tbody>
        
      </table>

     {
      show && <Updatedata data={userdata} />
     }




     
    </>
  )
}

export default Show