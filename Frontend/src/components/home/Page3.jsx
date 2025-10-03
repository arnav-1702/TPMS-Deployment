import React from 'react'
import NileshImg from "../../../assets/Nilesh.jpg"
const Page3 = () => {
  return (
    <div className="bg-gray-50">
      <section className="px-6 py-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-10">
              
              {/* Profile Image */}
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                <img
                  src={NileshImg} // Replace with your image URL
                  alt="Nilesh Pandit"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name + Subtitle */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#2D336B]">
                  Nilesh Pandit
                </h3>
                <p className="text-[#6B6F9C] text-base md:text-lg mt-3 leading-relaxed max-w-xl">
                  With over 8 years of experience in Human Resources, Nilesh
                  Pandit founded <span className="font-semibold text-[#2D336B]">Talentpool Manpower Services</span> in 2022, 
                  providing businesses with reliable recruitment and workforce solutions.
                </p>
              </div>
            </div>

            {/* Quote Section */}
            <div className="relative flex items-start md:ml-12">
              {/* Opening Quote Icon */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25419.png" // Replace with your opening quote image URL
                alt="Opening Quote"
                className="w-8 h-8 md:w-10 md:h-10 mr-4 mt-1"
              />
              
              {/* Quote Text */}
              <p className="text-[#2D336B] text-lg md:text-xl leading-8 max-w-4xl italic">
                “My journey in HR taught me that people are the true strength of
                any organization. Through Talentpool, my mission is to connect
                skilled professionals with the right opportunities, empowering
                both individuals and businesses to grow together.”
                
                {/* Closing Quote Icon */}
                <img
                  src="https://cdn-icons-png.flaticon.com/512/25/25418.png" // Replace with your closing quote image URL
                  alt="Closing Quote"
                  className="inline-block w-6 h-6 md:w-7 md:h-7 ml-2 align-bottom"
                />
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Page3