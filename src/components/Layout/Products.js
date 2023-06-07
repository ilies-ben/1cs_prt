import Product from "./Product/Product";
import classes from "./Products.module.css";
import acc from "../../Assets/accessoires.png";
import ecran from "../../Assets/Display.png";
import batt from "../../Assets/Batterie.png";
import charger from "../../Assets/Charger.png";
function Products() {
  return (
        <section className={classes.products}>
          <Product backgroundColor="rgba(13, 13, 13,1)" title="Accessoires" description="Trouvez tous les accessoires essentiels pour votre vélo électrique ici." src={acc} textColor="#fff" />
          <Product title="Batteries" description="Alimentez votre trajet avec nos fiables batteries de vélo électrique ." src={batt} />
          <Product title="Chargeurs" description="Gardez votre vélo électrique alimenté et prêt pour la route avec nos chargeurs rapides et efficaces." src={charger} />
          <Product backgroundColor="rgba(13, 13, 13,1)" title="Écrans" description="Révolutionnez votre expérience cycliste avec nos écrans avancés de vélos électriques" src={ecran} textColor="#fff" />
        </section>
  );
}

export default Products;
