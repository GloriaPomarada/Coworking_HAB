import validateSchema from "../../utils/validateSchema.js";
import avatarSchema from "../../schema/user/avatarSchema.js";
import { savePhotoService } from '../../services/photoService.js';
import * as userModel from "../../models/users/index.js";
import { notFoundError } from "../../services/errorService.js";

const avatarController = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar) {
      return notFoundError("avatar");
    }

    const avatarFile = req.files.avatar;

    const fileDataForValidation = {
      name: avatarFile.name,
      mimetype: avatarFile.mimetype,
      size: avatarFile.size,
    };

    // Validarlo con JOI
    await validateSchema(avatarSchema, { avatar: fileDataForValidation });

    // Procesarlo con Sharp
    // Procesar y guardar el archivo
    const avatarName = await savePhotoService(avatarFile, 100);

    // con el modelo actaulizamos avatar en base de datos
    await userModel.updateAvatar(avatarName, req.user.id);

    res.send({
      status: "ok",
      message: "Avatar actualizado",
    });
  } catch (err) {
    next(err);
  }
};

export default avatarController;
