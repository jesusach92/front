import NavBar from "./NavBar";
import SearchSupplie from "./SearchSupplie";

const ViewContent =(props)=>
{   
 return(
     <div className="container p-0">
         <NavBar brand={props.brand}/>
         <SearchSupplie/>
            
     </div>
 )
}
export default ViewContent;