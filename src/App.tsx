import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Home, 
  Car, 
  Waves, 
  Dumbbell, 
  Camera, 
  Users, 
  Phone, 
  Mail, 
  ArrowRight,
  Check,
  Star,
  Shield,
  TreePine,
  Sun
} from 'lucide-react';
import { submitToGoogleSheets, storeDataLocally, ContactFormData } from './utils/googleSheets';



function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

   const handlePhoneChange = (e: { target: { value: string; }; }) => {
  const value = e.target.value.replace(/\D/g, ""); // Only digits
  if (value.length <= 10) {
    setFormData({ ...formData, phone: value });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Try to submit to Google Sheets
      const success = await submitToGoogleSheets(formData as ContactFormData);
      
      if (success) {
        alert('Thank you for your inquiry! Your details have been submitted successfully. We will contact you soon.');
      } else {
        // Fallback to local storage
        storeDataLocally(formData as ContactFormData);
        alert('Thank you for your inquiry! Your details have been saved. We will contact you soon.');
      }
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      // Fallback to local storage
      storeDataLocally(formData as ContactFormData);
      alert('Thank you for your inquiry! Your details have been saved. We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img width={180}  src="./Images/EMBRACE.svg" alt="logo"/>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-900 transition-colors">Features</a>
              <a href="#amenities" className="text-gray-700 hover:text-blue-900 transition-colors">Amenities</a>
              <a href="#location" className="text-gray-700 hover:text-blue-900 transition-colors">Location</a>
              <a href="#contact" className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(./Images/EMBRACE_THE_WIND_01.jpg)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Embrace the Wind
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            The Only 20-Floor Luxury Residential Project in This Premium Pocket
          </p>
          <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-2xl mx-auto">
            Experience unparalleled luxury living on S.G. Highway with personal patios, 
            exclusive lifts, and world-class amenities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="bg-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Schedule a Visit <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a 
              href="#features" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-900 transition-all"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Key USPs Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Unmatched Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why Embrace the Wind stands as the pinnacle of luxury living, 
              offering features and amenities that set new standards in residential excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* USP Cards */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Only 20-Floor Project</h3>
              <p className="text-gray-600 leading-relaxed">
                The exclusive 20-floor tower in this premium pocket, offering unobstructed views and ultimate privacy.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prime S.G. Highway</h3>
              <p className="text-gray-600 leading-relaxed">
                Strategically located on S.G. Highway, providing exceptional connectivity and prestige address.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Patio</h3>
              <p className="text-gray-600 leading-relaxed">
                Every home features a personal patio, your private outdoor sanctuary for relaxation and entertainment.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Exclusive Lifts</h3>
              <p className="text-gray-600 leading-relaxed">
                4 dedicated lifts per block ensuring minimal wait times and enhanced privacy for residents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3-Level Basement</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive 3-level basement parking providing 2-3 free parking spaces per unit.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Sun className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Optimal Natural Light</h3>
              <p className="text-gray-600 leading-relaxed">
                No common sharing walls with healthy margins between blocks ensuring maximum sunlight and ventilation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Architectural Excellence
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">10.25 Ft Net Height</h4>
                    <p className="text-gray-600">Experience spacious living with generous ceiling heights that create an airy, luxurious ambiance.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Spacious Balconies</h4>
                    <p className="text-gray-600">Generous balcony spaces designed for relaxation and outdoor living with premium finishes.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Premium Construction</h4>
                    <p className="text-gray-600">Built with the finest materials and attention to detail, ensuring lasting quality and elegance.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={"./Images/EMBRACE_THE_WIND_20.jpg"} 
                alt="Luxury Interior" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <Star className="h-8 w-8 text-amber-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Premium</div>
                    <div className="text-gray-600">Living Spaces</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              World-Class Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive indoor and outdoor facilities designed for modern luxury living, 
              providing everything you need within your residential community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Amenity Cards */}
            {[
              { icon: Waves, title: "Dual Swimming Pools", desc: "Separate indoor pool for ladies and exterior pool for all residents" },
              { icon: Dumbbell, title: "State-of-Art Gym", desc: "Fully equipped fitness center with modern equipment and trainers" },
              { icon: Users, title: "Banquet Hall", desc: "Elegant banquet facilities for celebrations and gatherings" },
              { icon: Camera, title: "Movie Theatre", desc: "Private cinema experience with comfortable seating" },
              { icon: TreePine, title: "Box Cricket", desc: "Professional box cricket facility for sports enthusiasts" },
              { icon: Users, title: "Basketball Court", desc: "Full-size basketball court for recreational activities" },
              { icon: Home, title: "Toddlers Room", desc: "Safe and fun play area designed specifically for young children" },
              { icon: Star, title: "Indoor Games", desc: "Complete indoor gaming zone with various entertainment options" }
            ].map((amenity, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4">
                  <amenity.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{amenity.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="./Images/EMBRACE_THE_WIND_19.jpg" 
                alt="S.G. Highway Location" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute top-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-full font-semibold">
                Prime Location
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Strategic S.G. Highway Location
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Positioned on the prestigious S.G. Highway, offering unparalleled connectivity 
                to business districts, educational institutions, healthcare facilities, and entertainment hubs.
              </p>
              
              <div className="space-y-4">
                {[
                  "Easy access to corporate offices and business centers",
                  "Proximity to premium shopping malls and restaurants",
                  "Well-connected to educational institutions",
                  "Close to healthcare facilities and hospitals",
                  "Excellent public transportation connectivity"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Visualize Your Future Home
            </h2>
            <p className="text-xl text-gray-600">
              Experience the luxury and elegance that awaits you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "./Images/EMBRACE_THE_WIND_28.jpg",
              "./Images/EMBRACE_THE_WIND_27.jpg",
              "./Images/EMBRACE_THE_WIND_23.jpg",
              "./Images/EMBRACE_THE_WIND_24.jpg",
              "./Images/EMBRACE_THE_WIND_25.jpg",
              "./Images/EMBRACE_THE_WIND_26.jpg",
            ].map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <img 
                  src={image} 
                  alt={`Luxury living ${index + 1}`} 
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Ready to Make It Home?
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Take the first step towards luxury living. Our expert team is ready to guide you 
                through your journey to owning a piece of architectural excellence.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Call Us</h4>
                    <p className="text-blue-200">+91 97979 76577</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-blue-200">Embracethewind33@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Visit Us</h4>
                    <p className="text-blue-200">S.G. Highway, Ahmedabad</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Information</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={handlePhoneChange}
    required
    disabled={isSubmitting}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
    placeholder="Enter your phone number"
    pattern="^[6-9]\d{9}$"
    maxLength={10}
  />
</div>

                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Send Inquiry <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <Building2 className="h-8 w-8 text-amber-500" />
                <span className="text-2xl font-bold">Embrace the Wind</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The pinnacle of luxury living on S.G. Highway. Experience unparalleled comfort, 
                sophistication, and modern amenities in the only 20-floor residential project in this premium location.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91 97979 76577</li>
                <li>Embracethewind33@gmail.com</li>
                <li>S.G. Highway, Ahmedabad</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Embrace the Wind. All rights reserved. | Premium Residential Living</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;