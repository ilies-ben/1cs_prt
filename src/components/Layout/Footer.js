import { Link } from "react-router-dom";
import classes from "./Footer.module.css";
import logoWhite from "../../Assets/logoWhite.png";
const footerContent = [
  {
    id: "1",
    title: "Browse",
    list: ["Vélos", "Scooters", "Accessoires", "Privacy Policy"],
  },
  {
    id: "2",
    title: "Services",
    list: [
      "Shipping and Delivery",
      "Order tracking ",
      "Secure shopping guarantee",
    ],
  },
  {
    id: "3",
    title: "Contact Us",
    list: ["support@electronbike.com", "033-33-33-33"],
  },
  {
    id: "4",
    title: "Social Media",
    list: [],
  },
];
function Footer() {
  return (
    <section className={classes.footer}>
        <div className={classes[`footer-content`]}>
                <div className={classes.logoft}>
                <img src={logoWhite} className={classes.logoImage} />
            </div>
            {footerContent.map((item) => (
                <div key={item.id} className={classes.listcol}>
                <h3 className={classes[`col-title`]}>{item.title}</h3>
                <ul className={classes.listitems}>
                    {item.list.map((listItem) => (
                    <li key={listItem} className={classes[`col-item`]}>
                        <Link className={classes.item}>{listItem}</Link>
                    </li>
                    ))}
                </ul>
                </div>
            ))}
        </div>
      <div className={classes.borderbt}></div>
      <p className={classes.cop}>&copy; 2023 Electron Bike. All rights reserved.</p>
    </section>
  );
}

export default Footer;
