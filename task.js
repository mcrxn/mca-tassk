import fetch from "node-fetch";

const url = `https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1`;

const app = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    //   console.log(data);
    data.forEach((product) => {
      if (!product.weight) {
        product.weight = "N/A";
      }
      if (product.description.length > 10) {
        product.description = product.description.slice(0, 10) + "...";
      }
    });

    data.sort((a, b) => a.name.localeCompare(b.name));
    const domesticProducts = data.filter((product) => product.domestic);
    const importedProducts = data.filter((product) => !product.domestic);

    let domesticProductsCost = 0;
    let importedProductsCost = 0;
    for (const product of domesticProducts)
      domesticProductsCost += product.price;
    for (const product of importedProducts)
      importedProductsCost += product.price;

    const productsObj = {
      domestic: domesticProducts,
      imported: importedProducts,
      domesticCost: domesticProductsCost,
      importedCost: importedProductsCost,
      domesticCount: domesticProducts.length,
      importedCount: importedProducts.length,
    };
    console.log(productsObj);
    return productsObj;
  } catch (error) {
    console.log(error);
  }
};

app(url);
