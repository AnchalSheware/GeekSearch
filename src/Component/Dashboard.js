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
            <select className="input100 size1" name="cars" id="cars" >
               <option value="volvo">Search by Name</option>
               <option value="saab">Saab</option>
               <option value="mercedes">Mercedes</option>
               <option value="audi">Audi</option>
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
                      post.map((currElement) =>{
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
                               </div>
                               <div><button>DETAILS</button></div>
                              
                              </div>
                              
                            
                           
                          )
                         
                      })
                  }
            </div>
        </div>
    )
}
export default Dashboard;