import { promises as fs } from 'fs';
import { join } from 'path';

export async function GetLastFileUploaded() {
  const uploadDir = join(process.cwd(), '/uploads');
  const dirs = await fs.readdir(uploadDir, { withFileTypes: true });

  const files = dirs.filter((dirent) => dirent.isFile());
  const fileStats: { name: string; mtime: Date }[] = [];

  for (const file of files) {
    const stats = await fs.stat(join(uploadDir, file.name));
    fileStats.push({ name: file.name, mtime: stats.mtime });
  }

  const sortedFiles = fileStats.sort(
    (a, b) => b.mtime.getTime() - a.mtime.getTime(),
  );

  if (sortedFiles.length === 0) {
    throw new Error('No files found in the upload directory.');
  }

  const latestFileName = sortedFiles[0].name;
  const filePath = join(uploadDir, latestFileName);
  return { filePath, latestFileName };
}
