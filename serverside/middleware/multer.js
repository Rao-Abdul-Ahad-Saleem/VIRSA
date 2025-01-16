import multer from "multer";
import sharp from "sharp";
import fs from "fs"
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";


const storage = multer.memoryStorage();


export const upload = multer({ storage }); // Initialize multer with the configured storage

// export const multerFiles = upload.array("images", 5) // 'images' is the file name and 5 is the max number of files allowed

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const processImage = async (req, res, next) => {
    if (!req.files || req.files.length == 0) {
        return res.status(400).josn({
            message: "No File UPloaded"
        })
    }

    try {
        // Directory to save the processed images;
        const outputDir = path.join(__dirname, '../uploads');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);  // fs is the File System module in Node.js, which allows you to interact with the file system on your server
        }

        // Process each file with sharp
        req.processedImages = [];
        await Promise.all(
            req.files.map(async (file) => {
                // console.log(file);
                const outputFileName = `resized-${Date.now()}-${file.originalname.split('.')[0]}.jpeg`;
                const outputPath = path.join(outputDir, outputFileName);

                console.log(`Now comes the sharp`)
                // Use Sharp to resize and convert to JPEG
                await sharp(file.buffer)
                    .resize(400, 600) // Resize to 400x400
                    .jpeg({ quality: 100 }) // Convert to JPEG
                    .toFile(outputPath);

                // Store processed image paths in the request object
                req.processedImages.push(outputPath)

            })
        );

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error in processing image",
            error
        })
    }
}