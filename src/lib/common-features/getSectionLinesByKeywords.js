
const getSectionLinesByKeywords = (sections, keywords) => {
  for (const sectionName in sections) {
    const hasKeyword = keywords.some(keyword =>
      sectionName.toLowerCase().includes(keyword.toLowerCase())
    );
    if (hasKeyword) {
      return sections[sectionName];
    }
  }
  return [];
};

export default getSectionLinesByKeywords;
