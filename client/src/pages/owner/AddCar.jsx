// import React, { useState } from 'react'
// import Title from '../../components/owner/Title'
// import { assets } from '../../assets/assets'
// import { useAppContext } from '../../context/AppContext'

// const AddCar = () => {
//   const {axios, currency} = useAppContext()
//   // const currency = import.meta.env.VITE_CURRENCY || '₹'

//   const [image, setImage] = useState(null)

//   const [car, setCar] = useState({
//     brand: '',
//     model: '',
//     year: '',
//     pricePerDay: '',
//     category: '',
//     transmission: '',
//     fuel_type: '',
//     seating_capacity: '',
//     location: '',
//     description: '',
//   })
// const [isLoading, setIsLoding] = useState(false)
//   const onSubmitHandler = async (e) => {
//     e.preventDefault()
//     console.log(car, image)
//     if(isLoading) return null

//     setIsLoding(true)
//     try {
//       const formData = new FormData()
//       formData.append('image', image)
//       formData.append('carData', JSON.stringify(car))
//       const {data} = await axios.post ('/api/owner/add-car', formData)
//       if(data.sucess){
//         toast.success(data.message)
//         setImage(null)
//         setCar({
//           brand: '',
//           model: '',
//           year: 0,
//           pricePerDay: 0,
//           category: '',
//           transmission: '',
//           fuel_type: '',
//           seating_capacity: 0,
//           location: '',
//           description: '',
//         })
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }finally{
//       setIsLoding(false)
//     }
//   }

//   return (
//     <div className="px-4 py-10 md:px-10 flex-1">
//       <Title
//         title="Add New Car"
//         subTitle="Fill in details to list a new car for booking, including availability and specifications"
//       />

//       <form
//         onSubmit={onSubmitHandler}
//         className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
//       >
//         {/* Car image */}
//         <div className="flex items-center gap-3">
//           <label htmlFor="car-image" className="cursor-pointer">
//             <img
//               src={image ? URL.createObjectURL(image) : assets.upload_icon}
//               alt="upload"
//               className="h-14 w-14 rounded object-cover"
//             />
//             <input
//               type="file"
//               id="car-image"
//               accept="image/*"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//           </label>
//           <p>Upload a picture of your car</p>
//         </div>

//         {/* Brand & Model */}
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="flex flex-col">
//             <label>Brand</label>
//             <input
//               type="text"
//               required
//               placeholder="BMW, Audi..."
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.brand}
//               onChange={(e) => setCar({ ...car, brand: e.target.value })}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Model</label>
//             <input
//               type="text"
//               required
//               placeholder="X5, E-Class..."
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.model}
//               onChange={(e) => setCar({ ...car, model: e.target.value })}
//             />
//           </div>
//         </div>

//         {/* Year, Price, Category */}
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="flex flex-col">
//             <label>Year</label>
//             <input
//               type="number"
//               required
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.year}
//               onChange={(e) => setCar({ ...car, year: e.target.value })}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Daily Price ({currency})</label>
//             <input
//               type="number"
//               required
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.pricePerDay}
//               onChange={(e) =>
//                 setCar({ ...car, pricePerDay: e.target.value })
//               }
//             />
//           </div>

//           <div className="flex flex-col">
//             <label>Category</label>
//             <select
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.category}
//               onChange={(e) => setCar({ ...car, category: e.target.value })}
//             >
//               <option value="">Select</option>
//               <option value="Sedan">Sedan</option>
//               <option value="SUV">SUV</option>
//               <option value="Van">Van</option>
//             </select>
//           </div>
//         </div>

//         {/* Transmission, Fuel, Seating */}
//         <div className="grid md:grid-cols-3 gap-6">
//           <div className="flex flex-col">
//             <label>Transmission</label>
//             <select
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.transmission}
//               onChange={(e) =>
//                 setCar({ ...car, transmission: e.target.value })
//               }
//             >
//               <option value="">Select</option>
//               <option value="Automatic">Automatic</option>
//               <option value="Manual">Manual</option>
//               <option value="Semi-automatic">Semi-automatic</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label>Fuel Type</label>
//             <select
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.fuel_type}
//               onChange={(e) =>
//                 setCar({ ...car, fuel_type: e.target.value })
//               }
//             >
//               <option value="">Select</option>
//               <option value="Petrol">Petrol</option>
//               <option value="Diesel">Diesel</option>
//               <option value="Hybrid">Hybrid</option>
//               <option value="Electric">Electric</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label>Seating Capacity</label>
//             <input
//               type="number"
//               required
//               className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//               value={car.seating_capacity}
//               onChange={(e) =>
//                 setCar({ ...car, seating_capacity: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* Location */}
//         <div className="flex flex-col">
//           <label>Location</label>
//           <select
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//             value={car.location}
//             onChange={(e) => setCar({ ...car, location: e.target.value })}
//           >
//             <option value="">Select</option>
//             <option value="New York">New York</option>
//             <option value="Los Angeles">Los Angeles</option>
//             <option value="Chicago">Chicago</option>
//           </select>
//         </div>

//         {/* Description */}
//         <div className="flex flex-col">
//           <label>Description</label>
//           <textarea
//             required
//             rows="4"
//             className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
//             value={car.description}
//             onChange={(e) =>
//               setCar({ ...car, description: e.target.value })
//             }
//           />
//         </div>
// <button className='flex items-center gap-2 py-2.5 mt-4 bg-primary text-white 
// rounded-md font-medium w-max curosr-pointer'>
//          <img src={assets.tick_icon} alt="" />
//          { isLoading ? 'Listing...' : 'List Your Car'}
//         </button>

//       </form>
//     </div>
//   )
// }

// export default AddCar
import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast' // ADD THIS IMPORT
import {useEffect} from 'react'

const AddCar = () => {
  const {axios, currency} = useAppContext()
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false) // FIXED: setIsLoding → setIsLoading

  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  })

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(car, image)
    
    if(isLoading) return null

    setIsLoading(true) // FIXED
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))
      
      const {data} = await axios.post('/api/owner/add-car', formData)
      
      if(data.success){ // FIXED: sucess → success
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: '',
          pricePerDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message) // IMPROVED
    } finally {
      setIsLoading(false) // FIXED
    }
  }

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including availability and specifications"
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car image */}
        <div className="flex items-center gap-3">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="upload"
              className="h-14 w-14 rounded object-cover"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p>Upload a picture of your car</p>
        </div>

        {/* Brand & Model */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label>Brand</label>
            <input
              type="text"
              required
              placeholder="BMW, Audi..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label>Model</label>
            <input
              type="text"
              required
              placeholder="X5, E-Class..."
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label>Year</label>
            <input
              type="number"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.pricePerDay}
              onChange={(e) =>
                setCar({ ...car, pricePerDay: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label>Category</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel, Seating */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label>Transmission</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.transmission}
              onChange={(e) =>
                setCar({ ...car, transmission: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-automatic">Semi-automatic</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Fuel Type</label>
            <select
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.fuel_type}
              onChange={(e) =>
                setCar({ ...car, fuel_type: e.target.value })
              }
            >
              <option value="">Select</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Seating Capacity</label>
            <input
              type="number"
              required
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label>Location</label>
          <select
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
          >
            <option value="">Select</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            required
            rows="4"
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            value={car.description}
            onChange={(e) =>
              setCar({ ...car, description: e.target.value })
            }
          />
        </div>

        {/* FIXED BUTTON */}
        <button 
          type="submit"
          disabled={isLoading}
          className='flex items-center justify-center gap-2 py-3 px-6 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        >
         <img src={assets.tick_icon} alt="" className="h-5 w-5" />
         {isLoading ? 'Listing Car...' : 'List Your Car'}
        </button>
      </form>
    </div>
  )
}

export default AddCar
