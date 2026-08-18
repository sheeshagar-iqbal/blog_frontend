import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Updatedata = ({data}) => {
  if (!data) return <h1>Loading...</h1>;

  
    const [frmdata, setFrmdata]=useState(data)
    const navigate= useNavigate()
    

    function hinput(e){
        let {name, value}=e.target 
        setFrmdata({...frmdata,[name]:value})
    }

    function submit(e){
        e.preventDefault()
        console.log(frmdata);
        
        axios.put(`http://localhost:5000/user/${frmdata._id}`,frmdata)
  .then(res=>alert('data updated successfully'))
  .catch(e=>console.log(e))
  navigate('/show')
        
    }
  return (
    <>
    <form action="" onSubmit={submit}>
       
        <label htmlFor="">Username</label>
        <input type="text" name='username' value={frmdata.username} onChange={hinput} /><br /><br />
        <label htmlFor="">Email</label>
        <input type="text" name='email' value={frmdata.email} onChange={hinput}/><br /><br />
        <label htmlFor="">Password</label>
        <input type="text" name='password' value={frmdata.password} onChange={hinput}/><br /><br />
        <input type="submit" value="submit" />

    </form>
    </>
  )
}

export default Updatedata