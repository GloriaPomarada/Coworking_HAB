import * as spaceModel from "../../models/spaces/index.js";
import { deletePhotoService } from "../../services/photoService.js";
import { notFoundError } from "../../services/errorService.js";

const deletePhotoController = async (req, res, next) => {
  try {
    // Pillamos id del espacio e id de la foto de los req.params.
    const { spaceId, photoId } = req.params;

    // Buscamos la foto la base de datos usando su id y el id del espacio.
    const photo = await spaceModel.getPhotoByIdAndSpaceId(photoId, spaceId);

    // Si no se encuentra la foto -> error.
    if (!photo) {
      notFoundError("foto");
    }

    // Eliminamos el archivo de la foto de la carpeta de archivos.
    await deletePhotoService(photo.name);

    // Eliminamos la foto de la DB.
    await spaceModel.deletePhotoModel(photoId);

    res.send({
      status: "ok",
      message: "Foto eliminada",
    });
    
  } catch (err) {
    next(err);
  }
};

export default deletePhotoController;
