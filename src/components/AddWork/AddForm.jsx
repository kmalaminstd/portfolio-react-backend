import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { itemColRef, storage } from "../../config/firebase.config"
import { v4 as uuid } from "uuid"
import { addDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { ClockLoader } from "react-spinners"

function AddForm() {

    const [data, setData] = useState({
        portfolio_name: '',
        portfolio_link: '',
        portfolio_image: '',
        category: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState('')

    const navigate = useNavigate()

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

    const handleForm = e => {

        e.preventDefault()

        

        const bucketRef = ref(storage, `portfolio_image/${uuid() + data.portfolio_image.name}`)

        if(data.portfolio_name && data.portfolio_link && data.portfolio_image && content && data.category){

            
            setIsLoading(true)

            uploadBytes(bucketRef, data.portfolio_image)
                .then(snapshot => {
                    getDownloadURL(snapshot.ref)
                        .then(url => {
                            addDoc(itemColRef, {
                                portfolio_details: content,
                                portfolio_name: data.portfolio_name,
                                portfolio_link: data.portfolio_link,
                                category: data.category,
                                portfolio_image: url
                            }).then(()=>{
                                navigate('/all-item')
                                setIsLoading(false)
                            }).catch(err => {
                                console.log(err.message);
                                console.log(err.code);
                                setIsLoading(false)
                            })
                        }).catch(err => {
                            console.log(err.message);
                            console.log(err.code);
                            setIsLoading(false)
                        })
                }).catch(err => {
                    console.log(err.message);
                    console.log(err.code);
                    setIsLoading(false)
                })


            
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
                <select name="category" id="" onChange={handleValue}>
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

export default AddForm