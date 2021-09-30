import fs from "fs";
import { Command } from "commander";
import sharp from "sharp";
import glob from "glob";
import mkdirp from "mkdirp";
import { createTag } from "./lib/createTag";

type Retina = "true" | "false";
type Width = string | undefined;
type Height = string | undefined;
type Opt = {
  retina: Retina;
  width: Width;
  height: Height;
};

const IMAGE_DIR = glob.sync("target/*");
const OUTPUT_DIR = "dist/img";

// 出力ファイルの作成
const createOutputDir = async () => {
  mkdirp.sync(OUTPUT_DIR);
};

// htmlファイルの作成
const writeHtml = async (htmlTag: string) => {
  fs.writeFile("dist/index.html", htmlTag, (err) => {
    if (err) console.log(err);
    return;
  });
};

// 画像の変換
const convertImage = async (
  path: string,
  retina: Retina,
  width: Width,
  height: Height
): Promise<string> => {
  const filename = path.split("/")[1];
  const imgName = filename.split(".")[0];
  const extension = filename.split(".")[1];
  const image = sharp(path);

  if (extension === "png") {
    image.png({ quality: 75 }).toFile(`${OUTPUT_DIR}${filename}`, (err) => {
      if (err) console.log(err);
    });
  }

  if (extension === "jpeg" || extension === "jpg") {
    image.jpeg({ quality: 75 }).toFile(`${OUTPUT_DIR}${filename}`, (err) => {
      if (err) console.log(err);
    });
  }

  try {
    const info = await image
      .webp({ quality: 75 })
      .toFile(`${OUTPUT_DIR}${imgName}.webp`);

    if (width && height) {
      return createTag(imgName, filename, parseInt(width), parseInt(height));
    }

    const imgWidth =
      retina === "true" ? Math.floor(info.width / 2) : info.width;
    const imgHeight =
      retina === "true" ? Math.floor(info.height / 2) : info.height;
    return createTag(imgName, filename, imgWidth, imgHeight);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return `${filename}のwebpの変換に失敗しました`;
  }
};

// ファイルの生成
const writeFiles = async (retina: Retina, width: Width, height: Height) => {
  const imageTags = await Promise.all(
    IMAGE_DIR.map((path) => {
      return convertImage(path, retina, width, height);
    })
  );

  writeHtml(imageTags.join(""));
};

const main = async () => {
  // コマンドライン設定
  const program = new Command();
  program
    .version("0.0.1", "-v, --version")
    .option("-r, --retina <retina>", "レティーナ対応", "false")
    .option("-w, --width <width>", "imgタグwidthの指定")
    .option("-h --height <height>", "imgタグheightの指定")
    .parse(process.argv);
  const opt = program.opts<Opt>();

  await createOutputDir();
  await writeFiles(opt.retina, opt.width, opt.height);

  console.log("タスク完了");
};

main();
