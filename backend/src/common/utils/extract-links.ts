export const extractLinks = (linksString: string) => {
  const arr = linksString.split(' ');
  const completedLinks: Record<string, string>[] = [];
  arr.forEach((a, i) => {
    if (a.startsWith('<https://api.pandascore.co')) {
      const link = a.slice(1).slice(0, -2);
      const titleWithRel = arr[i + 1];
      const titleFirstPart = titleWithRel.split(',')[0];
      const title = titleFirstPart.split('"')[1];
      completedLinks.push({ title, link });
    }
  });
  return completedLinks;
};
