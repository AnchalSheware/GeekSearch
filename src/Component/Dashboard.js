import React from "react";
import "../style.scss"
import Search from "./icons8-search-32.png"
import 'regenerator-runtime/runtime';
import { useState , useEffect } from "react";
import axios from "axios";


const Dashboard = () => {
     const[post,setPost] =useState([])
     const[searchTerm, setSearchTerm]=useState("");
     const[searchResults, setSearchresults]=useState();
     const[image,setImage]=useState("");
     const[selected,setSelected] =  useState(null);
     const[incorder ,setincorder] = useState(post)
     const [isActive, setActive] = useState(false);
     

     const ascOrder = () => {
        const sorted = incorder.sort((a, b) => {
        a.login.localCompare(b.login);

     });
    setincorder(sorted)}
     
    
     const toggle = (post) =>{
         setActive(!isActive);
         setSelected(post.id);
       
       
     }
    
     const handleChange = (e)=>{
         
         setSearchTerm(e.target.value);
         console.log("Terms we have " ,e.target.value);
        }
   

    // const Fetchpost = () => {
    //      const Endpoint = "https://api.github.com/search/users?q=aman";
    //      axios(Endpoint)
    //      .then((res) =>{
    //          setPost(false);

    //         console.log("RES" , res.data);
    //         if(res.data.info)
    //            setInfo(res.data.info)
    //         else{
    //             console.log("An error happened");
    //         }
    //      })
    //      .catch((error) => {
    //          setPost(false);
    //          console.log("An error happened",error);
    //      })

    // }

    let total_item;
    const Fetchpost = async() => {
       
        
        let response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
       
        const data = await response.json();
        console.log(data);
        
        setPost(data.items);
        setSearchresults(data.total_count);
        
        console.log(data.total_count);
        
       
    }
    console.log(post)
   
    useEffect(()=>{
       Fetchpost();
      
       
    },[searchTerm]);

    
    // const content = post? <div>LOADING</div> : <div><pre>{JSON.stringify(info, null ,2)}</pre></div> ;
    return(
        
        <div>
            <div className="header">
         <form>
            <select className="input100 size1" >
               <option value="" disabled selected>Search by Name</option>
               <option value="Ascending " onClick={ascOrder}> Name (A - Z)</option>
               <option value="Decending" >Name (Z - A)</option>
              
            </select>
                
            <input style={{backgroundImage : `url(${Search})`}} className="input100 size2"   type="text" placeholder="Search"
            value={searchTerm} onChange={handleChange} >
             </input>
             {/* <button onClick={Fetchpost} >CLICK</button>   */}
         </form>  

            </div>
            <div className="container">
            <span className="card_results" >Total Results: {searchResults}</span>
                  {
                      post && 
                      post.map((currElement,i) =>{
                          return(
                              
                              
                              <div className="card">
                              <img src={currElement.avatar_url}></img>
                              <div className="card_body"> 
                                <div className="card_name"> {currElement.login}</div>
                                <div className="card_url">Profile url :  {currElement.url}</div>
                                <div  className="card_id">
                                    <span>USER ID :{currElement.id}</span> <br></br>
                                    <span>NODE ID :{currElement.node_id}</span>
                                 </div>
                                 {isActive && selected ===currElement.id?
                               <div  className="card_id">
                                    <span>USER ID :{currElement.id}</span> <br></br>
                                    <span>NODE ID :{currElement.node_id}</span>
                              </div> : null}
                               </div>

                               <div><button onClick={()=>toggle(currElement)} >{isActive && selected===currElement.id ? "COLLAPSE" : "DETAILS"}</button></div>
                               
                               
                              
                              </div>
                              
                            
                           
                          )
                         
                      })
                  }
            </div>
        </div>
    )
}
export default Dashboard;