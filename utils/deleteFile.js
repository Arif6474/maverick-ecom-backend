import fs from 'fs/promises';
import path from 'path';

async function deleteFile(key) {
    try {
        const filePath = path.join(process.cwd(), 'uploads', key);
        console.log(filePath, 'filePath');
        await fs.unlink(filePath);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error(`Failed to delete file: ${error.message}`);
    }
}

export { deleteFile };