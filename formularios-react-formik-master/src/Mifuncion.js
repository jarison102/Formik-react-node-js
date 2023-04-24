import { Document, Page, Text, View, Image, pdf } from "@react-pdf/renderer";

export const handleDownloadPdf = (poema) => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  pdf(
    <Document>
      <Page size="A4">
        <View>
          <Text>{poema ? poema.title : "..."}</Text>
          <Text>Por {poema ? poema.poet.name : "..."}</Text>
          <Image
            src="https://picsum.photos/600/400"
            alt="random image"
            style={{ maxWidth: "600px", maxHeight: "400" }}
          />
          <Text>{lorem}</Text>
          <Text>{poema ? poema.content : null}</Text>
        </View>
      </Page>
    </Document>
  )
    .toBlob()
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "poema.pdf");
      document.body.appendChild(link);
      link.click();
    });
};