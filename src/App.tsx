import { useState } from 'react';
import { Printer } from 'lucide-react';
import Footer from './footer';
import Navbar from './NavBar';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 9,
    backgroundColor: '#ffffff',
  },
  invoiceContainer: {
    width: '49%',
    marginBottom: 8,
    border: '2px solid #1f2937',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
  },
  jayJaganath: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 4,
  },
  address: {
    fontSize: 8,
    color: '#1e40af',
  },
  billInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 8,
  },
  billText: {
    fontSize: 8,
    color: '#374151',
  },
  soldTo: {
    marginBottom: 15,
  },
  soldToText: {
    fontSize: 8,
    color: '#374151',
  },
  table: {
    border: '2px solid #1f2937',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2px solid #1f2937',
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 20,
  },
  snoCell: {
    width: '15%',
    padding: 4,
    borderRight: '2px solid #1f2937',
    fontSize: 7,
  },
  descCell: {
    width: '55%',
    padding: 4,
    borderRight: '2px solid #1f2937',
    fontSize: 7,
  },
  amountCell: {
    width: '30%',
    padding: 4,
    fontSize: 7,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 8,
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  grandTotalText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  signature: {
    textAlign: 'right',
    marginTop: 25,
  },
  signatureText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
});

// PDF Document Component
const InvoicePDFDocument = ({ businessName, address, invoiceBgColor }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.row}>
        {[1, 2, 3, 4].map((num) => (
          <View key={num} style={[styles.invoiceContainer, { backgroundColor: invoiceBgColor }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.jayJaganath}>Jay Jaganath</Text>
              <Text style={styles.businessName}>
                {businessName || 'BUSINESS NAME'}
              </Text>
              <Text style={styles.address}>
                {address || 'Business Address'}
              </Text>
            </View>

            {/* Bill Info */}
            <View style={styles.billInfo}>
              <Text style={styles.billText}>Bill No. _________</Text>
              <Text style={styles.billText}>Date: _________</Text>
            </View>

            {/* Sold To */}
            <View style={styles.soldTo}>
              <Text style={styles.soldToText}>Sold to M/s __________________________________</Text>
            </View>

            {/* Items Table */}
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.snoCell, styles.headerText]}>S No.</Text>
                <Text style={[styles.descCell, styles.headerText]}>Description</Text>
                <Text style={[styles.amountCell, styles.headerText]}>Amount</Text>
              </View>
              {[...Array(8)].map((_, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.snoCell}> </Text>
                  <Text style={styles.descCell}> </Text>
                  <Text style={styles.amountCell}> </Text>
                </View>
              ))}
            </View>

            {/* Grand Total */}
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalText}>Grand Total</Text>
              <Text style={styles.billText}>___________</Text>
            </View>

            {/* Signature */}
            <View style={styles.signature}>
              <Text style={styles.signatureText}>Signature</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  // Default invoice background color
  const [invoiceBgColor, setInvoiceBgColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <InvoicePDFDocument
          businessName={businessName}
          address={address}
          invoiceBgColor={invoiceBgColor}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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

                {/* ── Color Picker ── */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Background Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={invoiceBgColor}
                      onChange={(e) => setInvoiceBgColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300"
                    />
                    <span className="text-sm text-gray-600 font-mono">{invoiceBgColor}</span>
                  </div>
                </div>

                <button
                  onClick={handlePrint}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Printer size={20} />
                  {isGenerating ? 'Generating PDF...' : 'Download PDF Invoice'}
                </button>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-white rounded-lg shadow-lg p-8 print:shadow-none" id="invoice">
              <div className="border-2 border-gray-800 p-6"
                style={{ backgroundColor: invoiceBgColor }}
              >
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
                <div className="flex justify-between items-center mb-3 pb-4">
                  <div>
                    <span className="text-gray-700">Bill No. </span>
                    <span className="inline-block border-b border-dotted border-gray-400 min-w-30 h-6"></span>
                  </div>
                  <div>
                    <span className="text-gray-700">Date: </span>
                    <span className="inline-block border-b border-dotted border-gray-400 min-w-30 h-6"></span>
                  </div>
                </div>

                {/* Sold To */}
                <div className="mb-6">
                  <span className="text-gray-700">Sold to M/s </span>
                  <span className="border-b border-dotted border-gray-400 inline-block min-w-90 h-6"></span>
                </div>

                {/* Items Table */}
                <table className="w-full mb-6 border-2 border-gray-800">
                  <thead>
                    <tr className="border-2 border-gray-800">
                      <th className="text-left py-2 px-2 text-sm font-semibold w-16 border-r-2 border-gray-800">S No.</th>
                      <th className="text-center py-2 px-2 text-sm font-semibold border-r-2 border-gray-800">Description</th>
                      <th className="text-center py-2 px-2 text-sm font-semibold w-32">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(8)].map((_, index) => (
                      <tr key={index}>
                        <td className="py-4 px-2 text-sm border-x-2 border-gray-800">&nbsp;</td>
                        <td className="py-4 px-2 text-sm border-x-2 border-gray-800">&nbsp;</td>
                        <td className="py-4 px-2 text-sm border-x-2 border-gray-800">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Grand Total */}
                <div className="flex justify-between items-center">
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
      </div>
      <Footer />
    </>
  );
}