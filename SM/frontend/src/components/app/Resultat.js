import React from "react"
import { PDFViewer } from '@react-pdf/renderer';
import BonExamen from "../common/PdfResult";
import { useLocation } from "react-router-dom";

export default function Resultat(){
    
    const { state } = useLocation();


  return (
    <PDFViewer>
      <BonExamen id={state.id}/>
    </PDFViewer>
  );
}
