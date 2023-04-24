import React from "react";
import { Document, Page, Text, View, Image, pdf } from "@react-pdf/renderer";


export const handleOpenPdf = (poema) => {
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
      window.open(url, "_blank");
    });
};
