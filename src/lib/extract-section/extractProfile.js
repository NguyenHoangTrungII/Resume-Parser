import getSectionLinesByKeywords from "../common-features/getSectionLinesByKeywords";
import { getTextWithHighestFeatureScore } from "../feature-scoring-system/featureScoringSystem";
import {
  isBold,
  hasNumber,
  hasComma,
  hasLetter,
  hasLetterAndIsAllUpperCase,
  hasLocation,
  hasNoLocation,
  areWordsAllUpperCase,
} from "../common-features/common-features";

export const extractProfile = (sections) => {
  const lines = sections.profile || [];
  let textItems = lines.flat();

  console.log(textItems);

  const text = textItems
    .flat()
    .map((item) => item.text)
    .join(" ");

  // const splitText = (text) => {
  //   const textWithFontName = textItems.flat().map((item) => ({
  //     text: item.text,
  //     fontName: item.fontName,
  //   }));

  //   const result = textWithFontName.map((item) => {
  //     const { text, fontName } = item;

  //     const nameRegex = /^[^\d@\s]+/;
  //     const addressRegex = /\d{3,}.+?\b(?=\d{5})/;
  //     const phoneRegex = /(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/;
  //     const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  //     const urlRegex = /(?:https?|ftp):\/\/[\n\S]+/g;

  //     const name = text.match(nameRegex)?.[0] || "";
  //     const address = text.match(addressRegex)?.[0] || "";
  //     const phone = text.match(phoneRegex)?.[0] || "";
  //     const email = text.match(emailRegex)?.[0] || "";
  //     const url = text.match(urlRegex)?.[0] || "";

  //     return {
  //       text: [
  //         { text: address.trim(), fontName },
  //         { text: phone.trim(), fontName },
  //         { text: phone.trim(), fontName },
  //         { text: url.trim(), fontName },
  //         { text: email.trim(), fontName },
  //       ],
  //     };
  //   });

  // };

  const splitText = (itemTexts) => {
    const regexList = [
      { regex: /^[^\d@\s]+/, type: "name" }, 
      { regex: /\d{3,}.+?\b(?=\d{5})/, type: "address" }, 
      {
        regex: /(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/,
        type: "phone",
      }, 
      {
        regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
        type: "email",
      }, 
      { regex: /(?:https?|ftp):\/\/[\n\S]+/g, type: "url" }, 
      { regex: /(?:https?|ftp):\/\/[\n\S]+/g, type: "url" }, 

    ];

    const result = [];

    itemTexts.forEach((item) => {
      const { text, fontName } = item;

      regexList.forEach(({ regex, type }) => {
        const matches = text.match(regex);
        if (matches) {
          const extractedText = matches[0].trim();
          result.push({ text: extractedText, fontName, type });
        }
      });
    });

    return result;
  };

  const mergeTexts = (originalTexts, newTexts) => {
    const mergedTexts = [...originalTexts];

    newTexts.forEach((newItem) => {
      mergedTexts.push(newItem);
    });

    return mergedTexts;
  };

  const textItemsWithFontName = textItems.flat().map((item) => ({
    text: item.text,
    fontName: item.fontName,
  }));

  const newTexts = splitText(textItemsWithFontName);
  const mergedTexts = mergeTexts(textItems, newTexts);

  textItems = mergedTexts;

  const NAME_FEATURE_SETS = [
    [(item) => item.text.match(/^[a-zA-Z\sÀ-ỹ\.]+$/), 3, true],
    [isBold, 2],
    [areWordsAllUpperCase, 10],
    [(item) => item.text.includes("@"), -4], // Email
    [hasNumber, -4], // Phone
    [(item) => /\([0-9]+\)/.test(item.text), -4], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.includes("/"), -4], // URL
    [(item) => item.text.split(" ").length < 3, -2], // Summary
    [(item) => item.text.split(" ").length >= 4, -2], // Summary
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
    [
      (item) =>
        item.text
          .replace(/\s/g, "")
          .match(/\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/) ||
        item.text.replace(/\s/g, "").match(/\(?\d{3}\)?\d{7}/),
      4,
      true,
    ],

    [hasLetter, -4], // Name, Email, Location, URL, Summary
  ];

  const LOCATION_FEATURE_SETS = [
    // [(item) => item.text.match(/^[^,]+,\s*[^,]+(?:,\s*[^,]+)*$/), 4, true],
    // // [hasLocation, 4],
    // // [isBold, -1], // Name
    // // [hasNoLocation, -3], //No Location
    // [((item) => item.text.includes("@"), -4)], // Email
    // [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    // [(item) => item.text.includes("//"), -4], // URL

    [(item) => item.text.match(/^[^,]+,\s*[^,]+(?:,\s*[^,]+)*$/), 3],

    [hasLocation, 4, true], //Has Location
    [isBold, -1], //Name
    [hasLetterAndIsAllUpperCase, -2], //Name
    [hasNoLocation, -3], //No Location
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [(item) => item.text.includes("//"), -4], // URL
  ];

  const URL_FEATURE_SETS = [
    [(item) => item.text.toLowerCase().match(/\S+\.[a-z]+\/\S+/), 4, true],
    [(item) => item.text.toLowerCase().match(/https?:\/\/\S+\.\S+/), 3, true],
    [(item) => item.text.toLowerCase().match(/www\.\S+\.\S+/), 3, true],
    [isBold, -1], // Name
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [hasComma, -4], // Location
    [(item) => item.text.split(" ").length >= 4, -4], // Summary
  ];

  const SUMMARY_FEATURE_SETS = [
    [(item) => item.text.split(" ").length >= 4, 4],
    [isBold, -1], // Name
    [(item) => item.text.includes("@"), -4], // Email
    [(item) => /\([0-9]+\)/.test(item.text), -3], // Phone
    [(item) => item.text.match(/[A-Z][a-zA-Z\s]+, [A-Z]{2}/), -4, false], // Location
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



  // if (missingInformation) {
  //   const contactInfo = textItems.map((item) => item.text).join(" ");

  //   console.log(contactInfo);

  //   const phoneRegex = /\+?[0-9\s-()]+/;
  //   const phoneMatch = contactInfo.match(phoneRegex);
  //   const phone = phoneMatch ? phoneMatch[0] : null;

  //   const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  //   const emailMatch = contactInfo.match(emailRegex);
  //   const email = emailMatch ? emailMatch[0] : null;

  //   const linkedinRegex = /linkedin\.com\/[A-Za-z0-9_-]+/;
  //   const linkedinMatch = contactInfo.match(linkedinRegex);
  //   const url = linkedinMatch ? linkedinMatch[0] : null;

  //   return {
  //     profile: {
  //       name,
  //       email,
  //       phone,
  //       location,
  //       url,
  //       summary: summary,
  //     },
  //     profileScores: {
  //       name: nameScores,
  //       email: emailScores,
  //       phone: phoneScores,
  //       location: locationScores,
  //       url: urlScores,
  //       summary: summaryScores,
  //     },
  //   };
  // }

  const summaryLines = getSectionLinesByKeywords(sections, ["summary"]);
  const summarySection = summaryLines
    .flat()
    .map((textItem) => textItem.text)
    .join(" ");
  const objectiveLines = getSectionLinesByKeywords(sections, ["objective, mục tiêu nghề nghiệp"]);
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
