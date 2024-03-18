import getSectionLinesByKeywords from "../common-features/getSectionLinesByKeywords";
import { divideSectionIntoSubsections } from "../common-features/divideSectionIntoSubsections";
import {
  DATE_FEATURE_SETS,
  hasComma,
  hasLetter,
  hasNumber,
} from "../common-features/common-features";
import { getTextWithHighestFeatureScore } from "../feature-scoring-system/featureScoringSystem";
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "../common-features/bullte-point";
import groupSubSectionByKeywords from "../common-features/groupSubSectionByKeywords";

const SCHOOLS = [
  "College",
  "University",
  "Institute",
  "School",
  "Education",
  "Academy",
  "BASIS",
  "Magnet",
  "Trường",
  "Đại Học",
  "Cao Đẳng",
];
const hasSchool = (item) =>
  SCHOOLS.some((school) =>
    item.text.toUpperCase().includes(school.toUpperCase())
  );

const DEGREES = ["Associate", "Bachelor", "Master", "PhD", "Ph.", "Engineer"];
const hasDegree = (item) =>
  DEGREES.some((degree) => item.text.includes(degree)) ||
  /[ABM][A-Z\.]/.test(item.text);

const matchGPA = (item) => item.text.match(/[0-4]\.\d{1,2}/);

const matchGrade = (item) => {
  const grade = parseFloat(item.text);
  if (Number.isFinite(grade) && grade <= 110) {
    return [String(grade)];
  }
  return null;
};

const SCHOOL_FEATURE_SETS = [
  [hasSchool, 4],
  //[hasDegree, -4],
  //[hasNumber, -3],
];

const DEGREE_FEATURE_SETS = [
  [hasDegree, 4],
  [hasSchool, -4],
  [hasNumber, -3],
];

const GPA_FEATURE_SETS = [
  [matchGPA, 4, true],
  [matchGrade, 3, true],
  [hasComma, -3],
  [hasLetter, -4],
];

export const extractEducation = (sections) => {
  const educations = [];
  const educationsScores = [];

  const subsectionLines = getSectionLinesByKeywords(sections, ["education", "học vấn"] );

  // console.log(subsectionLines)

  // for (const subsectionLines of subsections) {
  const textItems = subsectionLines?.flat();

  console.log(textItems)

  const [school, schoolScores] = getTextWithHighestFeatureScore(
    textItems,
    SCHOOL_FEATURE_SETS
  );

  const [degree, degreeScores] = getTextWithHighestFeatureScore(
    textItems,
    DEGREE_FEATURE_SETS
  );

  const [gpa, gpaScores] = getTextWithHighestFeatureScore(
    textItems,
    GPA_FEATURE_SETS
  );

  const [date, dateScores] = getTextWithHighestFeatureScore(
    textItems,
    DATE_FEATURE_SETS
  );

  let descriptions = [];
  const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines);

  if (descriptionsLineIdx !== undefined) {
    const descriptionsLines = subsectionLines.slice(descriptionsLineIdx);
    descriptions = getBulletPointsFromLines(descriptionsLines);
  }

  educations.push({ school, degree, gpa, date, descriptions });
  educationsScores.push({
    schoolScores,
    degreeScores,
    gpaScores,
    dateScores,
  });
  // }

  if (educations.length !== 0) {
    const coursesLines = getSectionLinesByKeywords(sections, ["course"]);
    if (coursesLines.length !== 0) {
      educations[0].descriptions.push(
        "Courses: " +
          coursesLines
            .flat()
            .map((item) => item.text)
            .join(" ")
      );
    }
  }

  return { educations, educationsScores };
};
