import  getSectionLinesByKeywords from '../common-features/getSectionLinesByKeywords';
  import { DATE_FEATURE_SETS, getHasText, isBold } from '../common-features/common-features';
  import { divideSectionIntoSubsections } from '../common-features/divideSectionIntoSubsections';
  import { getTextWithHighestFeatureScore } from '../feature-scoring-system/featureScoringSystem';
  import {
    getBulletPointsFromLines,
    getDescriptionsLineIdx,
  } from '../common-features/bullte-point';
  
  const extractProject = (sections) => {
    const lines = getSectionLinesByKeywords(sections, ['project']);

    const subsections = divideSectionIntoSubsections(lines);

  
    const extractedProjects = [];
    const extractedProjectsScores = [];
  
    for (const subsectionLines of subsections) {
      const descriptionsLineIdx = getDescriptionsLineIdx(subsectionLines) ?? 1;
  
      const subsectionInfoTextItems = subsectionLines
        ?.slice(0, descriptionsLineIdx)
        .flat();
      const [date, dateScores] = getTextWithHighestFeatureScore(
        subsectionInfoTextItems,
        DATE_FEATURE_SETS
      );
      const PROJECT_FEATURE_SET = [
        [isBold, 2],
        [getHasText(date), -4],
        
      ];
      const [project, projectScores] = getTextWithHighestFeatureScore(
        subsectionInfoTextItems,
        PROJECT_FEATURE_SET,
        false
      );
  
      const descriptionsLines = subsectionLines.slice(descriptionsLineIdx);
      const descriptions = getBulletPointsFromLines(descriptionsLines);
  
      extractedProjects.push({ project, date, descriptions });
      extractedProjectsScores.push({
        projectScores,
        dateScores,
      });
    }
  
    return { projects: extractedProjects, projectsScores: extractedProjectsScores };
  };


  export default extractProject;
  