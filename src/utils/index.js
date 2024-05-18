//Hàm chia mảng
export const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
//Hàm gọi images
export const getPosterImage = (poster_path) => {
  return `https://image.tmdb.org/t/p/original${poster_path}`;
}