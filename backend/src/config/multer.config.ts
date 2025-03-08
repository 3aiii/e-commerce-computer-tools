import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';

const multerOption = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './public';

      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const name = file.originalname.split('.')[0];
      const extension = extname(file.originalname);
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${name}-${randomName}-${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    } else {
      return cb(
        new HttpException(
          'Error: Images.jpeg|jpg|png only!',
          HttpStatus.BAD_REQUEST,
        ),
      );
    }
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024,
  },
};

export default multerOption;
