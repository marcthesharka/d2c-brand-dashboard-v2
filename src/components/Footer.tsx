import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(true);

  return (
    <>
      {/* Cookie Notice Banner */}
      {showCookieNotice && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white text-xs p-3 z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span>We use cookies to improve your experience. By continuing to use this site, you agree to our use of cookies.</span>
            <button
              onClick={() => setShowCookieNotice(false)}
              className="ml-4 px-3 py-1 bg-emerald-600 text-white rounded text-xs hover:bg-emerald-700"
            >
              Accept
            </button>
          </div>
        </div>
      )}

      <footer className="w-full text-center text-xs text-gray-400 py-2 border-t border-gray-100 mt-8">
        <div className="flex justify-center space-x-4">
          <button
            className="text-emerald-600 hover:underline bg-transparent border-none cursor-pointer p-0"
            style={{ fontWeight: 400 }}
            onClick={() => setShowPrivacy(true)}
          >
            Privacy Policy
          </button>
          <button
            className="text-emerald-600 hover:underline bg-transparent border-none cursor-pointer p-0"
            style={{ fontWeight: 400 }}
            onClick={() => setShowTerms(true)}
          >
            Terms
          </button>
          <button
            className="text-emerald-600 hover:underline bg-transparent border-none cursor-pointer p-0"
            style={{ fontWeight: 400 }}
            onClick={() => setShowAbout(true)}
          >
            About Us
          </button>
          <button
            className="text-emerald-600 hover:underline bg-transparent border-none cursor-pointer p-0"
            style={{ fontWeight: 400 }}
            onClick={() => setShowContact(true)}
          >
            Contact
          </button>
          <button
            className="text-emerald-600 hover:underline bg-transparent border-none cursor-pointer p-0"
            style={{ fontWeight: 400 }}
            onClick={() => setShowDisclosure(true)}
          >
            Disclosure
          </button>
        </div>

        {/* Privacy Policy Modal */}
        {showPrivacy && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-700 max-h-96 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-3">Privacy Policy</h2>
              <div className="text-sm space-y-2">
                <p><strong>Last updated:</strong> July 25, 2025</p>
                <p>We collect minimal information to improve your experience. We use cookies for analytics and may display ads through Google AdSense.</p>
                <p>Google AdSense may use cookies to serve personalized ads based on your interests. You can opt out of personalized ads in your Google account settings.</p>
                <p>We don't sell your personal information. You can opt out of cookies through your browser settings.</p>
                <p>For questions about this policy, please contact us.</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => setShowPrivacy(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* About Us Modal */}
        {showAbout && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-700">
              <h2 className="text-lg font-semibold mb-3">About Bodega</h2>
              <div className="text-sm space-y-2">
                <p>We curate the best consumer brands in food, beverage, and lifestyle. Every day, new brands launch, and we track the ones worth your attention.</p>
                <p>Our team researches and reviews products to help you discover what's actually good, not just what's trending.</p>
                <p>We're independent and honest in our reviews. Some links may be affiliate links, but our opinions are our own.</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => setShowAbout(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Contact Modal */}
        {showContact && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-700">
              <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
              <div className="text-sm space-y-2">
                <p><strong>Email:</strong> marcellorossi98@gmail.com</p>
                <p><strong>Website:</strong> d2cbodega.com</p>
                <p>Have a brand suggestion? Want to work together? Just want to say hi? We'd love to hear from you.</p>
                <p>We typically respond within 24 hours during business days.</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => setShowContact(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-700 max-h-96 overflow-y-auto">
              <h2 className="text-lg font-semibold mb-3">Terms of Service</h2>
              <div className="text-sm space-y-2">
                <p><strong>Last updated:</strong> July 25, 2025</p>
                <p>By using this website, you agree to these terms. We provide information about consumer brands for educational and entertainment purposes.</p>
                <p>We make no guarantees about product availability, pricing, or accuracy. Always verify information before making purchases.</p>
                <p>We reserve the right to modify these terms at any time. Continued use constitutes acceptance of changes.</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Disclosure Modal */}
        {showDisclosure && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-gray-700">
              <h2 className="text-lg font-semibold mb-2">Affiliate Disclosure</h2>
              <p>Some links may be affiliate links. We may earn a commission if you make a purchase.</p>
              <button
                className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                onClick={() => setShowDisclosure(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </footer>
    </>
  );
};

export default Footer; 