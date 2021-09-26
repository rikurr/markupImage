# markupImage

画像からwebpの生成とpicutreタグに生成を行うコマンド

## 使い方

- srcフォルダ直下に画像ファイルを並べる
- yarn startでコマンドラインの実行
- distファイルにwebpとpictureタグが入力されたhtmlファイルが出力される

## コマンドラインの引数

`-retina true(デフォルトはfalse)`imgタグのwidthとheightが実際の画像の半分の値が入ります。

## 出力されるもの

- webp
- 75%圧縮された画像
- htmlファイル 

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