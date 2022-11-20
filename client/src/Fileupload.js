import React ,{Fragment,useState} from 'react';
import axios from 'axios';
const Fileupload = () => {
 
    const [file,setFile]=useState('');
    const [filename,setFilename]=useState('choos file');
    const [uploadedfile,setuploadedfile]=useState('{}');
   const onchange = e =>
   {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    
   }
   const onsubmit= async e=>
   {
    e.preventdefault();
    const formData=new FormData();
    formData.append('file',file);
    
    try{ 
const res=await axios.post('/upload',formData,{
    headers:{
        'Content-Type':'multipart/form-data '
    }
});
const {filename,filepath}=res.data;
setuploadedfile({filename,filepath})  
} catch(err){

    if(err.response.status===500)
    {
         console.log("THERE WAS A ERROR WITH SERVER")
    }else
    {
        console.log(err.response.data.msg);
    }
}

   };  
  return (
    <Fragment>
  <form onSubmit={onsubmit}>
  <div className='custom-file mb-4'>
  <input type='file' className='custom-file-input' id='customFile' onChange={onchange}/>
  <label className='custom-file-label' htmlFor='customFile'> 
  {filename}
  </label>
</div>
  
<input type='submit' value='upload' className='btn btn-primary btn-block mt4'></input>
</form>

 

</Fragment>
  );
};

export default Fileupload
