"use client";
import React, { useState } from 'react';
import "./globals.css";

export default function RootLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState(1);

  const handlePayNow = () => {
    console.log("Proceeding to payment with user name: ", userName);
    setStep(2);
  };

  const handleIPaid = async () => {
    console.log("Payment confirmed for user: ", userName);
    try {
      const response = await fetch('api/sendEmail', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName }),
      });

      const data = await response.json();
      if (response.ok) {
          console.log("Email sent successfully: ", data);
          setStep(3);
      } else {
          throw new Error(data.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email: ", error.message);
    }
    setStep(3);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Number copied to clipboard!');
  };

  return (
    <html lang="en">
      <head>
        <title>LuxuryTimeTable</title>
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100">
        <header className="mb-5 bg-indigo-600 text-white p-4 text-center font-bold shadow-md">
          Luxury TimeTable
        </header>
      
        {children}

        <footer className="mt-auto bg-indigo-600 text-white p-4 text-center shadow-md">
          <div className="flex justify-center">
            <button className="hover:text-indigo-300 text-xl transition-opacity duration-300" onClick={() => setShowModal(true)}>
              ☕ Support Us
            </button>
          </div>
        </footer>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300">
            <div className="bg-white p-5 rounded-lg shadow-xl animate-fadeInScale">
              {step === 1 && (
                <>
                  <p className="mb-4">Let's get started! Please enter your name below.</p>
                  <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="Enter Full Name" className="border p-2 w-full"/>
                  <button onClick={handlePayNow} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-200 ease-in-out mt-2">Proceed</button>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="mb-4">Kindly send your payment to <b>SadaPay</b> account:</p>
                  <p className="text-lg font-mono bg-gray-100 p-2 rounded inline-block shadow">
                    03085564313
                  </p>
                  <button className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-200" onClick={() => copyToClipboard('03564654646')}>
                    Copy Number
                  </button>
                  <button onClick={handleIPaid} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all duration-200 ease-in-out mt-4 ml-2">Confirm Payment</button>
                </>
              )}
              {step === 3 && (
                <>
                  <p className="mb-4">Thank you for your generous support! 💖</p>
                  <button onClick={() => setShowModal(false)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-200 ease-in-out">Close</button>
                </>
              )}
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
