import { Fragment} from "react";
import classes from "./Header.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeroItem from "./HeroItem";
import bike from "../../Assets/header.png"
import scooter from "../../Assets/scooter.jpg"
import batt from "../../Assets/battery.jpg"
function Header() {

  const headerContent = [
    {
      id: "1",
      header: "Scoot Addict",
      subHeader:"Rc Pro",
      description:"Découvrez une nouvelle façon de balader avec nos vélos électriques ! Nos modèles offrent un moyen simple et écologique pour se déplacer en ville.",
      action:"VOIR PLUS",
      image:bike,
      width:""
    },
    {
      id: "2",
      header: "",
      subHeader:"Découvrez la mobilité électrique nouvelle génération",
      description:"Scooter électrique pliable 250W avec affichage à LED de phare de contrôle APP",
      action:"DECOUVRIR !",
      image:scooter,
      width:"57%",
    },
    {
      id: "3",
      header: "Optimisez l'autonomie",
      subHeader:"",
      description:"Profitez d'une autonomie décuplée avec nos batteries pour scooter électrique !",
      action:"ACHETER",
      image:batt,
      width:"60%",
    },
  ];

  const settings = {
    dots: false,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    vertical: true,
    verticalSwiping: true,
    infinite: true,
    speed: 500,
    autoplay:true,
    autoplaySpeed: 4000,
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.carouselContainer}>
          <Slider className={classes.carousel} {...settings}>
             {headerContent.map((item) => (
            <div className={classes.slide}>
              <HeroItem
                header={item.header}
                subHeader={item.subHeader}
                desc={item.description}
                action={item.action}
                src={item.image}
                width={item.width}
              />
            </div>
          ))}
          </Slider>
        </div>
      </header>
      <style>
        {`  .slick-slider {
    margin: 0;
    height: 100%;
    position: relative;
    display:flex;
    justify-content:center;
    align-items:center;
  }
 .custom-dots {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  left:0;
}
.slick-dots li button:before {
  font-size: 12px;
  line-height: 1;
}
.slick-dots li {
  margin: 0 !important;
  flex: 1;
}
.slick-dots li.slick-active button:before {
  color:#eecb04;
}
        `}
      </style>
    </Fragment>
  );
}

export default Header;
