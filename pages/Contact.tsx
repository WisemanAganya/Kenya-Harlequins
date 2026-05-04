import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-center text-slate-900 uppercase mb-12">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Info */}
            <div className="p-10 bg-slate-900 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                    Have questions about membership, fixtures, or sponsorship? Reach out to us directly.
                </p>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin className="text-quins-magenta shrink-0" />
                        <div>
                            <div className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Visit Us</div>
                            <p>RFUEA Ground, Ngong Road<br/>Nairobi, Kenya</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="text-quins-blue shrink-0" />
                        <div>
                            <div className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Call Us</div>
                            <p>+254 700 000 000</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Mail className="text-quins-green shrink-0" />
                        <div>
                            <div className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Email Us</div>
                            <p>info@quins.co.ke</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                         <Clock className="text-quins-chocolate shrink-0" />
                         <div>
                             <div className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Office Hours</div>
                             <p>Mon - Fri: 8:00 AM - 5:00 PM<br/>Sat: 9:00 AM - 1:00 PM</p>
                         </div>
                     </div>
                </div>
            </div>

            {/* Form */}
            <div className="p-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quins-blue focus:border-transparent outline-none transition" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quins-blue focus:border-transparent outline-none transition" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quins-blue focus:border-transparent outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quins-blue focus:border-transparent outline-none transition">
                            <option>General Inquiry</option>
                            <option>Membership</option>
                            <option>Sponsorship</option>
                            <option>Media</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-quins-blue focus:border-transparent outline-none transition"></textarea>
                    </div>
                    <button type="button" className="w-full bg-quins-blue text-white font-bold py-3 rounded-lg hover:bg-sky-600 transition">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;