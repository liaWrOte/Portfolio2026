import axios from 'axios';
import { apiUrl } from './env';
import { buildFileSystemFromProjects } from '../utils/buildFileSystemFromProjects';

import {
  GET_PROJECT,
  showProjectLabel,
  OPEN_WINDOW,
  showWindow,
  setFileSystem,
  setFileSystemEn,
  FETCH_PROJECTS
} from '../actions/main';

const desktopMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_PROJECT:
      axios
        .get(`${apiUrl}/projects?populate=media`)
        .then((response) => {
          let label = response.data.data[0].attributes.title;
          store.dispatch(showProjectLabel(label));
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;

    case OPEN_WINDOW:
      store.dispatch(showWindow(true));
      next(action);
      break;

    case FETCH_PROJECTS:
      Promise.all([
        axios.get(
          `${apiUrl}/projects?populate[paragraph][populate][Image]=*&populate[paragraph][populate][localizations]=*&sort[0]=type&sort[1]=date&populate[localizations][populate][paragraph][populate][Image]=*&populate[logo]=*`
        ),
        axios.get(
          `${apiUrl}/projects?locale=en&populate[paragraph][populate][Image]=*&sort[0]=type&sort[1]=date&populate[logo]=*`
        )
      ])
        .then(([frResponse, enResponse]) => {
          const frProjects = frResponse.data.data;

          // Build EN id → FR id/type mapping so navigation paths and folder IDs stay consistent
          const enToFrId: Record<string, any> = {};
          const enToFrType: Record<string, string> = {};
          frProjects.forEach((frProj: any) => {
            frProj.attributes.localizations?.data?.forEach((loc: any) => {
              if (loc.attributes?.locale === 'en') {
                enToFrId[String(loc.id)] = frProj.id;
                enToFrType[String(loc.id)] = frProj.attributes.type; // use FR type to keep folder IDs consistent
              }
            });
          });

          // Remap EN projects to use FR ids and category names (folder IDs must match FR)
          const enProjects = enResponse.data.data.map((proj: any) => ({
            ...proj,
            id: enToFrId[String(proj.id)] ?? proj.id,
            attributes: {
              ...proj.attributes,
              type: enToFrType[String(proj.id)] ?? proj.attributes.type
            }
          }));

          store.dispatch(setFileSystem(buildFileSystemFromProjects(frProjects)));
          store.dispatch(setFileSystemEn(buildFileSystemFromProjects(enProjects)));
        })
        .catch((error) => { console.error(error); });
      next(action);
      break;

    default:
      next(action);
  }
};

export default desktopMiddleware;
