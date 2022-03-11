import NavBar from "./NavBar";
import SearchSupplie from "./SearchSupplie";
import SearchProduct from "./SearchProduct";

const ViewContent =(props)=>
{   
 return(
     <div className="container p-0">
         <NavBar brand={props.brand}/>
         <SearchProduct/>
            
     </div>
 )
}
export default ViewContent;