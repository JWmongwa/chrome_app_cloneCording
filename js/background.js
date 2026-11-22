const images = [
    "image0.png",
    "image1.png",
    "image2.png"
]

const chosenImage = images[Math.floor(Math.random()*images.length)];

const bgImage = document.createElement("img");
bgImage.src = `image/${chosenImage}`;

document.body.appendChild(bgImage);