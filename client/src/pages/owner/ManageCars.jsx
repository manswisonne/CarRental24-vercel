// import React, { useEffect, useState } from "react";
// import { assets} from "../../assets/assets";
// import Title from "../../components/owner/Title";
// import { useAppContext } from "../../context/AppContext";

// const ManageCars = () => {

//   const {isOwner, axios, currency}  = useAppContext()
//   // const currency = import.meta.env.VITE_CURRENCY || "USD";
//   const [cars, setCars] = useState([]);

//   const fetchOwnerCars = async () => {
//     try {
//       const {data} = await axios.get('/api/owner/cars')
//       if(data.success){
//         setCars(data.cars)

//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   };



//   const   toggleAvailability = async (carId) => {
//     try {
//       const {data} = await axios.post('/api/owner/toggle-car',{carId})
//       if(data.success){
//       toast.success(data.message)
//       fetchOwnerCars()
//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   };


//     const   deleteCar = async (carId) => {




//     try {

//       const confirm = window.confirm("are you sure you want to delete this car?")
//       if(!confirm) return null
      
//       const {data} = await axios.post('/api/owner/delete-car',{carId})
//       if(data.success){
//       toast.success(data.message)
//       fetchOwnerCars()
//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   };


//   useEffect(() => {
//    isOwner && fetchOwnerCars();
//   }, [isOwner]);

//   return (
//     <div className="px-4 pt-10 md:px-10 w-full">
//       <Title
//         title="Manage Cars"
//         subtitle="View all listed cars, update their details, or remove them from the booking platform."
//       />

//       <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
//         <table className="w-full border-collapse text-left text-sm text-gray-600">
//           <thead className="text-gray-500 bg-gray-50">
//             <tr>
//               <th className="p-3 font-medium">Car</th>
//               <th className="p-3 font-medium max-md:hidden">Category</th>
//               <th className="p-3 font-medium">Price</th>
//               <th className="p-3 font-medium max-md:hidden">Status</th>
//               <th className="p-3 font-medium">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {cars.map((car, index) => (
//               <tr key={index} className="border-t border-borderColor">
//                 {/* Car info */}
//                 <td className="p-3 flex items-center gap-3">
//                   <img
//                     src={car.image}
//                     alt={`${car.brand} ${car.model}`}
//                     className="h-12 w-12 aspect-square rounded-md object-cover"
//                   />

//                   <div className="max-md:hidden">
//                     <p className="font-medium">
//                       {car.brand} {car.model}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {car.seating_capacity} seats • {car.transmission}
//                     </p>
//                   </div>
//                 </td>

//                 {/* Category */}
//                 <td className="p-3 max-md:hidden">{car.category}</td>

//                 {/* Price */}
//                 <td className="p-3">{currency}{car.pricePerDay}/day</td>

//                 {/* Status */}
//                 <td className="p-3 max-md:hidden">
//                   <span className={`px-2 py-1 text-xs rounded-full
//                    ${car.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
//                    {car.isAvailable ? "Available" : "Unavailable"}
//                   </span>
//                 </td>
              
//                 {/* Actions */}
//                 <td className="p-3 items-center flex">
//                   <img  onClick = {()=> toggleAvailability(car._id)}src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className="cursor-pointer" />
//                   <img  onClick = {()=> deleteCar(car._id)}src={assets.delete_icon} alt="" className="cursor-pointer" />
                  
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageCars;
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast"; // ADD THIS IMPORT


const ManageCars = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // ADD loading state

  const fetchOwnerCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/owner/cars');
      console.log("Cars data:", data); // ADD for debugging
      
      if (data.success) {
        setCars(data.cars || []); // Ensure it's an array
      } else {
        toast.error(data.message || "Failed to fetch cars");
      }
    } catch (error) {
      console.error("Fetch cars error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId });
      if (data.success) {
        toast.success(data.message || "Availability updated");
        fetchOwnerCars();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to toggle availability");
    }
  };

  const deleteCar = async (carId) => {
    const confirm = window.confirm("Are you sure you want to delete this car?");
    if (!confirm) return null;

    try {
      const { data } = await axios.post('/api/owner/delete-car', { carId });
      if (data.success) {
        toast.success(data.message || "Car deleted successfully");
        fetchOwnerCars();
      } else {
        toast.error(data.message || "Failed to delete car");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to delete car");
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Cars"
        subtitle="View all listed cars, update their details, or remove them from the booking platform."
      />

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading cars...</div>
        </div>
      ) : cars.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-300 rounded-lg">
          <img src={assets.upload_icon} alt="No cars" className="h-16 w-16 mb-4 opacity-50" />
          <p className="text-gray-500">No cars listed yet</p>
          <p className="text-sm text-gray-400 mt-2">Add your first car to get started</p>
        </div>
      ) : (
        <div className="max-w-full w-full rounded-md overflow-hidden border border-gray-200 mt-6">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-gray-600">
              <thead className="text-gray-500 bg-gray-50">
                <tr>
                  <th className="p-3 font-medium min-w-[200px]">Car</th>
                  <th className="p-3 font-medium min-w-[120px]">Category</th>
                  <th className="p-3 font-medium min-w-[100px]">Price</th>
                  <th className="p-3 font-medium min-w-[120px]">Status</th>
                  <th className="p-3 font-medium min-w-[120px]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cars.map((car, index) => (
                  <tr key={car._id || index} className="border-t border-gray-200 hover:bg-gray-50">
                    {/* Car info */}
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={car.image || assets.upload_icon}
                          alt={`${car.brand} ${car.model}`}
                          className="h-12 w-12 aspect-square rounded-md object-cover bg-gray-100"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {car.brand} {car.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            {car.seating_capacity || "N/A"} seats • {car.transmission || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {car.category || "N/A"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3 font-medium">
                      {currency}{car.pricePerDay || "0"}/day
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          car.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleAvailability(car._id)}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                          title={car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                        >
                          <img
                            src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                            alt="toggle"
                            className="h-5 w-5"
                          />
                        </button>
                        <button
                          onClick={() => deleteCar(car._id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete Car"
                        >
                          <img src={assets.delete_icon} alt="delete" className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            {cars.map((car, index) => (
              <div key={car._id || index} className="border-t border-gray-200 p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={car.image || assets.upload_icon}
                    alt={`${car.brand} ${car.model}`}
                    className="h-16 w-16 rounded-md object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {car.brand} {car.model}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {car.category} • {car.seating_capacity || "N/A"} seats
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleAvailability(car._id)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          <img
                            src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                            alt="toggle"
                            className="h-5 w-5"
                          />
                        </button>
                        <button
                          onClick={() => deleteCar(car._id)}
                          className="p-2 hover:bg-red-50 rounded"
                        >
                          <img src={assets.delete_icon} alt="delete" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="font-medium">
                        {currency}{car.pricePerDay || "0"}/day
                      </div>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          car.isAvailable
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;
