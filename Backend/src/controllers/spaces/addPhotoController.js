import * as spaceModel from "../../models/spaces/index.js";
import { savePhotoService } from "../../services/photoService.js";
import validateSchema from "../../utils/validateSchema.js";
import spacePhotoSchema from "../../schema/spaceSchema/spacePhotoSchema.js";

const addPhotoController = async (req, res, next) => {
  try {
    // Obtenemos el id del esoacio de los path params.
    const { spaceId } = req.params;

    // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío si se da el caso.
    await validateSchema(spacePhotoSchema, req.files || {});

    // Obtenemos la información de la entrada para comprobar si somos los propietarios.
    const space = await spaceModel.getSpaceById(spaceId);

    // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de 500px y obtenemos su nombre.
    const photoName = await savePhotoService(req.files.photo, 500);

    // Guardamos la foto en la base de datos y obtenemos el id de la misma.
    const photoId = await spaceModel.insertPhoto(photoName, spaceId);

    res.send({
      status: "ok",
      data: {
        photo: {
          id: photoId,
          name: photoName,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default addPhotoController;
