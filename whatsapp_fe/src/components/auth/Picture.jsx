import { useRef, useState } from 'react'

const Picture = ({ readablePicture, setReadablePicture, setPicture }) => {
    const [error, setError] = useState("");
    const inputRef = useRef()
    const handleCLick = () => {
        // setError("")
        inputRef.current.click()
    }
    const handlePicture = (e) => {
        let pic = e.target.files[0]
        if (pic.type !== "image/jpeg" &&
            pic.type !== "image/png" &&
            pic.type !== "image/webp") {
            setError(`${pic.name} format is not supported`)
            return;
        }
        else if (pic.size > 1024 * 1024 * 10) {
            setError(`${pic.name}'s size is more the 10 MB `)
            return;
        }
        else {
            setPicture(pic)
            // for reading the pic
            const reader = new FileReader()
            reader.readAsDataURL(pic);
            reader.onload = (e) => {
                setReadablePicture(e.target.result)
            }
            setError("")
        }

    }
    return (
        <div className='mt-8 content-center dark:text-dark_text_1'>

            <label htmlFor="picture" className='text-sm font-bold'>Picture (Optional)</label>
            {readablePicture ? (
                <div>
                    <img src={readablePicture} alt="picture"
                        className='w-20 h-20 object-cover rounded-full'

                    />
                    {/* change pic */}
                    <div className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer' onClick={handleCLick}

                    >
                        Change Picture
                    </div>
                </div>
            ) : (
                <div className='w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer' onClick={handleCLick}

                >
                    Upload Picture
                </div>
            )}
            <input type="file" name="picture" id='picture' hidden ref={inputRef}

                accept='image/png,image/jpeg,image/webp'
                onChange={handlePicture}
            />
            {/* error */}
            <div className='mt-2'>
                <p className='text-red-400'>{error}</p>

            </div>
        </div>
    )
}

export default Picture