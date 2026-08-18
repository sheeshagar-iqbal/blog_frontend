import React from 'react'
import { Button ,styled} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const cateory =[
    // {id:0,type:'All'},
    {id:1,type:'Music'},
    {id:2,type:'Tech'},
    {id:3,type:'Movies'},
    {id:4,type:'Sports'},
    {id:5,type:'Fashion'}
]

const Styledtable= styled(Table)`
border:2px solid rgba(224,224,224,1);
`
const Styledbuuton= styled(Button)`
border:2px solid rgb(224, 224, 224);
margin:10px;
width:85%;
background:rgb(45, 80, 186);
color:white;
border-radius:10px;
box-shadow: inset 1px 1px  rgb(8, 26, 92)

`
const Category = () => {
  return (
    <>
    <Link to='/create' style={{width:'85%',marginLeft:'5%'}}>
    <Styledbuuton>Create Blog</Styledbuuton>
    </Link>
    <Styledtable>
        <TableHead>
            <TableRow>
                <TableCell>
                    <Link to='/' style={{textDecoration:'none', color:'black'}}>
                    All Category
                    </Link>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
           {cateory.map((e)=>(
             <TableRow key={e.id}>
                <TableCell>
                    <Link to={`/?category=${e.type}` } style={{textDecoration:'none', color:'black'}}>
                    {e.type}
                    </Link>
                </TableCell>
            </TableRow>
           ))}
        </TableBody>
    </Styledtable>

    </>
  )
}

export default Category