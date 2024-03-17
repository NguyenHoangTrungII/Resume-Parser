import {
  hasLetterAndIsAllUpperCase,
  hasOnlyLettersSpacesAmpersands,
  isBold,
} from "../common-features/common-features";

// const PROFILE_SECTION = "profile";

//   let sections = {};

//   // const isSectionTitle = (line, lineNumber) => {
//     // const isFirstTwoLines = lineNumber < 2;
//     // const hasMoreThanOneItemInLine = line.length > 1;
//     // const hasNoItemInLine = line.length === 0;

//     // if (isFirstTwoLines || hasMoreThanOneItemInLine || hasNoItemInLine) {
//     //   return false;
//     // }

//     const textItem = line[0];

//     if (isBold(textItem) && hasLetterAndIsAllUpperCase(textItem)) {
//       return true;
//     }

//     const text = textItem.text.trim();
//     const textHasAtMost2Words =
//       text.split(" ").filter((s) => s !== "&").length <= 2;
//     const startsWithCapitalLetter = /[A-Z]/.test(text.slice(0, 1));

//     // const SECTION_TITLE_PRIMARY_KEYWORDS = [
//     //   "experience",
//     //   "education",
//     //   "project",
//     //   "skill",
//     // ];
//     // const SECTION_TITLE_SECONDARY_KEYWORDS = [
//     //   "job",
//     //   "course",
//     //   "extracurricular",
//     //   "objective",
//     //   "summary", // LinkedIn generated resume has a summary section
//     //   "award",
//     //   "honor",
//     //   "project",
//     // ];
//     // const SECTION_TITLE_KEYWORDS = [
//     //   ...SECTION_TITLE_PRIMARY_KEYWORDS,
//     //   ...SECTION_TITLE_SECONDARY_KEYWORDS,
//     // ];

//     if (
//       textHasAtMost2Words &&
//       hasOnlyLettersSpacesAmpersands(textItem) &&
//       startsWithCapitalLetter &&
//       SECTION_TITLE_KEYWORDS.some((keyword) =>
//         text.toLowerCase().includes(keyword)
//       )
//     ) {
//       return true;
//     }

//     return false;
//   };

// let sectionName = SECTION_TITLE_KEYWORDS[0];
// let sectionLines = [];

// for (let i = 0; i < lines.length; i++) {
//   const line = lines[i];
//   const text = line[0]?.text.trim();

//   if (isSectionTitle(line, i)) {
//     sections[sectionName] = [...sectionLines];
//     sectionName = text;
//     sectionLines = [];
//   } else {
//     sectionLines.push(line);
//   }
// }

// if (sectionLines.length > 0) {
//   sections[sectionName] = [...sectionLines];
// }

// return sections;

// const groupSubSectionByKeywords = (lines, SECTION_TITLE_KEYWORD) => {
//   let SECTION_TITLE_KEYWORDS = SECTION_TITLE_KEYWORD.map((item) =>
//     item.text.trim()
//   );
//   let sections = {};
//   let sectionLines = [];
//   let sectionName = SECTION_TITLE_KEYWORDS[0];

//   for (let i = 1; i < lines.length; i++) {
//     const line = lines[i];
//     console.log(line);
//     let text = line[0]?.text.trim();

//     if (SECTION_TITLE_KEYWORDS.includes(text.trim())) {
//       sectionLines.push([{ text: sectionName }]);
//       sections[sectionName] = [...sectionLines];
//       sectionName = text;
//       sectionLines = [];
//     } else {
//       sectionLines.push(line);
//     }

//     if (sectionLines.length > 0) {
//       console.log()
//       sections[sectionName] = [...sectionLines];
//     }
//   }

//   console.log(sections);

//   return sections;
// };

// export default groupSubSectionByKeywords;

// const groupSubSectionByKeywords = (lines, SECTION_TITLE_KEYWORD) => {
//   let SECTION_TITLE_KEYWORDS = SECTION_TITLE_KEYWORD.map((item) =>
//     item.text.trim()
//   );
//   const sections = {};
//   let sectionTitle = "";
//   let sectionLines = [];

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];
//     const text = line[0]?.text.trim();

//     if (SECTION_TITLE_KEYWORDS.includes(text)) {
//       if (sectionLines.length > 0) {
//         sections[sectionTitle] = {
//           ...sectionLines,
//         };
//         sections[sectionTitle] = [{ text: sectionLines }];
//         sectionLines = [];
//       }

//       sectionTitle = text;
//     } else {
//       sectionLines.push(line);
//     }
//   }

//   // Lưu trữ dữ liệu của phần cuối cùng (nếu có)
//   if (sectionLines.length > 0) {
//     sections[sectionTitle] = {
//       ...sectionLines,
//     };

//     sections[sectionTitle] = [{ text: sectionLines }];
//   }

//   return sections;
// };

// export default groupSubSectionByKeywords;

const groupSubSectionByKeywords = (lines, SECTION_TITLE_KEYWORD) => {
  let SECTION_TITLE_KEYWORDS = SECTION_TITLE_KEYWORD.map((item) =>
    item.text.trim()
  );
  const sections = {};
  let sectionTitle = "";
  let sectionLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const text = line[0]?.text.trim();

    if (SECTION_TITLE_KEYWORDS.includes(text)) {
      if (sectionLines.length > 0) {
        sections[sectionTitle].lines = [...sectionLines];
      }

      sectionTitle = text;

      sections[sectionTitle] = { title: sectionTitle };

      sectionLines = [];
    } else {
      sectionLines.push(line);
    }
  }

  if (sectionLines.length > 0) {
    sections[sectionTitle].lines = [...sectionLines];
  }

  return sections;
};

export default groupSubSectionByKeywords;
