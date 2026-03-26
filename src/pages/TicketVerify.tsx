import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase'; // Ensure this path points to your firebase.ts
import { doc, getDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Define the structure of your booking data for TypeScript
interface BookingData {
  passengerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  status?: string;
}

const TicketVerify = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "bookings", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking(docSnap.data() as BookingData);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const downloadPDF = () => {
    const input = document.getElementById('ticket-content');
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = (pdf as any).getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save(`TravelRa_Ticket_${id}.pdf`);
      });
    }
  };

  if (loading) return <div style={{textAlign: 'center', marginTop: '50dp'}}>Loading Digital Ticket...</div>;
  if (!booking) return <div style={{textAlign: 'center', marginTop: '50dp'}}>Invalid Ticket: Booking not found.</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div id="ticket-content" style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        maxWidth: '450px', 
        margin: 'auto', 
        border: '2px solid #121921',
        borderRadius: '8px' 
      }}>
        <h2 style={{ textAlign: 'center', color: '#121921', marginBottom: '5px' }}>TRAVEL RA</h2>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>Official Booking Receipt</p>
        <hr style={{ border: '0.5px solid #eee', margin: '20px 0' }} />
        
        <div style={{ lineHeight: '1.8' }}>
          <p><strong>Booking ID:</strong> <span style={{ color: '#007bff' }}>#{id}</span></p>
          <p><strong>Passenger:</strong> {booking.passengerName}</p>
          <p><strong>Pickup:</strong> {booking.pickupLocation}</p>
          <p><strong>Drop-off:</strong> {booking.dropoffLocation}</p>
          <p><strong>Vehicle:</strong> {booking.vehicleType}</p>
          <p><strong>Status:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>CONFIRMED</span></p>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '10px', color: '#999' }}>
          Scan verified via TravelRa Cloud Engine
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={downloadPDF} 
          style={{ 
            padding: '12px 25px', 
            backgroundColor: '#121921', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          Download Ticket as PDF
        </button>
      </div>
    </div>
  );
};

export default TicketVerify;