import { useEffect, useState } from 'react';
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
  cashMemo: {
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
    gap: 10,
  },
  billText: {
    fontSize: 8,
    color: '#374151',
  },
  billLabelRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  billNumberContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
    minWidth: 50,
    paddingBottom: 2,
  },
  billNumber: {
    fontSize: 8,
    // clr-black
    // color: '#374151',
    //clr-red
    color: '#dc2626',
    fontWeight: 'bold',
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
    marginTop: 20,
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
              <Text style={styles.cashMemo}>Cash Memo</Text>
              <Text style={styles.businessName}>
                {businessName || 'BUSINESS NAME'}
              </Text>
              <Text style={styles.address}>
                {address || 'Business Address'}
              </Text>
            </View>

            {/* Bill Info */}
            <View style={styles.billInfo}>
              <View style={styles.billLabelRow}>
                <Text style={styles.billText}>Bill No.</Text>
                <View style={styles.billNumberContainer}>
                  <Text style={styles.billNumber}>{generateInvoiceNumber()}</Text>
                </View>
              </View>
              <View style={styles.billLabelRow}>
                <Text style={styles.billText}>Date:</Text>
                <View style={styles.billNumberContainer}>
                  <Text style={styles.billNumber}> </Text>
                </View>
              </View>
            </View>

            {/* Sold To */}
            <View style={styles.soldTo}>
              <Text style={styles.soldToText}>Sold to M/s _______________________________________</Text>
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
              <View style={[styles.billNumberContainer, { minWidth: 60 }]}>
                <Text style={styles.billNumber}> </Text>
              </View>
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

function generateInvoiceNumber() {
  const date = new Date();

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  const random = Math.floor(1000 + Math.random() * 9000);

  return `INV-${mm}${dd}-${random}`;
}

export default function App() {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  // Default invoice background color
  const [invoiceBgColor, setInvoiceBgColor] = useState('#ffffff');
  const [isGenerating, setIsGenerating] = useState(false);
  const [invoice_number, setInvoice_number] = useState<string>("");

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

  useEffect(() => {
    setInvoice_number(generateInvoiceNumber());
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 print:hidden">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                Invoice Details
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter address"
                  />
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Invoice Background Color
                  </label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type="color"
                      value={invoiceBgColor}
                      onChange={(e) => setInvoiceBgColor(e.target.value)}
                      className="w-12 h-10 rounded cursor-pointer border border-gray-300"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 font-mono break-all">{invoiceBgColor}</span>
                  </div>
                </div>

                <button
                  onClick={handlePrint}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Printer size={18} className="sm:w-5 sm:h-5" />
                  {isGenerating ? 'Generating PDF...' : 'Download PDF Invoice'}
                </button>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 print:shadow-none" id="invoice">
              <div className="border-2 border-gray-800 p-3 sm:p-4 md:p-6" style={{ backgroundColor: invoiceBgColor }}>
                {/* Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Cash Memo</p>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-1 sm:mb-2 wrap-break-word">
                    {businessName || 'BUSINESS NAME'}
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-800 wrap-break-word">
                    {address || 'Business Address'}
                  </p>
                </div>

                {/* Bill Info */}
                <div className="flex justify-between items-center gap-2 sm:gap-3 mb-3 pb-4 text-xs sm:text-base">
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-700 whitespace-nowrap">Bill No. </span>
                    <span className="inline-block font-bold border-b border-dotted text-red-600 border-gray-400 min-w-12 sm:min-w-30 h-6">{invoice_number}</span>
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <span className="text-gray-700 whitespace-nowrap">Date: </span>
                    <span className="inline-block border-b border-dotted border-gray-400 min-w-12 sm:min-w-30 h-6"></span>
                  </div>
                </div>

                {/* Sold To */}
                <div className="mb-4 sm:mb-6 text-xs sm:text-base">
                  <span className="text-gray-700">Sold to M/s </span>
                  <span className="border-b border-dotted border-gray-400 inline-block min-w-40 sm:min-w-90 h-6"></span>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto mb-4 sm:mb-6">
                  <table className="w-full border-2 border-gray-800 text-xs sm:text-sm">
                    <thead>
                      <tr className="border-2 border-gray-800">
                        <th className="text-left py-2 px-1 sm:px-2 font-semibold w-12 sm:w-16 border-r-2 border-gray-800">S No.</th>
                        <th className="text-center py-2 px-1 sm:px-2 font-semibold border-r-2 border-gray-800">Description</th>
                        <th className="text-center py-2 px-1 sm:px-2 font-semibold w-20 sm:w-32">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(8)].map((_, index) => (
                        <tr key={index}>
                          <td className="py-3 sm:py-4 px-1 sm:px-2 border-x-2 border-gray-800">&nbsp;</td>
                          <td className="py-3 sm:py-4 px-1 sm:px-2 border-x-2 border-gray-800">&nbsp;</td>
                          <td className="py-3 sm:py-4 px-1 sm:px-2 border-x-2 border-gray-800">&nbsp;</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center text-xs sm:text-base">
                  <span className="font-bold text-sm sm:text-lg">Grand Total</span>
                  <span className="inline-block border-b border-gray-400 min-w-20 sm:min-w-25 h-7"></span>
                </div>

                {/* Signature */}
                <div className="mt-8 sm:mt-12 text-right">
                  <p className="text-xs sm:text-sm font-semibold">Signature</p>
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