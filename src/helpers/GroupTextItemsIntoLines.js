// import {hasYear, hasPresent, hasMonth} from '../lib/common-features/common-features'
// const groupTextItemsIntoLines = (textItems) => {
//   const lines = [];

//   let line = [];
//   let textLine ="";
//   // textItems = textItems.filter(item => (item.text!== ' ' ||  item.text!== '') && item.hasEOL===false );
//   // console.log(textItems)

//   for (let i = 0; i < textItems.length; i++) {
//   let item = textItems[i];

//   if (!(textItems[i + 1]?.y === item.y)) {

//     if (item.text.trim() !== "" ){
//       textLine+=item.text;
//     }
//     // if(!(textItems[i-1]?.x + textItems[i-1]?.w - item.x > 10 )){
//     //   textLine="";
//     //   textLine+=item.text;
//     // }

//     line.push({ ...item, text: textLine });
//     textLine="";
//     lines.push(line);
//     line = [];

//   }
//   else if((textItems[i-1]?.x + textItems[i-1]?.w - item.x > 10 ) && (item.y === textItems[i - 1]?.y) ){
//     line.push({ ...item, text: textLine });
//     textLine="";
//     lines.push(line);
//     line = [];
//     textLine+=item.text;
//   }

//   //if((textItems[i - 1]?.y === item.y) || textItems[i-1]?.hasEOL)
//   else  {

//     // if(!item.text.match(/[^\w\sĐđÀÁẢẠÃẠÂẦẤẨẬẪăắằẵặẳÂẤẦẨẪẬĂẮẰẴẶẲÈÉẺẸẼỀẾỆỄÊỂÌÍỈỊĨÌÍỈỊĨÒÓỎỌÕỒỐỔỖỘÔỐỒỔỖỘƠỜỚỞỠỢỞƠÙÚỦỤŨỪỨỬỮỰỬƯỨỪỬỰỮỨỪỬỮỰỬỲÝỶỴỸỲÝỶỴỸỰ̀́̉̃Đđ]+/g)
//     // ){

//       textLine += item.text;
//     // }
//   }

//   if (line.length > 0) {
//     lines.push(line);
//   }

// }

// // let line = [];
// // for (let item of textItems) {
// //   // If item is EOL, add current line to lines and start a new empty line
// //   if (item.hasEOL) {
// //     if (item.text.trim() !== "") {
// //       line.push({ ...item });
// //     }
// //     lines.push(line);
// //     line = [];
// //   }
// //   // Otherwise, add item to current line
// //   else if (item.text.trim() !== "") {
// //     line.push({ ...item });
// //   }
// // }
// // // Add last line if there is item in last line
// // if (line.length > 0) {
// //   lines.push(line);
// // }

//   //   for (let item of textItems) {
//   //   let preventItem;
//   //   if ( item.hasEOL) {
//   //     if (item.text.trim() !== "") {
//   //       line.push({ ...item });
//   //     }
//   //     lines.push(line);
//   //     line = [];
//   //   } else if (item.text.trim() !== "") {
//   //     line.push({ ...item });
//   //   }
//   // }
//   // if (line.length > 0) {
//   //   lines.push(line);
//   // }

//   // for (let item of textItems) {
//   //   let preventItem;
//   //   if (!(item.y == .y)  || item.hasEOL) {
//   //     if (item.text.trim() !== "") {
//   //       line.push({ ...item });
//   //     }
//   //     lines.push(line);
//   //     line = [];
//   //   } else if (item.text.trim() !== "") {
//   //     line.push({ ...item });
//   //   }
//   // }
//   // if (line.length > 0) {
//   //   lines.push(line);
//   // }

//   // for (let i = 0; i < textItems.length; i++) {
//   //   const item = textItems[i];

//   //   if (!(item.y === textItems[i + 1]?.y) ) {

//   //     // if (item.text.trim() !== "") {
//   //     //   line.push({"text": textLine, ...item });
//   //     // }

//   //     if(textLine.length !=0){
//   //       line.push({ ...item,"text": textLine });
//   //     }
//   //     else{
//   //       line.push({...item})
//   //     }

//   //     lines.push(line);

//   //     line = [];
//   //     textLine="";
//   //   } else  {
//   //     //var index = lines.length === 0 ? 0 : line.length-1;

//   //     textLine += item.text;

//   //     //line.push({ ...item });

//   //   }
//   // }

//   // for (let i = 0; i < textItems.length; i++) {
//   //   const item = textItems[i];

//   //   if (!(item.y === textItems[i + 1]?.y) ) {

//   //     if (item.text.trim() !== "") {
//   //       line.push({ ...item });
//   //     }

//   //     line = [];
//   //     textLine="";
//   //   } else if (item.text.trim() !== "") {
//   //     //var index = lines.length === 0 ? 0 : line.length-1;
//   //     textLine += item.text;

//   //     //line.push({ ...item });

//   //   }
//   // }

//   // console.log(lines);

//   const shouldAddSpaceBetweenText = (leftText, rightText) => {
//     const leftTextEnd = leftText[leftText.length - 1];
//     const rightTextStart = rightText[0];
//     const conditions = [
//       [":", ",", "|", "."].includes(leftTextEnd) && rightTextStart !== " ",
//       leftTextEnd !== " " && ["|"].includes(rightTextStart),
//     ];

//     return conditions.some((condition) => condition);
//   };

//   const getTypicalCharWidth = (textItems) => {
//     textItems = textItems.filter((item) => item.text.trim() !== "");

//     const heightToCount = {};
//     let commonHeight = 0;
//     let heightMaxCount = 0;

//     const fontNameToCount = {};
//     let commonFontName = "";
//     let fontNameMaxCount = 0;

//     for (let item of textItems) {
//       const { text, height, fontName } = item;
//       if (!heightToCount[height]) {
//         heightToCount[height] = 0;
//       }
//       heightToCount[height]++;
//       if (heightToCount[height] > heightMaxCount) {
//         commonHeight = height;
//         heightMaxCount = heightToCount[height];
//       }

//       if (!fontNameToCount[fontName]) {
//         fontNameToCount[fontName] = 0;
//       }
//       fontNameToCount[fontName] += text.length;
//       if (fontNameToCount[fontName] > fontNameMaxCount) {
//         commonFontName = fontName;
//         fontNameMaxCount = fontNameToCount[fontName];
//       }
//     }

//     const commonTextItems = textItems.filter(
//       (item) => item.fontName === commonFontName && item.height === commonHeight
//     );

//     const [totalWidth, numChars] = commonTextItems.reduce(
//       (acc, cur) => {
//         const [preWidth, prevChars] = acc;
//         return [preWidth + cur.width, prevChars + cur.text.length];
//       },
//       [0, 0]
//     );

//     return totalWidth / numChars;
//   }

//   const typicalCharWidth = getTypicalCharWidth(lines.flat());

//   for (let line of lines) {

//     for (let i = line.length - 1; i > 0; i--) {
//       const currentItem = line[i];
//       const leftItem = line[i - 1];
//       const leftItemXEnd = leftItem.x + leftItem.width;
//       const distance = currentItem.x - leftItemXEnd;
//       if (distance <= typicalCharWidth) {
//         if (shouldAddSpaceBetweenText(leftItem.text, currentItem.text)) {
//           leftItem.text += " ";
//         }
//         leftItem.text += currentItem.text;
//         const currentItemXEnd = currentItem.x + currentItem.width;
//         leftItem.width = currentItemXEnd - leftItem.x;
//         line.splice(i, 1);
//       }
//     }
//   }

//   console.log(lines)
//   return lines;
// };

// export default groupTextItemsIntoLines;

import {
  hasYear,
  hasPresent,
  hasMonth,
} from "../lib/common-features/common-features";

const groupTextItemsIntoLines = (textItems) => {
  const lines = [];
  let line = [];
  let textLine = "";

  for (let i = 0; i < textItems.length; i++) {
    let item = textItems[i];

    if (textItems[i]?.hasEOL) {
      textLine += item.text;
      continue;
    }

    if (!(textItems[i]?.y === textItems[i + 1]?.y)) {
      if (item.text.trim().length !== 0) {
        textLine += item.text;
      }
      line.push({ ...item, text: textLine });
      textLine = "";
      lines.push(line);
      line = [];
    } else {
      if (
        textItems[i - 1]?.x + textItems[i - 1]?.w - item.x > 10 &&
        item.y === textItems[i - 1]?.y
      ) {
        line.push({ ...item, text: textLine });
        textLine = "";
        lines.push(line);
        line = [];
        textLine += item.text;
      } else {
        textLine += item.text;
      }
    }
  }

  if (line.length > 0) {
    lines.push(line);
  }

  return lines;
};

export default groupTextItemsIntoLines;
