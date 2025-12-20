import React, { useEffect } from 'react'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-hot-toast'  // ← ADD THIS IMPORT

const ManageBookings = () => {

  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = React.useState([])

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/owner/bookings')  // ← FIXED ENDPOINT
      data.success ? setBookings(data.bookings) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/owner/change-booking-status', { bookingId, status })  // ← FIXED ENDPOINT
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()  // ← FIXED: Added () to actually call the function
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="manage bookings"
        subtitle="track all customer bookings, approve or cancel requests and manage booking status."
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payments</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className="border-t border-borderColor text-gray-500">

                  {/* Car */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={booking.car?.image}
                      alt=""
                      className="h-12 w-12 aspect-square rounded-md object-cover"
                    />
                    <p>{booking.car?.brand} {booking.car?.model}</p>
                  </td>

                  {/* Dates */}
                  <td className="p-3 max-md:hidden">
                    {booking.pickupDate ? new Date(booking.pickupDate).toLocaleDateString() : ""} - {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : ""}
                  </td>

                  {/* Total */}
                  <td className="p-3">
                    {currency}{booking.price}
                  </td>

                  {/* Payment */}
                  <td className="p-3 max-md:hidden">
                    <span className="bg-gray-100 py-1 px-3 rounded-full text-xs">
                      Offline
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    {booking.status === "pending" ? (
                      <select 
                        onChange={e => changeBookingStatus(booking._id, e.target.value)}  // ← FIXED: _Id → _id
                        value={booking.status}
                        className="px-2 py-1.5 text-gray-500 border border-borderColor rounded-md outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>  {/* ← FIXED: Cancelled → cancelled */}
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings