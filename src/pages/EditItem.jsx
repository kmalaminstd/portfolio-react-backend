/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
// import { itemColRef, storage } from "../../config/firebase.config"
import { itemColRef, storage } from "../config/firebase.config"
import { v4 as uuid } from "uuid"
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { useNavigate, useParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
// import { ItemContext } from "../context/Item.Context"

function EditItem() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        portfolio_name: '',
        portfolio_link: '',
        portfolio_image: '',
        category: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')

    

    // const { items } = useContext(ItemContext)
    const {id} = useParams()
    
    useEffect(()=>{
        (async()=>{
            const docRef = doc(itemColRef, id)
            const currentItem = await getDoc(docRef)
            if(currentItem.exists){
                const itemData = currentItem.data()
                setData({
                    ...itemData
                })
                setContent(
                    itemData.portfolio_details
                )
            }
        })()
    },[id])

    
    
    

    const editor = useRef(null)

    let config = {
        readonly: false,
        placeholder: "Start typing",
        width: "100%",
        height: 600
    };

    useEffect(()=>{
        document.querySelector('body').style.overflow = isLoading ? 'hidden' : 'auto'
    },[isLoading])

    const handleForm = async e => {
        e.preventDefault()
        // setIsLoading(true)
        const docRef = doc(itemColRef, id)
        
        let image_url = data.portfolio_image

        if(data.portfolio_name && data.portfolio_link && data.portfolio_image && content && data.category){

            setIsLoading(true)
            if(data.portfolio_image instanceof File){
                const bucketRef = ref(storage, `portfolio_image/${uuid() + data.portfolio_image.name}`)
                try{
                    const snapshot = await uploadBytes(bucketRef, data.portfolio_image)
                    image_url = await getDownloadURL(snapshot.ref)
                }catch(err){
                    console.log(err);
                    setIsLoading(false)
                    return
                }
            }
        
            try {
                await updateDoc(docRef, {
                    portfolio_name: data.portfolio_name,
                    portfolio_link: data.portfolio_link,
                    portfolio_image: image_url, // Use new or existing image URL
                    portfolio_details: content,
                    category: data.category
                })
                setIsLoading(false)
                navigate('/all-item')
            } catch (err) {
                console.error(err.message)
                setIsLoading(false)
            }

            
        }else{
            
            alert('Invalid field')
        }

    }

    const handleValue = e => {
        setData({
            ...data,
            [e.target.name] : e.target.type === 'file' ? e.target.files[0] : e.target.value
        })

    }

    const handleContent = e => {
        
        setContent(e)

        
    }


  return (
    <>
        
            {
                isLoading && 
                <div className="uploadLoader">
                    <ClockLoader 
                        height="80"
                        width="80"
                        radius={1}
                        color="#4fa94d"
                        aria-label="loading-indicator"
                        visible="true" 
                    /> 
                </div>
            }
        
        <div className="add_form">
            <form onSubmit={handleForm}>
                <input type="text" value={data.portfolio_name} name="portfolio_name" placeholder="Portfolio Name" onChange={handleValue} />
                <input type="text" value={data.portfolio_link} name="portfolio_link" placeholder="Portfolio Live Link" onChange={handleValue} />
                <select name="category" id="" onChange={handleValue} value={data.category}>
                    <option value="">Choose Category</option>
                    <option value="psdconv">Psd to HTML</option>
                    <option value="webdesign">Web Design</option>
                    <option value="react">React.js</option>
                    <option value="js">Javascript</option>
                </select>
                <JoditEditor
                    ref={editor}
                    config={config}
                    value={content}
                    onBlur={handleContent}
                />
                <input type="file" name="portfolio_image" onChange={handleValue} />
                <button>Submit</button>
            </form>
        </div>
    </>
  )
}

export default EditItem