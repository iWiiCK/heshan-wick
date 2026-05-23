export default function ResumeButton() {
  const handleDownload = async () => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    const pdfFiles = import.meta.glob("/public/data/*.pdf", { eager: false, query: "?url", import: "default" });
    let url;
    const keys = Object.keys(pdfFiles);
    if (keys.length > 0) {
      const fileName = keys[0].replace("/public/data/", "");
      url = `${base}/data/${fileName}`;
    } else {
      url = `${base}/data/resume.pdf`;
    }
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "Resume - Heshan Wickramaratne (Software Engineer).pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <button onClick={handleDownload} className="resume-button">
      <span>RESUME</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="resume-download-icon"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  );
}
