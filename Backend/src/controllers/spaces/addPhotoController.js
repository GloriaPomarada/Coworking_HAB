import * as spaceModel from '../../models/spaces/index.js';
import { savePhotoService } from '../../services/photoService.js';
import validateSchema from '../../utils/validateSchema.js';
import spacePhotoSchema from '../../schema/spaceSchema/spacePhotoSchema.js';

const addPhotosController = async (req, res, next) => {
    try {
        const { spaceId } = req.params;

        // Ensure files.photo is an array for easier processing.
        const photos = Array.isArray(req.files.photo)
            ? req.files.photo
            : [req.files.photo];

        // Validate the schema. If "files" might not exist, pass an empty object.
        await validateSchema(spacePhotoSchema, { photo: photos });

        // Get the space information to check if we are the owners.
        const space = await spaceModel.getSpaceById(spaceId);

        // Save each photo, resize to 500px width, and store the photo names.
        const photoNames = await Promise.all(
            photos.map((photo) => savePhotoService(photo, 500))
        );

        // Insert each photo into the database and get their ids.
        const photoIds = await spaceModel.insertPhoto(photoNames, spaceId);

        // Structure the response data.
        const responsePhotos = photoIds.map((id, index) => ({
            id,
            name: photoNames[index],
        }));

        res.send({
            status: 'ok',
            data: {
                photos: responsePhotos,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default addPhotosController;

// Código funcionando para subir una sola foto
// import * as spaceModel from "../../models/spaces/index.js";
// import { savePhotoService } from "../../services/photoService.js";
// import validateSchema from "../../utils/validateSchema.js";
// import spacePhotoSchema from "../../schema/spaceSchema/spacePhotoSchema.js";

// const addPhotoController = async (req, res, next) => {
//   try {
//     // Obtenemos el id del esoacio de los path params.
//     const { spaceId } = req.params;

//     // Validamos el body con Joi. Dado que "files" podría no existir enviamos un objeto vacío si se da el caso.
//     await validateSchema(spacePhotoSchema, req.files || {});

//     // Obtenemos la información de la entrada para comprobar si somos los propietarios.
//     const space = await spaceModel.getSpaceById(spaceId);

//     // Guardamos la foto en la carpeta de subida de archivos, redimensionamos a un ancho de 500px y obtenemos su nombre.
//     const photoName = await savePhotoService(req.files.photo, 500);

//     // Guardamos la foto en la base de datos y obtenemos el id de la misma.
//     const photoId = await spaceModel.insertPhoto(photoName, spaceId);

//     res.send({
//       status: "ok",
//       data: {
//         photo: {
//           id: photoId,
//           name: photoName,
//         },
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// export default addPhotoController;
