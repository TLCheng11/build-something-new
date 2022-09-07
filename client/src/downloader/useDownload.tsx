import JSZip from "jszip";
import { saveAs } from "file-saver";
import { showModelComponentJsx } from "./ShowModelJsx";
import { showModelComponentTsx } from "./ShowModelTsx";
import { readmeText } from "./README";

function useDownload() {
  function handleZip(fileName: string, data: any, downloadType: string) {
    const jsonData = JSON.stringify(data);

    // zipping files
    const zip = new JSZip();

    zip.file("README.md", readmeText);
    const folder = zip.folder(`model`);
    if (folder) {
      folder.file("model.json", jsonData);
      if (downloadType === "jsx") {
        folder.file("ShowModel.jsx", showModelComponentJsx);
      } else if (downloadType === "tsx") {
        folder.file("ShowModel.tsx", showModelComponentTsx);
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
