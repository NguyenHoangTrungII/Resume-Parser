import getSectionLinesByKeywords from '../common-features/getSectionLinesByKeywords';
import  {getTextWithHighestFeatureScore}  from '../feature-scoring-system/featureScoringSystem';
import { 
  isBold,
  hasNumber,
  hasComma,
  hasLetter,
  hasLetterAndIsAllUpperCase, 
  hasLocation
} from '../common-features/common-features';

export const extractProfile = (sections) => {
  const lines = sections.profile || [];
  const textItems = lines.flat();

  const NAME_FEATURE_SETS = [
    [(item) => item.text.match(/^[a-zA-Z\sÀ-ỹ\.]+$/), 3, true],
    [isBold, 2],
    [hasLetterAndIsAllUpperCase, 2],
    [(item) => item.text.includes("@"), -4], // Email
    [hasNumber, -4], // Phone
    [(item) => /\([0-9]+\)/.test(item.text), -4], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.includes("/"), -4], // URL
    [(item) => item.text.split(" ").length < 3, -2], // Summary
    [(item) => item.text.split(" ").length >= 4, -2] // Summary
  ];

  const EMAIL_FEATURE_SETS = [
    [(item) => item.text.match(/\S+@\S+\.\S+/), 4, true],
    [isBold, -1], // Name
    [hasLetterAndIsAllUpperCase, -1], // Name
    [(item) => /\([0-9]+\)/.test(item.text), -4], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.includes("/"), -4], // URL
    [(item) => item.text.split(" ").length >= 4, -4], // sumary

  ];

  const PHONE_FEATURE_SETS = [
    [(item) => item.text.replace(/\s/g, "").match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/) || item.text.replace(/\s/g, "").match(/\(?\d{3}\)?\d{7}/), 4, true],
    
    [hasLetter, -4] // Name, Email, Location, URL, Summary
  ];

  const LOCATION_FEATURE_SETS = [
    [(item) => item.text.match(/^[^,]+,\s*[^,]+(?:,\s*[^,]+)*$/), 4, true],
    [hasLocation, 4],
    //[isBold, -1], // Name
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [(item) => item.text.includes("//"), -4] // URL
  ];


  const URL_FEATURE_SETS = [
    [(item) => item.text.match(/\S+\.[a-z]+\/\S+/), 4, true],
    [(item) => item.text.match(/https?:\/\/\S+\.\S+/), 3, true],
    [(item) => item.text.match(/www\.\S+\.\S+/), 3, true],
    [isBold, -1], // Name
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.split(" ").length >= 4, -4] // Summary
  ];

  const SUMMARY_FEATURE_SETS = [
    [(item) => item.text.split(" ").length >= 4, 4],
    [isBold, -1], // Name
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [(item) => item.text.match(/[A-Z][a-zA-Z\s]+, [A-Z]{2}/), -4, false] // Location
  ];

  const [name, nameScores] = getTextWithHighestFeatureScore(
    textItems,
    NAME_FEATURE_SETS
  );
  const [email, emailScores] = getTextWithHighestFeatureScore(
    textItems,
    EMAIL_FEATURE_SETS
  );
  const [phone, phoneScores] = getTextWithHighestFeatureScore(
    textItems,
    PHONE_FEATURE_SETS
  );
  const [location, locationScores] = getTextWithHighestFeatureScore(
    textItems,
    LOCATION_FEATURE_SETS
  );
  const [url, urlScores] = getTextWithHighestFeatureScore(
    textItems,
    URL_FEATURE_SETS
  );
  const [summary, summaryScores] = getTextWithHighestFeatureScore(
    textItems,
    SUMMARY_FEATURE_SETS
  );

  const summaryLines = getSectionLinesByKeywords(sections, ["summary"]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");
  const objectiveLines = getSectionLinesByKeywords(sections, ["objective"]);
  const objectiveSection = objectiveLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");

  return {
    profile: {
      name,
      email,
      phone,
      location,
      url,
      summary: summarySection || objectiveSection || summary,
    },
    profileScores: {
      name: nameScores,
      email: emailScores,
      phone: phoneScores,
      location: locationScores,
      url: urlScores,
      summary: summaryScores,
    },
  };
};

