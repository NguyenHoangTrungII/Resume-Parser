const isTextItemBold = (fontName) => fontName.toLowerCase().includes("bold");

export const isBold = (item) => isTextItemBold(item.fontName);

export const hasLetter = (item) => /[a-zA-Z]/.test(item.text);

export const hasNumber = (item) => /[0-9]/.test(item.text);


export const hasMoreNumber = (item) => {
  const numbers = item.text.match(/\d/g); 
  return numbers && numbers.length > 9; 
};


export const hasComma = (item) => item.text.includes(",");

export const getHasText = (text) => (item) => item.text.includes(text);

export const hasOnlyLettersSpacesAmpersands = (item) =>
  /^[A-Za-z\s&]+$/.test(item.text);

// export const hasLetterAndIsAllUpperCase = (item) =>
//   hasLetter(item) && item.text.toUpperCase() === item.text;

export const hasLetterAndIsAllUpperCase = (item) =>
   item.text.toUpperCase() === item.text; 

export const hasFristLetterUpperCase = (item) =>
   item.text[0]?.toUpperCase() === item.text[0]; 


// export const getFontsize =()=>{
//   item.h
// }

  // Date Features
export const hasYear = (item) => /(?:19|20)\d{2}/.test(item.text);

// prettier-ignore
 const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

 export const hasMonth = (item) =>
  MONTHS.some(
    (month) =>
      item.text.includes(month) || item.text.includes(month.slice(0, 4))
  );

const SEASONS = ["Summer", "Fall", "Spring", "Winter"];

export const hasSeason = (item) =>
  SEASONS.some((season) => item.text.includes(season));


export const hasPresent = (item) => item.text.includes("Present");

export const DATE_FEATURE_SETS = [
  [hasYear, 1],
  [hasMonth, 1],
  [hasSeason, 1],
  [hasPresent, 1],
  [hasComma, -1],
];

//check
const LOCATIONS = ['Ward', 'District', 'Street', 'City'];
export const hasLocation = (item) =>
LOCATIONS.some(
    (location) =>
      item.text.toUpperCase().includes(location.toUpperCase()));

