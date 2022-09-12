import JSZip from "jszip";
import { saveAs } from "file-saver";
import { showModelComponentJsx } from "./ShowModelJsx";
import { showModelComponentTsx } from "./ShowModelTsx";
import { showModelComponentPhysicJsx } from "./ShowModelJsxPhysic";
import { readmeText } from "./README";
import { showModelComponentPhysicTsx } from "./ShowModelTsxPhysic";

function useDownload() {
  function handleZip(
    fileName: string,
    data: any,
    downloadType: string,
    withPhysic: boolean
  ) {
    const jsonData = JSON.stringify(data);
    // zipping files
    const zip = new JSZip();

    zip.file("README.md", readmeText);
    const folder = zip.folder(`model`);
    if (folder) {
      folder.file("model.json", jsonData);
      if (downloadType === "jsx") {
        if (withPhysic) {
          folder.file("ShowModel.jsx", showModelComponentPhysicJsx);
        } else {
          folder.file("ShowModel.jsx", showModelComponentJsx);
        }
      } else if (downloadType === "tsx") {
        if (withPhysic) {
          folder.file("ShowModel.tsx", showModelComponentPhysicTsx);
        } else {
          folder.file("ShowModel.tsx", showModelComponentTsx);
        }
      }
    }

    // console.log("zipping");
    zip.generateAsync({ type: "blob" }).then((content) => {
      // see FileSaver.js
      saveAs(content, `${fileName}.zip`);
    });
  }

  return [handleZip];
}

export default useDownload;
