import fs from "fs";
import path from "path";
import sharp from "sharp";
import glob from "glob";
import mkdirp from "mkdirp";

// fs.mkdir("dist", (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("作成されました");
// });

// fs.rmdir("dist", () => {
//   console.log("削除しました");
// });

const INPUT_DIR = "src";
const IMAGE_DIR = glob.sync("src/*");
const imageLists = IMAGE_DIR.map((path) => path.split("/")[1]);
const outputImageDir = "dist/images";

const removeOutputDir = async () => {
  fs.rmSync(`dist`, { recursive: true, force: true });
};

const createOutputDir = async () => {
  mkdirp.sync(outputImageDir);
};

const writeHtml = async () => {
  const text = "html \n" + '<img src="" width="">';
  fs.writeFile("dist/index.html", text, (err) => {
    if (err) console.log(err);

    return;
  });
};

const writeImages = async () => {
  IMAGE_DIR.map((path) => {
    const filename = path.split("/")[1];
    const imgName = filename.split(".")[0];
    const load = sharp(path);

    load.webp({ quality: 75 }).toFile(`dist/images/${imgName}.webp`, (err) => {
      if (err) console.log(err);
      return;
    });

    load.png({ quality: 75 }).toFile(`dist/images/${imgName}.png`, (err) => {
      if (err) console.log(err);
      return;
    });
  });
};

const main = async () => {
  let formatText = "";
  await removeOutputDir();
  // await createOutputDir();
  // await writeHtml();
  // await writeImages();
  // console.log(IMAGE_DIR);
  // console.log(imageLists);
};

main();
