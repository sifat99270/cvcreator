"use client"
import Jspdf2 from '@/components/jspdf2'
import { PDFViewer } from '@react-pdf/renderer'
export default function page() {
  return (
    <div>
       
       <PDFViewer width={1000} height={1000}>
       <Jspdf2 />
       </PDFViewer>
    </div>
  )
}
