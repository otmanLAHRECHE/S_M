import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import BonExamen from "../common/PdfResult";

export default function Resultat(){

  return (
    <PDFViewer>
      <BonExamen />
    </PDFViewer>
  );
}
