const fileValidator = (req, res = response, next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({ message: "No files were uploaded." });
        return;
      }

      next();
}

module.exports = {
    fileValidator
};
