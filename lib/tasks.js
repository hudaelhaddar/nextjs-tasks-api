import fs from 'fs/promises';
import path from 'path';

const TMP_DIR = '/tmp';
const TMP_FILE = path.join(TMP_DIR, 'tasks.json');
const SEED_FILE = path.join(process.cwd(), 'tasks.json');

export async function readTasks() {
  try {
    const data = await fs.readFile(TMP_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    try {
      const seed = await fs.readFile(SEED_FILE, 'utf8');
      return JSON.parse(seed);
    } catch {
      return [];
    }
  }
}

export async function writeTasks(tasks) {
  try {
    await fs.mkdir(TMP_DIR, { recursive: true });
    await fs.writeFile(TMP_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error('Error writing tasks:', err);
    throw err;
  }
}
