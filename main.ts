import fs from "fs";
import { Command } from "commander";
import sharp from "sharp";
import glob from "glob";
import mkdirp from "mkdirp";

type Retina = "true" | "false";

type Opt = {
  retina: Retina;
};

const IMAGE_DIR = glob.sync("src/*");
const OUTPUT_DIR = "dist/images";

// 出力ファイルの削除
const removeOutputDir = async () => {
  fs.rmSync(`dist`, { recursive: true, force: true });
};

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

// pictureタグの作成
const createTag = (
  imgName: string,
  filename: string,
  width: number,
  height: number
) => {
  return `
    <picture>
        <source type="image/webp" srcset="${imgName}.webp" />
        <img src="${filename}" width="${width}" height="${height}" decoding="async" alt=""  />
    </picture>
    `;
};

// 画像の変換
const convertImage = async (path: string, retina: Retina): Promise<string> => {
  const filename = path.split("/")[1];
  const imgName = filename.split(".")[0];
  const extension = filename.split(".")[1];
  const image = sharp(path);

  if (extension === "png") {
    image.png({ quality: 75 }).toFile(`dist/images/${filename}`, (err) => {
      if (err) console.log(err);
    });
  }

  if (extension === "jpeg" || extension === "jpg") {
    image.jpeg({ quality: 75 }).toFile(`dist/images/${filename}`, (err) => {
      if (err) console.log(err);
    });
  }

  try {
    const info = await image
      .webp({ quality: 75 })
      .toFile(`dist/images/${imgName}.webp`);

    const width = retina === "true" ? Math.floor(info.width / 2) : info.width;
    const height =
      retina === "true" ? Math.floor(info.height / 2) : info.height;
    return createTag(imgName, filename, width, height);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
    return `${filename}のwebpの変換に失敗しました`;
  }
};

// ファイルの生成
const writeFiles = async (retina: Retina) => {
  const imageTags = await Promise.all(
    IMAGE_DIR.map((path) => {
      return convertImage(path, retina);
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
    .parse(process.argv);
  const opt = program.opts<Opt>();

  await removeOutputDir();
  await createOutputDir();
  await writeFiles(opt.retina);

  console.log("タスク完了");
};

main();
