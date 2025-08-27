declare module "html2pdf.js" {
  export interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: any;
    jsPDF?: any;
    pagebreak?: any;
  }

  export interface Html2Pdf {
    from(input: HTMLElement | string): Html2Pdf;
    set(options: Html2PdfOptions): Html2Pdf;
    save(): Promise<void>;
  }

  const html2pdf: (() => Html2Pdf) & { from(input: HTMLElement | string): Html2Pdf };
  export default html2pdf;
}
