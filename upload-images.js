const { exec } = require('child_process')

const CLOUNDINARY_API_KEY = '7r9TG__aLmh9JjF4pWFYTBjncCQ';

function upload(url) {
  const arr = url.split('/');
  const name = arr[arr.length - 1].replace(/\..*$/, '');
  console.log(name, `curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST --data 'file=${url}&public_id=${name}&api_key=${CLOUNDINARY_API_KEY}'`)

  // exec(`curl https://api.cloudinary.com/v1_1/demo/image/upload -X POST --data 'file=${url}&public_id=${name}&api_key=${CLOUNDINARY_API_KEY}'`)
}

const images = [
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-white-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatshirt-vintage-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/shorts-vintage-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-front.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/ls-black-back.png",
  "https://medusa-public-images.s3.eu-west-1.amazonaws.com/coffee-mug.png"
]

function main() {
  upload(images[0])
  images.forEach(url => {
    // upload(url)
  })
}

main()
