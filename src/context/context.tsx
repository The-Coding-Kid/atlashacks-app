import React, {useState} from 'react'

const ImageContext = React.createContext([
  { name: 'Image #1', images: require('../../assets/lunch2.jpg') },
  { name: 'Image #2', images: require('../../assets/school_lunch_tray.jpg') },
	{ name: 'Image #3', images: require('../../assets/lunch3.jpeg') },
	{ name: 'Image #4', images: require('../../assets/food.jpg') },
])

export const BlogProvider = ({ children }) => {
  const [image, setImage] = useState([
    { name: 'Image #1', images: require('../../assets/lunch2.jpg') },
		{ name: 'Image #2', images: require('../../assets/school_lunch_tray.jpg') },
		{ name: 'Image #3', images: require('../../assets/lunch3.jpeg') },
		{ name: 'Image #4', images: require('../../assets/food.jpg') },
  ])

  // const addBlogPost = () => {
  //   setImage([...image, {name: `Image #${image.length + 1}`, images: require('testing')}])
  // }

  return <ImageContext.Provider value={image}>
        {children}
  </ImageContext.Provider>
}

export default ImageContext;
