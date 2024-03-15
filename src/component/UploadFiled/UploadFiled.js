import React, { useState, useEffect } from "react";
import styles from "./UploadFiled.module.scss";
import classNames from "classnames/bind";
import { Document, pdfjs, Page } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/Page/TextLayer.css';

import GroupTextItemsIntoLines from "../../helpers/GroupTextItemsIntoLines";
import groupLinesIntoSections from "../../helpers/GroupLinesIntoSections";
import { extractProfile } from "../../lib/extract-section/extractProfile";
import extractProject from "../../lib/extract-section/extractProject";
import InputFiled from "../InputFiled/InputFiled";
import { extractEducation } from "../../lib/extract-section/extractEducation";
import getSectionLinesByKeywords from "../../lib/common-features/getSectionLinesByKeywords";
import { divideSectionIntoSubsections } from "../../lib/common-features/divideSectionIntoSubsections";
import groupSubSectionByKeywords from "../../lib/common-features/groupSubSectionByKeywords";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const cx = classNames.bind(styles);

function UploadFiled() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [lines, setLines] = useState([]);

  var a ="";

  useEffect(() => {
    if (pdfFile) {
      parsePdf();
    }
  }, [pdfFile]);

  const readPDFFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const parsePdf = async () => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjs.getDocument(typedArray).promise;
      let allLines = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        const pageLines = textContent.items.map((item) =>  ({
          text: item.str,
          hasEOL: item.hasEOL,
          fontName: item.fontName,
          x: item.transform[4],
          y: Math.ceil(item.transform[5]),
          b: item.type,
          h: item.height,
          w: item.width,
          k: item.transform,
          m: item.type
        }));
        allLines = [...allLines, ...pageLines];

      }

      setLines(allLines);
    };

    reader.readAsArrayBuffer(pdfFile);
  };

  // const paragraphs = lines.map(item => item.text);

  // const longString = paragraphs.join('');

  // console.log('tách', longString);

  // console.log('tách', longString.split(' '));

  const groupedLines = GroupTextItemsIntoLines(lines);

  const sections = groupLinesIntoSections(groupedLines);

  const abc  = getSectionLinesByKeywords(sections, ['project']);

  console.log(groupedLines)

  console.log(abc)
  console.log(divideSectionIntoSubsections(abc))
  console.log(groupSubSectionByKeywords(abc, divideSectionIntoSubsections(abc).map((item)=>item.text.trim())))


  const abcd  = getSectionLinesByKeywords(sections, ['EXPERIENCE']); 

  console.log(abcd)
  console.log(divideSectionIntoSubsections(abcd))
  console.log(groupSubSectionByKeywords(abcd, divideSectionIntoSubsections(abcd).map((item)=>item.text.trim())))



  console.log(lines)
  console.log((sections));

  // console.log(extractProfile(sections));
  // console.log(extractProject(sections))
  // console.log(extractEducation(sections));
  



  return (
    <div className={cx('container')}>
      <div>
      <input type="file" onChange={(e) => readPDFFile(e)} />
      {pdfFile && (
        <div className="pdfContainer">
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
    {/* <div className={cx('inputFiled')}>
      <InputFiled dataProfile={extractProfile(sections).profile} dataEducation={extractEducation(sections).educations[0]} dataSkill={sections['Skills']}   />
    
    </div> */}
    </div>
  );
}

export default UploadFiled;
