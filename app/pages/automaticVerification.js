export default function Verification() {
  const getFile = async () => {
    const res = await fetch(
      "https://bafybeiddtaq7habtwqclw3j5patjeq2zhzqkqefz5zawpbpgnba737mkg4.ipfs.w3s.link/Guidelines%20of%20Refaktor.pdf"
    );
    console.log(res);
  };

  return (
    <div>
      <button onClick={() => getFile()}>Get file</button>
      <input type="file" onChange={(e) => pdfToBase64(e)} />
    </div>
  );
}
