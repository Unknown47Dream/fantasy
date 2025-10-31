import * as fs from 'fs';
import * as path from 'path';

export const saveToFile = <T>(
  folderName: string,
  fileName: string,
  data: T,
) => {
  const folderPath = path.join('./', folderName);
  const filePath = path.join(folderPath, fileName + '.json');
  try {
    fs.mkdirSync(folderPath, { recursive: true });
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    console.log(`Data successfully saved synchronously to: ${filePath}`);
  } catch (error) {
    console.error('Error saving data to JSON file synchronously:', error);
  }
};
