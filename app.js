const express = require("express");
const app = express();
const port = 3000;
const Jimp = require("jimp");

app.get("/", async (req, res) => {
  const imageWidth = 3000;

  const imageHeight = 1800;

  const text = "perso a fait ca a perso b pendant x seconde ";

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);

  const image = await Jimp.read(imageWidth, imageHeight, "#4ec174");

  let challengeType = await Jimp.read("./typo.png");

  challengeType.resize(imageWidth / 2.5, imageHeight / 3);

  const stringSize = Jimp.measureText(font, text, image.bitmap.width);

  image.composite(
    challengeType,
    (image.bitmap.width - imageWidth / 2.5) / 2,
    image.bitmap.height / 5,
    {
      mode: Jimp.BLEND_SOURCE_OVER,
    }
  );
  // (image.bitmap.width - stringSize) / 2 center the text

  image.print(
    font,
    (image.bitmap.width - stringSize) / 2,
    image.bitmap.height / 1.5,
    text
  );

  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  res.writeHead(200, {
    "Content-Type": "image/png",
  });
  res.end(buffer);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
