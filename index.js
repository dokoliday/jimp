const imageUrl =
  "https://images.unsplash.com/photo-1595303526913-c7037797ebe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80";

// handlers for before and after image elements
const before = document.querySelector("#before img");
const afterCrop = document.querySelector("#afterCrop img");

// load image for original container element
before.src = imageUrl;

Jimp.read({
  url: imageUrl,
}).then((image) => {
  image.crop(80, 125, 100, 200).getBase64("image/png", (err, res) => {
    afterCrop.src = imageUrl;
  });
});
