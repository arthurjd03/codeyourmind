export function fileToCompressedDataUrl(
  file: File,
  maxWidth = 400,
  quality = 0.8,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("O arquivo não é uma imagem"));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);

    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Falha ao carregar a imagem"));

      image.onload = () => {
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Canvas indisponível"));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      image.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
