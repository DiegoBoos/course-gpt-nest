export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  const validExtensions = [
    'jpg',
    'jpeg',
    'png',
    'pdf',
    'doc',
    'docx',
    'zip',
    'rar',
    'mp4',
    'webm',
    'html',
  ];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, file.originalname);
  }

  callback(null, false);
};
