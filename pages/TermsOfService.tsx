import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-8 border-quins-blue pb-4 inline-block">Terms & Conditions</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Kenya Harlequins RFC digital platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Membership & Registration</h2>
            <p>
              When creating an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials. All member activities must comply with the Club's Constitution and Bylaws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Protection Compliance</h2>
            <p>
              Our handling of your personal data is governed by the <strong>Kenya Data Protection Act 2019</strong>. By using this platform, you acknowledge and consent to the processing of your data as described in our Privacy Policy. We warrant that we have registered as a Data Controller/Processor where required by the Office of the Data Protection Commissioner (ODPC) in Kenya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Ticketing & Payments</h2>
            <p>
              All ticket sales are final. Digital tickets are governed by specific event terms. Payment information is processed securely, and we do not store sensitive credit card or M-Pesa pin details on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p>
              All content on this platform, including the Kenya Harlequins RFC logo, branding, and media, is the property of the club and protected by intellectual property laws in Kenya and internationally.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p>
              Kenya Harlequins RFC shall not be liable for any indirect, incidental, or consequential damages arising from the use of this digital platform, to the maximum extent permitted by Kenyan law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Governing Law</h2>
            <p>
              These terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
