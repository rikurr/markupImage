# markupImage

画像から webp の生成と picutre タグに生成を行うコマンド

## 使い方

- src フォルダ直下に画像ファイルを並べる
- yarn start でコマンドラインの実行
- dist ファイルに webp と picture タグが入力された html ファイルが出力される

## コマンドラインのオプション

- `-r --retina`img タグの width と height が実際の画像の半分の値が入ります(true)
- `-w --width`img タグに指定する width の数値を指定できます(500)
- `-h --height`img タグに指定する height の数値を指定できます(300)

## 出力されるもの

- webp
- 75%圧縮された画像
- html ファイル

example

```
  <picture>
    <source type="image/webp" srcset="unsplash_01.webp" />
    <img src="unsplash_01.jpeg" width="660" height="1163" decoding="async" alt=""  />
  </picture>

  <picture>
    <source type="image/webp" srcset="unsplash_02.webp" />
    <img src="unsplash_02.jpg" width="2000" height="3000" decoding="async" alt=""  />
  </picture>

  <picture>
    <source type="image/webp" srcset="unsplash_03.webp" />
    <img src="unsplash_03.jpeg" width="790" height="1161" decoding="async" alt=""  />
  </picture>

  <picture>
    <source type="image/webp" srcset="unsplash_04.webp" />
    <img src="unsplash_04.png" width="4000" height="6000" decoding="async" alt=""  />
  </picture>

```
