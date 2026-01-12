import { useState } from 'react';
import { Printer } from 'lucide-react';
import Footer from './footer';
import Navbar from './NavBar';

export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 print:hidden">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Invoice Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter address"
                  />
                </div>

                <button
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <Printer size={20} />
                  Print Invoice
                </button>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none" id="invoice">
              <div className="border-2 border-gray-800 p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-1">Jay Jaganath</p>
                  <h1 className="text-3xl font-bold text-red-600 mb-2">
                    {businessName || 'BUSINESS NAME'}
                  </h1>
                  <p className="text-sm text-blue-800">
                    {address || 'Business Address'}
                  </p>
                </div>

                {/* Bill Info */}
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
                  <div>
                    <span className="text-gray-700">Bill No. </span>
                    <span className="inline-block border-b border-dotted border-gray-400 min-w-20 h-6"></span>
                  </div>
                  <div>
                    <span className="text-gray-700">Date: </span>
                    <span className="inline-block border-b border-dotted border-gray-400 min-w-30 h-6"></span>
                  </div>
                </div>

                {/* Sold To */}
                <div className="mb-6">
                  <span className="text-gray-700">Sold to M/s </span>
                  <span className="border-b border-dotted border-gray-400 inline-block min-w-75 h-6"></span>
                </div>

                {/* Items Table */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b-2 border-gray-800">
                      <th className="text-left py-2 px-2 text-sm font-semibold w-16">No.</th>
                      <th className="text-left py-2 px-2 text-sm font-semibold">Description</th>
                      <th className="text-right py-2 px-2 text-sm font-semibold w-32">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(8)].map((_, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-2 text-sm">&nbsp;</td>
                        <td className="py-4 px-2 text-sm">&nbsp;</td>
                        <td className="py-4 px-2 text-sm text-right">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Grand Total */}
                <div className="flex justify-between items-center py-3 border-t-2 border-gray-800">
                  <span className="font-bold text-lg">Grand Total</span>
                  <span className="inline-block border-b border-gray-400 min-w-25 h-7"></span>
                </div>

                {/* Signature */}
                <div className="mt-12 text-right">
                  <p className="text-sm font-semibold">Signature</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice, #invoice * {
            visibility: visible;
          }
          #invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      </div>
      <Footer />
    </>
  );
}