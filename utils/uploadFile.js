import fs from 'fs/promises';
import path from 'path';

async function uploadFile(fileType, key, file) {
    try {
        const filePath = path.join(process.cwd(), 'uploads', key);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, file);
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(`Failed to upload file: ${error.message}`);
    }
}

export { uploadFile };