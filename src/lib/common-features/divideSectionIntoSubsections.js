// import { BULLET_POINTS } from "./bullte-point";
// import { hasFristLetterUpperCase, hasMoreNumber, isBold } from "./common-features";
// import { hasLetterAndIsAllUpperCase, hasNumber, hasComma, hasLocation } from "./common-features";
// import  {getTextWithHighestFeatureScore}  from '../feature-scoring-system/featureScoringSystem';

// const divideSectionIntoSubsections = (lines)=>{
//   // const lines = sections.profile || [];
//   let subSections = [];
//   const textItems = lines.flat();

//   const BREAK_POINT_SECTION = [
//     [(item) => item.text.match(/^[a-zA-Z\sÀ-ỹ\.\-]+$/), 4],
//     [isBold, 3],
//     [hasLetterAndIsAllUpperCase, 4],
//     [hasFristLetterUpperCase, 1],
//     [(item) => item.text.includes("@"), -4], // Email
//     [hasNumber, -4], // Phone
//     // [hasMoreNumber, -4],
//     [hasLocation, -4],
//     [(item) => /\([0-9]+\)/.test(item.text), -4], // Phone
//     [hasComma, -4], // Location
//     [(item) => item.text.includes("//"), -4], // URL
//     [(item) => item.text.split(" ").length <=1 , -2], // Summary
//   ];

//   const [breakPoint, breakPointScore] = getTextWithHighestFeatureScore(
//     textItems,
//     BREAK_POINT_SECTION
//   );

//   console.log(breakPointScore)

//   subSections = breakPointScore.filter((item)=>item.score === breakPointScore[0].score)

//   return subSections;

// const [email, emailScores] = getTextWithHighestFeatureScore(
//   textItems,
//   EMAIL_FEATURE_SETS
// );
// const [phone, phoneScores] = getTextWithHighestFeatureScore(
//   textItems,
//   PHONE_FEATURE_SETS
// );
// const [location, locationScores] = getTextWithHighestFeatureScore(
//   textItems,
//   LOCATION_FEATURE_SETS
// );
// const [url, urlScores] = getTextWithHighestFeatureScore(
//   textItems,
//   URL_FEATURE_SETS
// );
// const [summary, summaryScores] = getTextWithHighestFeatureScore(
//   textItems,
//   SUMMARY_FEATURE_SETS
// );

// const summaryLines = getSectionLinesByKeywords(sections, ["summary"]);
// const summarySection = summaryLines
//   .flat()
//   .map((textItem) => textItem.text)
//   .join(" ");
// const objectiveLines = getSectionLinesByKeywords(sections, ["objective"]);
// const objectiveSection = objectiveLines
//   .flat()
//   .map((textItem) => textItem.text)
//   .join(" ");

//}

// const divideSectionIntoSubsections = (lines) => {
//   const isLineNewSubsectionByLineGap = createIsLineNewSubsectionByLineGap(lines);
//   let subsections = createSubsections(lines, isLineNewSubsectionByLineGap);

//   if (subsections.length === 1) {
//     const isLineNewSubsectionByBold = (line, prevLine) => {
//       if (!isBold(prevLine[0]) && isBold(line[0]) && !BULLET_POINTS.includes(line[0].text)) {
//         return true;
//       }
//       return false;
//     };
//     subsections = createSubsections(lines, isLineNewSubsectionByBold);
//   }

//   return subsections;
// };

// const createIsLineNewSubsectionByLineGap = (lines) => {
//   const lineGapToCount = {};
//   const linesY = lines.map((line) => line[0].y);

//   let lineGapWithMostCount = 0;
//   let maxCount = 0;

//   for (let i = 1; i < linesY.length; i++) {
//     const lineGap = Math.round(linesY[i - 1] - linesY[i]);
//     if (!lineGapToCount[lineGap])
//     {
//       lineGapToCount[lineGap] = 0;
//     }

//     lineGapToCount[lineGap] += 1;

//     if (lineGapToCount[lineGap] > maxCount) {
//       lineGapWithMostCount = lineGap;
//       maxCount = lineGapToCount[lineGap];
//     }

//   }

//   const subsectionLineGapThreshold = lineGapWithMostCount * 1.4;

//   const isLineNewSubsection = (line, prevLine) => {
//     return Math.round(prevLine[0]?.y - line[0]?.y) > subsectionLineGapThreshold;
//   };

//   return isLineNewSubsection;
// };

// const createSubsections = (lines, isLineNewSubsection) => {
//   const subsections = [];
//   let subsection = [];

//   for (let i = 0; i < lines.length; i++) {
//     const line = lines[i];

//     if (i === 0){
//       subsection.push(line);
//       continue;
//     }

//     if (isLineNewSubsection(line, lines[i - 1])) {
//       subsections.push(subsection);
//       subsection = [];
//     }

//     subsection.push(line);
//   }

//   if (subsection.length > 0) {
//     subsections.push(subsection);
//   }

//   return subsections;
// };

import {
  hasFristLetterUpperCase,
  hasMonth,
  hasMoreNumber,
  hasYear,
  isBold,
} from "./common-features";
import {
  hasLetterAndIsAllUpperCase,
  hasNumber,
  hasComma,
  hasLocation,
} from "./common-features";
import { getTextWithHighestFeatureScore } from "../feature-scoring-system/featureScoringSystem";

const divideSectionIntoSubsections = (lines) => {
  let subSections = [];
  const textItems = lines.flat();

  const BREAK_POINT_SECTION = [
    [(item) => item.text.match(/^[a-zA-Z\sÀ-ỹ\.\-]+$/), 4],
    [isBold, 3],
    [hasLetterAndIsAllUpperCase, 4],
    [hasFristLetterUpperCase, 1],
    [hasMonth, 1],
    [hasYear, 1],
    [(item) => item.text.includes("@"), -4], // Email
    [hasNumber, -4], // Phone
    // [hasMoreNumber, -4],
    [hasLocation, -4],
    [(item) => /\([0-9]+\)/.test(item.text), -4], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.includes("//"), -4], // URL
    [(item) => item.text.split(" ").length <= 1, -2], // Summary
  ];

  const [breakPoint, breakPointScore] = getTextWithHighestFeatureScore(
    textItems,
    BREAK_POINT_SECTION
  );

  console.log(breakPointScore);
  subSections = breakPointScore.filter(
    (item) => item.score === breakPointScore[0].score
  );

  console.log(subSections);

  return subSections.length >= 0 ? subSections : [];
};
export { divideSectionIntoSubsections };
