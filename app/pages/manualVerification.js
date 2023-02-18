export default function Verification() {

  return (
    <div>
      <input type="file" onChange={(e) => pdfToBase64(e)} />
    </div>
  );
}
