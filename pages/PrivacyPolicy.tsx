import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-8 border-b-8 border-quins-magenta pb-4 inline-block">Privacy Policy</h1>
        
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>
              Kenya Harlequins RFC ("we", "us", or "our") is committed to protecting the privacy and personal data of our members, fans, and website visitors. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information in accordance with the <strong>Kenya Data Protection Act, 2019</strong>, the <strong>General Data Protection Regulation (GDPR)</strong>, and other applicable regional and international standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Data We Collect</h2>
            <p>We may collect personal information including, but not limited to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Contact information (Name, Email, Phone number)</li>
              <li>Membership details and payment history</li>
              <li>Ticketing information and event attendance</li>
              <li>Technical data (IP address, browser type, device information)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Legal Basis for Processing</h2>
            <p>
              Under the Kenya Data Protection Act 2019, we process your data based on:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Consent:</strong> When you voluntarily provide information for memberships or newsletters.</li>
              <li><strong>Contract:</strong> To fulfill our obligations regarding ticket purchases and club services.</li>
              <li><strong>Legal Obligation:</strong> To comply with statutory requirements in Kenya.</li>
              <li><strong>Legitimate Interests:</strong> To improve our services and communicate club activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Protection & Security</h2>
            <p>
              We implement robust technical and organizational measures to secure your data, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Encryption:</strong> Data is encrypted at rest and in transit (SSL/TLS).</li>
              <li><strong>Access Control:</strong> Strict Row-Level Security (RLS) ensures users only access their own data.</li>
              <li><strong>Secure Infrastructure:</strong> Our platform is hosted on industry-standard secure servers (Supabase/Vercel).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
            <p>In accordance with Kenyan and International law, you have the right to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Request access to your personal data.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Data portability.</li>
              <li>Withdraw consent at any time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Information</h2>
            <p>
              If you have any questions regarding this Privacy Policy or our data protection practices, please contact our Data Protection Officer at:
              <br /><br />
              <strong>Email:</strong> privacy@quins.co.ke<br />
              <strong>Address:</strong> RFUEA Ground, Ngong Road, Nairobi, Kenya
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
