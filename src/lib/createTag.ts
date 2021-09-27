// pictureタグの作成
export const createTag = (
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
