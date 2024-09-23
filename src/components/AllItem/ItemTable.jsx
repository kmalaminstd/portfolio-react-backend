import { useContext } from "react"
import { ItemContext } from "../../context/Item.Context"
import { itemColRef } from "../../config/firebase.config"
import { deleteDoc, doc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"


function ItemTable() {

    const { items } = useContext(ItemContext)

    const navigate = useNavigate()
    
    const handleDelete = async (id)=>{
        const docRef = doc(itemColRef, id)
        try{
            await deleteDoc(docRef)
        }catch(err){
            console.log(err);
        }
    }

    const handleEdit = (id)=>{
      
        navigate(`/edit-item/${id}`)
    }
    

  return (
    <div className="item-table">
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Portfolio Name</th>
                    <th>Portfolio Link</th>
                    <th>Porfolio Image</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    items && 
                    items.map((elm, i) => {
                        return(
                            <tr key={i}>
                                <td>{++i}</td>
                                <td>{elm.portfolio_name}</td>
                                <td>{elm.portfolio_link}</td>
                                <td><img src={elm.portfolio_image} alt="image" /></td>
                                <td>
                                    <button onClick={()=>handleEdit(elm.id)}>Edit</button>
                                    <button onClick={()=>handleDelete(elm.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                    
                }
                {/* <tr>
                    <td>1</td>
                    <td>Portfolio</td>
                    <td><a href="#">gihtub.com/kmalaminstd</a></td>
                    <td><img src="image/work_one.jpg" alt="image" /></td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Portfolio</td>
                    <td><a href="#">gihtub.com/kmalaminstd</a></td>
                    <td><img src="image/work_one.jpg" alt="image" /></td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Portfolio</td>
                    <td><a href="#">gihtub.com/kmalaminstd</a></td>
                    <td><img src="image/work_one.jpg" alt="image" /></td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default ItemTable