import { PDFDocument } from "pdf-lib";
import * as PDFJS from "pdfjs-dist";

export const convertPdfToImages = async (file, qrCode) => {
  const pdfDoc = await PDFDocument.create();

  PDFJS.GlobalWorkerOptions.workerSrc =
    "https://mozilla.github.io/pdf.js/build/pdf.js";

  const images = [];
  const uri = URL.createObjectURL(file);
  console.log(uri);
  const pdf = await PDFJS.getDocument({ url: uri }).promise;
  console.log(pdf);
  const canvas = document.createElement("canvas");
  console.log(canvas);

  for (let i = 0; i < pdf.numPages; i++) {
    const page = await pdf.getPage(i + 1);
    const viewport = page.getViewport({ scale: 1 });
    var context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport: viewport }).promise;
    if (i === 0) {
      context.drawImage(qrCode, 50, 50);
    }
    images.push(canvas.toDataURL("image/png"));
    const pngImage = await pdfDoc.embedPng(images[i]);

    const page1 = pdfDoc.addPage();
    page1.drawImage(pngImage);
  }
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
