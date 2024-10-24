import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet , Image ,Link} from "@react-pdf/renderer";
import logo from '/images/logos/Asset1.png'
// Define styles for the PDF document
const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      fontFamily: "Helvetica",
      lineHeight: 1.5,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingBottom: 10,
      borderBottom: "1 solid black",
      textAlign : "center"
    },
    company : {
        display : "flex",
        flexDirection : "column",
        rowGap : "1",
        textAlign:"center",
        justifyContent:"center"
    },
    contact : {
        display : "flex",
        flexDirection : "column",
        rowGap : "1"
    },
    logo: {
      width: 150,
      height: 60,
    },
    titleSection: {
      textAlign: "right",
      flexGrow: 1,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    subheader: {
      fontSize: 12,
      marginTop: 5,
    },
    section: {
      marginBottom: 12,
      paddingHorizontal: 10,
    },
    billDetails: {
      marginBottom: 20,
      fontSize: 10,
    },
    table: {
      display: "table",
      width: "100%",
      marginTop: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#d1d1d1",
      borderCollapse: "collapse",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#d1d1d1",
    },
    tableHeader: {
      fontSize: 12,
      fontWeight: "bold",
      backgroundColor: "#f0f0f0",
      padding: 5,

    },
    tableCol: {
      width: "20%",
      borderLeftWidth: 1,
      borderColor: "#d1d1d1",
      padding: 5,
    },
    tableCell: {
      padding: 5,
      textAlign: "center",
    },
    totalSection: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    totalText: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "right",
      marginRight: 20,
    },
    footer: {
      textAlign: "center",
      fontSize: 10,
      borderTop: "1 solid black",
      
    },
    tableRowEven: {
        backgroundColor: "#f0f0f0", // Color for even rows
    },
    tableRowOdd: {
        backgroundColor: "#ffffff", // Color for odd rows
    },
    tableWidth : {
      width : "40px"
    },
    tabelService : {
      width : "240px"
    },
    customreDetails : {
      display : "flex",
      flexDirection: "row",
      justifyContent : "space-between",
    }
  });

// Bill Component for PDF
// Bill Component for PDF
const BillPdf = ({ bill }) => (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="/images/logos/Asset1.png" />
          <View style={styles.company}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "red", paddingLeft: 20}}>
              RAMDEV MOTORS
          </Text>
            <Link src="https://maps.app.goo.gl/zyH8piZhbthv7oTT7" style={{ color: 'blue', textDecoration: 'none',textAlign:"left",fontSize:"12"}}>
             Near ved-variyav Bridge, Ved Road, Katargam, Surat
          </Link>
         </View>
         <View style={styles.contact}>
         <Text style={{fontWeight : "bold"}}>Contact:</Text>   
         <Text>90670 25831</Text>   
         <Text>75738 69482</Text>   
         </View>
        
        </View>
  
        {/* Kilometer and Date */}
        <View style={[styles.section,styles.customreDetails]}>
          <View>  
              <Text>M/s: {bill.customer.customer_name}</Text>
              <Text>Mobile No. : {bill.customer.customer_mobile}</Text>
              <Text>Vehicle No. : {bill.vehicle.vehicle_no}</Text>
              <Text>Kilometer: {bill.bill.kilometer}</Text>
          </View>
          <View>  
              <Text>Date: {bill.bill.date}</Text>
              <Text>Bill No: {bill.bill.bill_no}</Text>
          </View>
        </View>
  
        {/* Table content */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
          <View style={[styles.tableCol, styles.tableWidth]}>
              <Text>No.</Text>
            </View>
            <View style={[styles.tableCol, styles.tabelService]}>
              <Text>Particulars</Text>
            </View>
            <View style={[styles.tableCol, styles.tableWidth]}>
              <Text>Qty</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Rate</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>Amount</Text>
            </View>
          </View>
  
          {bill.bill.service_list.map((service, index) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
              <View style={[styles.tableCol, styles.tableWidth]}>
                <Text>{index + 1}</Text>
              </View>
              <View style={[styles.tableCol, styles.tabelService]}>
                <Text>{service.service_name}</Text>
              </View>
              <View style={[styles.tableCol, styles.tableWidth]}>
                <Text>{service.quentity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{service.price}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{parseInt(service.quentity) * parseInt(service.price)}</Text>
              </View>
            </View>
          ))}
        </View>
  
        {/* Total */}
        <View style={styles.section}>
          <Text style={{fontSize: "18",fontWeight:"bold","marginTop":"10px",textAlign:"right"}}>Total: {bill.bill.total_price}</Text>
        </View>

        {/* Footer */}
        <view>
            <Text style={{fontSize:"18",fontWeight:"bold",position:"relative",bottom:"0",textAlign:"center","borderTop":"1px solid black"}}>Customer Satisfaction Is Our Goal</Text>
        </view>
      </Page>
    </Document>
  );

  

// Main Bills component
const Bills = ({ sidebar_bill, setSidebar_bill, bill }) => {
  return (
    <section
      className={`${
        sidebar_bill ? "translate-x-0" : "translate-x-full"
      } overflow-y-scroll shadow-xl border ease-in-out fixed bg-white z-10 duration-500 right-0 group-hover:left-0 h-screen w-full sm:w-1/3`}
    >
      <div className="h-full flex flex-col">
        <button
          className="absolute top-12 right-10"
          onClick={() => setSidebar_bill(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>

        <div className="mt-5">
          {/* Bill content */}
          <div className="max-w-2xl mx-auto p-2 sm:p-6">
            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4">
              <div className="text-left">
                <h1 className="text-2xl sm:text-2xl font-bold text-red-700">Ramdev Motors</h1>
                <p className="text-xs sm:text-sm">Near ved-veriyav Bridge,</p>
                <p className="text-xs sm:text-sm">Ved Road, Katargam</p>
                <p className="text-xs sm:text-sm">
                  Contact: 90670 25831, 75738 69482
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-left sm:text-right">
                <p className="text-xs sm:text-sm">Mr./Ms. : {bill.customer.customer_name}</p>
                <p className="text-xs sm:text-sm">Mobile No.: {bill.customer.customer_mobile}</p>
                <p className="text-xs sm:text-sm">Vehicle No. : {bill.vehicle.vehicle_no}</p>
                <p className="text-xs sm:text-sm">Kilometer: {bill.bill.kilometer}</p>
                <p className="text-xs sm:text-sm">Date: {bill.bill.date}</p>
              </div>
            </div>

            {/* Table content */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-800">
                    <th className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                      No.
                    </th>
                    <th className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                      Particulars
                    </th>
                    <th className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                      Qty.
                    </th>
                    <th className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                      Rate
                    </th>
                    <th className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bill.bill.service_list.map((service, index) => (
                    <tr key={index}>
                      <td className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                        {index + 1}
                      </td>
                      <td className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                        {service.service_name}
                      </td>
                      <td className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                        {service.quentity}
                      </td>
                      <td className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                        {service.price}
                      </td>
                      <td className="border px-2 sm:px-4 py-2 text-xs sm:text-base">
                        {parseInt(service.quentity) * parseInt(service.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total */}
            <div className="flex flex-col sm:flex-row justify-end mt-4">
              <div className="w-full sm:w-1/3">
                <div className="flex justify-between border-t pt-2 text-xs sm:text-base">
                  <span className="font-bold">Total:</span>
                  <span>{bill.bill.total_price}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 border-t pt-4">
              <div className="text-xs sm:text-sm">
                <p>M/s: {bill.customer.customer_name}</p>
              </div>
              <div className="text-xs sm:text-sm text-right mt-4 sm:mt-0">
                <p>50% Pay Advance Payment</p>
                <p>Subject to Surat Jurisdiction</p>
              </div>
            </div>

            {/* Download PDF Button */}
            <div className="mt-4">
              <PDFDownloadLink
                document={<BillPdf bill={bill} />}
                fileName={ bill.vehicle.vehicle_no +".pdf"}
                 className="w-full my-3 px-6 py-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black focus:outline-none"
              >
                {({ loading }) =>
                  loading ? "Loading document..." : "Download Bill as PDF"
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bills;
