import React from "react"
export default function Main() {
    const[meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    })
    const[memeArray,setMemeArray]=React.useState([])
    function handleChange(event){
        const {value, name}=event.currentTarget;
        setMeme((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
            .then(res=>res.json())
            .then(data=>setMemeArray(data.data.memes))
    },[])
    function getMeme(){
        const meme=memeArray[Math.floor(Math.random()*memeArray.length)]
        setMeme((prev)=>{
            return{
                topText:"",
                bottomText:"",
                imageUrl:meme.url
            }
        })
    }
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={getMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}