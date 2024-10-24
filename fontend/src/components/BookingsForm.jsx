import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../statics/exports";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet , Image ,Link} from "@react-pdf/renderer";

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
            <Text>M/s: {bill.customer_profile.customer_name}</Text>
            <Text>Mobile No. : {bill.customer_profile.customer_mobile}</Text>
            <Text>Vehicle No. : {bill.vehicle.vehicle_no}</Text>
            <Text>Kilometer: {bill.kilometer}</Text>
        </View>
        <View>  
            <Text>Date: {bill.date}</Text>
            <Text>Bill No: {bill.bill_no}</Text>
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

        {bill.service_list.map((service, index) => (
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
        <Text style={{fontSize: "18",fontWeight:"bold","marginTop":"10px",textAlign:"right"}}>Total: {bill.total_price}</Text>
      </View>

      {/* Footer */}
      <view>
          <Text style={{fontSize:"18",fontWeight:"bold",position:"relative",bottom:"0",textAlign:"center","borderTop":"1px solid black"}}>Customer Satisfaction Is Our Goal</Text>
      </view>
    </Page>
  </Document>
);

function BookingsForm({ set_preview, preview,   bill}) {
  const [Employees, setEmployees] = useState([]);
  const [FilteredEmployees,setFilteredEmployees] = useState(Employees)
  const [NonEmployees, setNonEmployees] = useState([]);
  const [FilteredNonEmployees,setFilteredNonEmployees] = useState(NonEmployees)
  const [selectedEmployeeCategory, setSelectedEmployeeCategory] = useState("employee");
  return (
  
    <section
      className={`${
        preview ? "translate-x-0" : "translate-x-full"
      } overflow-y-scroll  shadow-xl border ease-in-out fixed bg-white z-10 duration-500 right-0 group-hover:left-0 h-screen w-full sm:w-1/3`}
    >
      <div className="h-full relative">
        <button
          className="absolute top-12 right-10"
          onClick={() => {
            set_preview(false);
          }}
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
        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Bill Details</h1>
          <form>
            <div className="relative z-0 w-full my-5">
              <div className="w-full h-40 relative z-0 my-5 overflow-scroll">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Serive Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    bill && bill.service_list &&
                    bill.service_list.map((service, index) => (
                        <tr className="bg-white border-b" key={index}>
                          <td className="px-6 py-4 text-gray-900 ">
                            {service.service_name}
                          </td>
                          <td className="px-6 py-4 text-gray-900 w-12">
                            {service.quentity}
                          </td>
                          <td className="px-6 py-4 text-gray-900 w-24"> {service.price} </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            {
              bill && <PDFDownloadLink
              document={<BillPdf bill={bill} />}
              fileName={bill.vehicle.vehicle_no +".pdf"}
              className="w-full my-3 px-6 py-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black focus:outline-none"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download Bill as PDF"
              }
            </PDFDownloadLink>
            }
            
            {/* <button
              id="button"
              type="submit"
              className="w-full my-3 px-6 py-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-black focus:outline-none"
            >
              DownLoad Bill As PDF
            </button> */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default BookingsForm;
