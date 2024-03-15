import React, { useState } from "react";
import { Document, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import GroupLinesIntoSections from "../../helpers/GroupLinesIntoSections";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ReaderPDF({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [lines, setLines] = useState([]);

  const parsePdf = async () => {
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let allLines = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageLines = textContent.items.map((item) => item.str);
        allLines = [...allLines, ...pageLines];
      }

      setLines(allLines);
    };

    reader.readAsArrayBuffer(pdfFile);
  };

  return lines;
}

export default ReaderPDF;
