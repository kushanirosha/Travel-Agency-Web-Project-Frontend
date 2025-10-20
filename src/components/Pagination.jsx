import React from "react";

const Pagination = ({currentPage, totalPages , onPageChange}) =>{

    const paginate = (page)=> onPageChange(page);
    console.log(currentPage)
    return(
        <div className="pagination">
        <button className="btn btn-outline"  onClick={()=>paginate(1)}>First</button>
         <button className="btn btn-outline" disabled={currentPage===1}onClick={()=>paginate(currentPage-1)}>Prev</button>
        
         {new Array(totalPages).fill(0).map((_,index) => {
          return <button className={currentPage==index+1 ? "active" : ""} onClick={()=>paginate(index+1)} key={index+1}>{index+1}</button>
         })}
         
          <button className="btn btn-outline" disabled={currentPage===totalPages}onClick={()=>paginate(currentPage+1)}>Next</button>
        <button className="btn btn-outline" onClick={()=>paginate(totalPages)} >Last</button>
      </div>
    )
}
export default Pagination;