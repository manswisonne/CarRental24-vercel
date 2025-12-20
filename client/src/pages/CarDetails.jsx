// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { dummyCarData, assets } from "../assets/assets";
// import Loader from "../components/Loader";
// import { useAppContext } from "../context/AppContext";

// const CarDetails = () => {
//   const { id } = useParams();
//   const {cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext()

//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   // const [pickupDate, setPickupDate] = useState('');
//   // const [returnDate, setReturnDate] = useState('');
//   const currency = import.meta.env.VITE_CURRENCY || "$";
// const handleSubmit = async (e)=>{
//   e.preventDefault();
//   try {
//     const {data} = await axios.post('/api/bookings/create', {
//       car:id, 
//       pickupDate, 
//       returnDate
//   })
//   if (data.success){
//     toast.success(data.message)
//     navigate('/my-bookings')
//   }else{
//     toast.error(data.message)
//   }
//   } catch (error) {
//     toast.error(error.message)
//   }
// }
//   // Fetch car data
//   useEffect(() => {
//     const foundCar = cars.find(car => car._id === id);
//     setCar(foundCar);
//   }, [id,cars]);

//   const handleBooking = (e) => {
//     e.preventDefault();
//     if (car && pickupDate && returnDate) {
//       console.log('Booking:', { car, pickupDate, returnDate });
//       alert(`Booking ${car.brand} ${car.model} from ${pickupDate} to ${returnDate}`);
//       // Add your booking logic here
//     }
//   };

//   return car ? (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65 h-4" />
//         <span className="font-medium">Back to all Cars</span>
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//         {/* Car image and details */}
//         <div className="lg:col-span-2">
//           <img 
//             src={car.image} 
//             alt={`${car.brand} ${car.model}`} 
//             className="w-full h-auto max-h-96 object-cover rounded-xl mb-6 shadow-lg" 
//           />
          
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {car.brand} {car.model}
//               </h1>
//               <p className="text-gray-500 text-lg mt-1">
//                 {car.category} • {car.year}
//               </p>
//             </div>

//             <hr className="border-gray-200 my-6" />

//             {/* Specifications Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 { icon: assets.fuel_icon, text: car.fuel_type },
//                 { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
//                 { icon: assets.car_icon, text: car.transmission },
//                 { icon: assets.location_icon, text: car.location },
//               ].map(({ icon, text }) => (
//                 <div 
//                   key={text} 
//                   className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
//                   <span className="text-sm text-gray-700 text-center">{text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Description */}
//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {car.description}
//               </p>
//             </div>

//             {/* Features */}
//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Features</h2>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {['360 Camera', 'Bluetooth', 'GPS Navigation', 'Heated Seats', 'Rearview Mirror'].map((item) => (
//                   <li key={item} className="flex items-center text-gray-600">
//                     <img src={assets.check_icon} alt="" className="h-4 w-4 mr-2" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
//             <div className="mb-6">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-3xl font-bold text-gray-900">
//                   {currency}{car.pricePerDay}
//                 </span>
//                 <span className="text-gray-500">/ day</span>
//               </div>
//               {car.isAvaliable ? (
//                 <p className="text-green-600 text-sm mt-2 font-medium">✓ Available Now</p>
//               ) : (
//                 <p className="text-red-600 text-sm mt-2 font-medium">Currently Unavailable</p>
//               )}
//             </div>

//             <div className="space-y-4 mb-6">
//               <div className="flex flex-col gap-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Pick-up Date
//                 </label>
//                 <input
//                   type="date"
//                   value={pickupDate}
//                   id="pickup-date"
//                   onChange={(e) => setPickupDate(e.target.value)}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Return Date
//                 </label>
// //                 <input
// //                   type="date"
// //                   value={returnDate}
// //                   onChange={(e) => setReturnDate(e.target.value)}
// //                   min={pickupDate || new Date().toISOString().split('T')[0]}
// //                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
// //                 />
// //               </div>
// //             </div>

// //             <button
// //               onClick={handleBooking}
// //               disabled={!car.isAvaliable || !pickupDate || !returnDate}
// //               className={`w-full py-3 rounded-lg font-semibold transition-all ${
// //                 car.isAvaliable && pickupDate && returnDate
// //                   ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
// //                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //               }`}
// //             >
// //               {car.isAvaliable ? 'Book Now' : 'Not Available'}
// //             </button>

// //             <p className="text-xs text-gray-500 text-center mt-4">
// //               Free cancellation up to 24 hours before pickup
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   ) : (
// //     <Loader />
// //   );
// // };

// // export default CarDetails;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import Loader from "../components/Loader";
// import { useAppContext } from "../context/AppContext";
// import { toast } from "react-hot-toast"; // ADD THIS IMPORT

// const CarDetails = () => {
//   const { id } = useParams();
//   const { 
//     cars, 
//     axios, 
//     pickupDate, 
//     setPickupDate, 
//     returnDate, 
//     setReturnDate 
//   } = useAppContext();

//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const currency = import.meta.env.VITE_CURRENCY || "$";

//   // Debug: Log car data
//   useEffect(() => {
//     console.log("Car data:", car);
//     console.log("Car availability:", car?.isAvailable); // FIXED SPELLING
//   }, [car]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!car?.isAvailable) { // FIXED SPELLING
//       toast.error("This car is currently unavailable");
//       return;
//     }
    
//     if (!pickupDate || !returnDate) {
//       toast.error("Please select pickup and return dates");
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const { data } = await axios.post('/api/bookings/create', {
//         car: id,
//         pickupDate,
//         returnDate
//       });
      
//       if (data.success) {
//         toast.success(data.message || "Booking created successfully!");
//         navigate('/my-bookings');
//       } else {
//         toast.error(data.message || "Failed to create booking");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error(error.response?.data?.message || error.message || "Failed to book car");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch car data
//   useEffect(() => {
//     if (id && cars?.length > 0) {
//       const foundCar = cars.find(car => car._id === id);
//       if (foundCar) {
//         console.log("Found car availability:", foundCar.isAvailable); // FIXED
//         setCar(foundCar);
//       } else {
//         // If not found in context, fetch from API
//         fetchCar();
//       }
//     }
//   }, [id, cars]);

//   const fetchCar = async () => {
//     try {
//       const { data } = await axios.get(`/api/user/car/${id}`);
//       if (data.success) {
//         setCar(data.car);
//       }
//     } catch (error) {
//       console.error("Fetch car error:", error);
//       toast.error("Failed to load car details");
//     }
//   };

//   return car ? (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65 h-4" />
//         <span className="font-medium">Back to all Cars</span>
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//         {/* Car image and details */}
//         <div className="lg:col-span-2">
//           <img 
//             src={car.image || assets.upload_icon} 
//             alt={`${car.brand} ${car.model}`} 
//             className="w-full h-auto max-h-96 object-cover rounded-xl mb-6 shadow-lg" 
//           />
          
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {car.brand} {car.model}
//               </h1>
//               <p className="text-gray-500 text-lg mt-1">
//                 {car.category} • {car.year}
//               </p>
//             </div>

//             <hr className="border-gray-200 my-6" />

//             {/* Specifications Grid */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 { icon: assets.fuel_icon, text: car.fuel_type || "N/A" },
//                 { icon: assets.users_icon, text: `${car.seating_capacity || "N/A"} Seats` },
//                 { icon: assets.car_icon, text: car.transmission || "N/A" },
//                 { icon: assets.location_icon, text: car.location || "N/A" },
//               ].map(({ icon, text }, index) => (
//                 <div 
//                   key={index} 
//                   className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
//                   <span className="text-sm text-gray-700 text-center">{text}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Description */}
//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {car.description || "No description available"}
//               </p>
//             </div>

//             {/* Features */}
//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Features</h2>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {['360 Camera', 'Bluetooth', 'GPS Navigation', 'Heated Seats', 'Rearview Mirror'].map((item) => (
//                   <li key={item} className="flex items-center text-gray-600">
//                     <img src={assets.check_icon} alt="" className="h-4 w-4 mr-2" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Booking Form */}
//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
//             <div className="mb-6">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-3xl font-bold text-gray-900">
//                   {currency}{car.pricePerDay || "0"}
//                 </span>
//                 <span className="text-gray-500">/ day</span>
//               </div>
//               {/* FIXED SPELLING: isAvaliable → isAvailable */}
//               {car.isAvailable ? ( // FIXED HERE
//                 <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
//                   <img src={assets.check_icon} alt="available" className="h-4 w-4" />
//                   Available Now
//                 </p>
//               ) : (
//                 <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
//                   <img src={assets.cross_icon} alt="unavailable" className="h-4 w-4" />
//                   Currently Unavailable
//                 </p>
//               )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//               <div className="flex flex-col gap-2">
//                 <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Pick-up Date
//                 </label>
//                 <input
//                   type="date"
//                   value={pickupDate}
//                   id="pickup-date"
//                   onChange={(e) => setPickupDate(e.target.value)}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Return Date
//                 </label>
//                 <input
//                   type="date"
//                   value={returnDate}
//                   id="return-date"
//                   onChange={(e) => setReturnDate(e.target.value)}
//                   min={pickupDate || new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={!car.isAvailable || !pickupDate || !returnDate || loading} // FIXED SPELLING
//                 className={`w-full py-3 rounded-lg font-semibold transition-all ${
//                   car.isAvailable && pickupDate && returnDate && !loading // FIXED SPELLING
//                     ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? 'Booking...' : (car.isAvailable ? 'Book Now' : 'Not Available')} {/* FIXED */}
//               </button>
//             </form>

//             <p className="text-xs text-gray-500 text-center mt-4">
//               Free cancellation up to 24 hours before pickup
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loader />
//   );
// };

// export default CarDetails;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { assets } from "../assets/assets";
// import Loader from "../components/Loader";
// import { useAppContext } from "../context/AppContext";
// import { toast } from "react-hot-toast";

// const CarDetails = () => {
//   const { id } = useParams();
//   const { 
//     cars, 
//     axios, 
//     pickupDate, 
//     setPickupDate, 
//     returnDate, 
//     setReturnDate 
//   } = useAppContext();

//   const navigate = useNavigate();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const currency = import.meta.env.VITE_CURRENCY || "$";

//   useEffect(() => {
//     console.log("Car data:", car);
//     console.log("Car availability:", car?.isAvailable);
//   }, [car]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!car?.isAvailable) {
//       toast.error("This car is currently unavailable");
//       return;
//     }
    
//     if (!pickupDate || !returnDate) {
//       toast.error("Please select pickup and return dates");
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const { data } = await axios.post('/api/user/book-car', {  // ← CHANGED THIS LINE
//         carId: id,  // ← ALSO CHANGED: car → carId to match backend
//         pickupDate,
//         returnDate
//       });
      
//       if (data.success) {
//         toast.success(data.message || "Booking created successfully!");
//         navigate('/my-bookings');
//       } else {
//         toast.error(data.message || "Failed to create booking");
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       toast.error(error.response?.data?.message || error.message || "Failed to book car");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id && cars?.length > 0) {
//       const foundCar = cars.find(car => car._id === id);
//       if (foundCar) {
//         console.log("Found car availability:", foundCar.isAvailable);
//         setCar(foundCar);
//       } else {
//         fetchCar();
//       }
//     }
//   }, [id, cars]);

//   const fetchCar = async () => {
//     try {
//       const { data } = await axios.get(`/api/user/car/${id}`);
//       if (data.success) {
//         setCar(data.car);
//       }
//     } catch (error) {
//       console.error("Fetch car error:", error);
//       toast.error("Failed to load car details");
//     }
//   };

//   return car ? (
//     <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
//       <button 
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
//       >
//         <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65 h-4" />
//         <span className="font-medium">Back to all Cars</span>
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//         <div className="lg:col-span-2">
//           <img 
//             src={car.image || assets.upload_icon} 
//             alt={`${car.brand} ${car.model}`} 
//             className="w-full h-auto max-h-96 object-cover rounded-xl mb-6 shadow-lg" 
//           />
          
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800">
//                 {car.brand} {car.model}
//               </h1>
//               <p className="text-gray-500 text-lg mt-1">
//                 {car.category} • {car.year}
//               </p>
//             </div>

//             <hr className="border-gray-200 my-6" />

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//               {[
//                 { icon: assets.fuel_icon, text: car.fuel_type || "N/A" },
//                 { icon: assets.users_icon, text: `${car.seating_capacity || "N/A"} Seats` },
//                 { icon: assets.car_icon, text: car.transmission || "N/A" },
//                 { icon: assets.location_icon, text: car.location || "N/A" },
//               ].map(({ icon, text }, index) => (
//                 <div 
//                   key={index} 
//                   className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
//                 >
//                   <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
//                   <span className="text-sm text-gray-700 text-center">{text}</span>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
//               <p className="text-gray-600 leading-relaxed">
//                 {car.description || "No description available"}
//               </p>
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold mb-3 text-gray-800">Features</h2>
//               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {['360 Camera', 'Bluetooth', 'GPS Navigation', 'Heated Seats', 'Rearview Mirror'].map((item) => (
//                   <li key={item} className="flex items-center text-gray-600">
//                     <img src={assets.check_icon} alt="" className="h-4 w-4 mr-2" />
//                     <span>{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>

//         <div className="lg:col-span-1">
//           <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
//             <div className="mb-6">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-3xl font-bold text-gray-900">
//                   {currency}{car.pricePerDay || "0"}
//                 </span>
//                 <span className="text-gray-500">/ day</span>
//               </div>
//               {car.isAvailable ? (
//                 <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
//                   <img src={assets.check_icon} alt="available" className="h-4 w-4" />
//                   Available Now
//                 </p>
//               ) : (
//                 <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
//                   <img src={assets.cross_icon} alt="unavailable" className="h-4 w-4" />
//                   Currently Unavailable
//                 </p>
//               )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4 mb-6">
//               <div className="flex flex-col gap-2">
//                 <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Pick-up Date
//                 </label>
//                 <input
//                   type="date"
//                   value={pickupDate}
//                   id="pickup-date"
//                   onChange={(e) => setPickupDate(e.target.value)}
//                   min={new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
//                   Return Date
//                 </label>
//                 <input
//                   type="date"
//                   value={returnDate}
//                   id="return-date"
//                   onChange={(e) => setReturnDate(e.target.value)}
//                   min={pickupDate || new Date().toISOString().split('T')[0]}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={!car.isAvailable || !pickupDate || !returnDate || loading}
//                 className={`w-full py-3 rounded-lg font-semibold transition-all ${
//                   car.isAvailable && pickupDate && returnDate && !loading
//                     ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? 'Booking...' : (car.isAvailable ? 'Book Now' : 'Not Available')}
//               </button>
//             </form>

//             <p className="text-xs text-gray-500 text-center mt-4">
//               Free cancellation up to 24 hours before pickup
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Loader />
//   );
// };

// export default CarDetails;

// wrong file by deepseek
// 

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import StripeContainer from "../components/Payment/StripeContainer";
import { motion } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();
  const { 
    cars, 
    axios, 
    pickupDate, 
    setPickupDate, 
    returnDate, 
    setReturnDate,
    user  // Added user context to check authentication
  } = useAppContext();

  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY || "$";
  
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!pickupDate || !returnDate || !car) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    
    // Validate dates
    if (start >= end) {
      toast.error("Return date must be after pickup date");
      return 0;
    }
    
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const price = days * car.pricePerDay;
    setTotalPrice(price);
    return price;
  };

  // Debug logging
  useEffect(() => {
    console.log("Car data:", car);
    console.log("Car availability:", car?.isAvailable);
    
    // Calculate price when dates change
    if (pickupDate && returnDate && car) {
      const price = calculateTotalPrice();
      console.log("Calculated total price:", price);
    }
  }, [car, pickupDate, returnDate]);

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("=== BOOKING ATTEMPT START ===");
    console.log("Car ID:", id);
    console.log("Dates:", { pickupDate, returnDate });
    console.log("User logged in:", !!user);
    
    // Check if user is logged in
    if (!user) {
      toast.error("Please login to book a car");
      navigate('/login');
      return;
    }
    
    if (!car?.isAvailable) {
      toast.error("This car is currently unavailable");
      return;
    }
    
    if (!pickupDate || !returnDate) {
      toast.error("Please select pickup and return dates");
      return;
    }
    
    // Validate dates
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    if (start >= end) {
      toast.error("Return date must be after pickup date");
      return;
    }
    
    // Calculate days and validate
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (days < 1) {
      toast.error("Booking must be for at least 1 day");
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Sending booking request to /api/user/book-car");
      
      // CORRECT ENDPOINT: /api/user/book-car
      // CORRECT FIELD NAME: carId (not car)
      const { data } = await axios.post('/api/user/book-car', {
        carId: id,  // Important: field name is carId
        pickupDate,
        returnDate
      });
      
      console.log("Booking API Response:", data);
      
      if (data.success && data.booking) {
        console.log("✅ Booking successful! ID:", data.booking._id);
        
        // Store the created booking
        setCreatedBooking(data.booking);
        
        // Ask user for payment method
        const useOnlinePayment = window.confirm(
          `🎉 Booking Created Successfully!\n\nTotal Amount: ${currency}${totalPrice}\n\nPay online with card? (OK for online payment, Cancel for Cash on Delivery)`
        );
        
        if (useOnlinePayment) {
          // Show Stripe payment modal
          setShowStripeModal(true);
        } else {
          // Cash on Delivery flow
          toast.success(`Booking confirmed! Pay ${currency}${totalPrice} at pickup.`);
          navigate('/my-bookings');
        }
      } else {
        console.error("❌ Booking failed:", data.message);
        toast.error(data.message || "Failed to create booking");
      }
      
    } catch (error) {
      console.error("❌ Booking error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        endpoint: error.config?.url
      });
      
      // Handle different error cases
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        navigate('/login');
      } else if (error.response?.status === 400) {
        toast.error(error.response.data?.message || "Invalid booking request");
      } else if (error.response?.status === 404) {
        toast.error("Booking service not available. Please try /api/user/book-car endpoint");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to book car. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch car data
  useEffect(() => {
    if (id && cars?.length > 0) {
      const foundCar = cars.find(car => car._id === id);
      if (foundCar) {
        console.log("Found car in context:", foundCar.brand, foundCar.model);
        setCar(foundCar);
      } else {
        fetchCar();
      }
    }
  }, [id, cars]);

  const fetchCar = async () => {
    try {
      const { data } = await axios.get(`/api/user/car/${id}`);
      if (data.success) {
        setCar(data.car);
      }
    } catch (error) {
      console.error("Fetch car error:", error);
      toast.error("Failed to load car details");
    }
  };

  // Render loader if car not loaded
  if (!car) {
    return <Loader />;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65 h-4" />
        <span className="font-medium">Back to all Cars</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Car image and details */}
        <div className="lg:col-span-2">
          <img 
            src={car.image || assets.upload_icon} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full h-auto max-h-96 object-cover rounded-xl mb-6 shadow-lg" 
          />
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-500 text-lg mt-1">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-gray-200 my-6" />

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: assets.fuel_icon, text: car.fuel_type || "N/A" },
                { icon: assets.users_icon, text: `${car.seating_capacity || "N/A"} Seats` },
                { icon: assets.car_icon, text: car.transmission || "N/A" },
                { icon: assets.location_icon, text: car.location || "N/A" },
              ].map(({ icon, text }, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img src={icon} alt="" className="h-5 mb-2 opacity-70" />
                  <span className="text-sm text-gray-700 text-center">{text}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {car.description || "No description available"}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['360 Camera', 'Bluetooth', 'GPS Navigation', 'Heated Seats', 'Rearview Mirror'].map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <img src={assets.check_icon} alt="" className="h-4 w-4 mr-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {currency}{car.pricePerDay || "0"}
                </span>
                <span className="text-gray-500">/ day</span>
              </div>
              {car.isAvailable ? (
                <p className="text-green-600 text-sm mt-2 font-medium flex items-center gap-1">
                  <img src={assets.check_icon} alt="available" className="h-4 w-4" />
                  Available Now
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-2 font-medium flex items-center gap-1">
                  <img src={assets.cross_icon} alt="unavailable" className="h-4 w-4" />
                  Currently Unavailable
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="pickup-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Pick-up Date
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  id="pickup-date"
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  id="return-date"
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              {/* Price display */}
              {pickupDate && returnDate && car && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Rental Details:</span>
                    <span className="text-lg font-bold text-blue-700">
                      {currency}{totalPrice}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Daily Rate: {currency}{car.pricePerDay}/day</p>
                    <p>Days: {Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))} days</p>
                    <p className="pt-2 border-t border-blue-100 font-medium">Total: {currency}{totalPrice}</p>
                  </div>
                </div>
              )}

              {/* User login reminder */}
              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Please login to book this car
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={!car.isAvailable || !pickupDate || !returnDate || loading || !user}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center ${
                  car.isAvailable && pickupDate && returnDate && user && !loading
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Booking...
                  </>
                ) : (
                  car.isAvailable ? 'Book Now' : 'Not Available'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Free cancellation up to 24 hours before pickup
            </p>
          </div>
        </div>
      </div>

      {/* Stripe Payment Modal */}
      {showStripeModal && createdBooking && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-md w-full">
            <button
              onClick={() => {
                setShowStripeModal(false);
                setCreatedBooking(null);
                toast.info("Payment cancelled. You can pay at pickup.");
              }}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-lg font-bold"
            >
              ✕ Close
            </button>
            
            <StripeContainer
              amount={totalPrice}
              bookingId={createdBooking._id}
              currency={currency.toLowerCase() === '₹' ? 'inr' : 'usd'}
              onSuccess={(paymentData) => {
                toast.success("Payment successful! Booking confirmed.");
                setShowStripeModal(false);
                navigate('/my-bookings');
              }}
              onCancel={() => {
                setShowStripeModal(false);
                toast.info("Payment cancelled. Pay at pickup.");
              }}
            />
          </div>
        </div>
      )}
      
      {/* Debug button (remove in production) */}
      <button
        onClick={async () => {
          console.log("=== DEBUG INFO ===");
          console.log("User:", user);
          console.log("Car ID:", id);
          console.log("Car:", car);
          console.log("Dates:", { pickupDate, returnDate });
          console.log("Total Price:", totalPrice);
          console.log("Endpoint: /api/user/book-car");
          
          // Test the endpoint
          try {
            const response = await fetch('http://localhost:5000/api/user/book-car', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                carId: id,
                pickupDate: pickupDate || '2024-12-25',
                returnDate: returnDate || '2024-12-28'
              })
            });
            console.log("Test response status:", response.status);
            const data = await response.json();
            console.log("Test response data:", data);
          } catch (error) {
            console.error("Test error:", error);
          }
        }}
        className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded text-xs opacity-50 hover:opacity-100"
      >
        Debug
      </button>
      
    </div>
  );
};

export default CarDetails;