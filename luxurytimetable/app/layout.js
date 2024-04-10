
"use client";
import React, { useState } from 'react'
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>LuxuryTimeTable</title>
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100">
        <header className="bg-indigo-600 text-white p-4 text-center font-bold shadow-md">
          LuxuryTimeTable
        </header>
  
        {children}
  
        <footer className="bg-indigo-600 text-white p-4 text-center shadow-md">
          <div className="flex justify-center space-x-8">
            <a href="https://www.linkedin.com/in/member1" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
              Member 1
            </a>
            <a href="https://www.linkedin.com/in/member2" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-300">
              Member 2
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
  
  
}
