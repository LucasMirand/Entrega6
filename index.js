import fs from "fs";

class Products {
  constructor(url) {
    this.url = url;
  }
  async readProds() {
    try {
      if (!fs.existsSync(this.url)) {
        console.log("No se encontró archivo, creando...");
        await fs.promises.writeFile(this.url, "[]");
      }
      let array = await fs.promises.readFile(this.url, "utf-8");
      return console.log(JSON.parse(array));
    } catch (error) {
      return console.log("Error en read" + error);
    }
  }
  async saveProd(newProd) {
    try {
      let array = await fs.promises.readFile(this.url, "utf-8");
      let prods = JSON.parse(array);
      let idProd = prods.length + 1;
      let toAdd = { ...newProd, id: idProd };
      prods.push(toAdd);
      await fs.promises.writeFile(this.url, JSON.stringify(prods));
      return console.log(prods);
    } catch (error) {
      return console.log("Error en catch" + error);
    }
  }
  async deleteProds() {
    try {
      await fs.promises.unlink(this.url);
      console.log("Carpeta eliminada");
    } catch (error) {
      console.log("Error en delete: " + error);
    }
  }
}

let productos = new Products("productos.json");

// Leer Productos

// productos.readProds();
//Guardar Productos

// productos.saveProd({ title: "Auto", price: 120000000, thumbnail: "auto.png" });
// productos.saveProd({ title: "Moto", price: 200000, thumbnail: "moto.png" });
// productos.saveProd({ title: "Bici", price: 20000, thumbnail: "bici.png" });

// Eliminar

// productos.deleteProds();
